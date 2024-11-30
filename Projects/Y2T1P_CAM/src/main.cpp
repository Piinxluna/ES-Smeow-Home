#include "esp_camera.h"
#include "esp_http_server.h"
#include "esp_timer.h"
#include <esp32-hal-log.h>
#include <Arduino.h>
#include <WiFi.h>

const char *ssid = "vivo 1716";
const char *password = "nonenone";

#define CAM_PIN_PWDN 32
#define CAM_PIN_RESET -1 // software reset will be performed
#define CAM_PIN_XCLK 0
#define CAM_PIN_SIOD 26
#define CAM_PIN_SIOC 27

#define CAM_PIN_D7 35
#define CAM_PIN_D6 34
#define CAM_PIN_D5 39
#define CAM_PIN_D4 36
#define CAM_PIN_D3 21
#define CAM_PIN_D2 19
#define CAM_PIN_D1 18
#define CAM_PIN_D0 5
#define CAM_PIN_VSYNC 25
#define CAM_PIN_HREF 23
#define CAM_PIN_PCLK 22

#define PART_BOUNDARY "123456789000000000000987654321"
static const char *_STREAM_CONTENT_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;
static const char *_STREAM_BOUNDARY = "\r\n--" PART_BOUNDARY "\r\n";
static const char *_STREAM_PART = "Content-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n";
static const char *TAG = "jpg_stream";

httpd_handle_t camera_httpd = NULL;
httpd_handle_t stream_httpd = NULL;

#define DEFAULT_FRAMESIZE FRAMESIZE_VGA
#define DEFAULT_JPEG_QUALITY 27
#define DEFAULT_FB_COUNT 2
#define TARGET_FPS 10
#define FRAME_INTERVAL_US (1000000 / TARGET_FPS) // Interval in microseconds
#define TASK_STACK_SIZE 12288

static camera_config_t camera_config = {
    .pin_pwdn = CAM_PIN_PWDN,
    .pin_reset = CAM_PIN_RESET,
    .pin_xclk = CAM_PIN_XCLK,
    .pin_sccb_sda = CAM_PIN_SIOD,
    .pin_sccb_scl = CAM_PIN_SIOC,

    .pin_d7 = CAM_PIN_D7,
    .pin_d6 = CAM_PIN_D6,
    .pin_d5 = CAM_PIN_D5,
    .pin_d4 = CAM_PIN_D4,
    .pin_d3 = CAM_PIN_D3,
    .pin_d2 = CAM_PIN_D2,
    .pin_d1 = CAM_PIN_D1,
    .pin_d0 = CAM_PIN_D0,
    .pin_vsync = CAM_PIN_VSYNC,
    .pin_href = CAM_PIN_HREF,
    .pin_pclk = CAM_PIN_PCLK,

    // XCLK 20MHz or 10MHz for OV2640 double FPS (Experimental)
    .xclk_freq_hz = 20000000,
    .ledc_timer = LEDC_TIMER_0,
    .ledc_channel = LEDC_CHANNEL_0,

    .pixel_format = PIXFORMAT_JPEG,  // YUV422,GRAYSCALE,RGB565,JPEG
    .frame_size = DEFAULT_FRAMESIZE, // QQVGA-UXGA, For ESP32, do not use sizes above QVGA when not JPEG. The performance of the ESP32-S series has improved a lot, but JPEG mode always gives better frame rates.

    .jpeg_quality = DEFAULT_JPEG_QUALITY, // 0-63, for OV series camera sensors, lower number means higher quality
    .fb_count = DEFAULT_FB_COUNT,         // When jpeg mode is used, if fb_count more than one, the driver will work in continuous mode.
    .fb_location = CAMERA_FB_IN_PSRAM,
    .grab_mode = CAMERA_GRAB_WHEN_EMPTY,
};

static esp_err_t init_camera(void)
{
    // initialize the camera
    esp_err_t err = esp_camera_init(&camera_config);
    if (err != ESP_OK)
    {
        ESP_LOGE(TAG, "Camera Init Failed");
        return err;
    }

    return ESP_OK;
}

esp_err_t jpg_stream_httpd_handler(httpd_req_t *req)
{
    camera_fb_t *fb = NULL;
    esp_err_t res = ESP_OK;
    size_t _jpg_buf_len;
    uint8_t *_jpg_buf;
    char part_buf[64];
    static int64_t last_frame_time = 0;

    if (!last_frame_time)
    {
        last_frame_time = esp_timer_get_time();
    }

    res = httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");
    res = httpd_resp_set_type(req, _STREAM_CONTENT_TYPE);
    if (res != ESP_OK)
    {
        return res;
    }

    while (true)
    {
        int64_t current_time = esp_timer_get_time();
        int64_t elapsed_time = current_time - last_frame_time;

        if (elapsed_time < FRAME_INTERVAL_US)
        {
            // Calculate remaining time to wait
            int64_t wait_time = FRAME_INTERVAL_US - elapsed_time;
            // Convert microseconds to milliseconds and delay
            current_time = esp_timer_get_time();
            elapsed_time = current_time - last_frame_time;
            if (elapsed_time < FRAME_INTERVAL_US)
            {
                continue; // Ensure enough time has passed
            }
        }

        last_frame_time = current_time;

        fb = esp_camera_fb_get();
        if (!fb)
        {
            ESP_LOGE(TAG, "Camera capture failed");
            res = ESP_FAIL;
            break;
        }

        if (fb->format != PIXFORMAT_JPEG)
        {
            bool jpeg_converted = frame2jpg(fb, 80, &_jpg_buf, &_jpg_buf_len);
            if (!jpeg_converted)
            {
                ESP_LOGE(TAG, "JPEG compression failed");
                esp_camera_fb_return(fb);
                res = ESP_FAIL;
                break;
            }
        }
        else
        {
            _jpg_buf_len = fb->len;
            _jpg_buf = fb->buf;
        }

        if (res == ESP_OK)
        {
            res = httpd_resp_send_chunk(req, _STREAM_BOUNDARY, strlen(_STREAM_BOUNDARY));
        }
        if (res == ESP_OK)
        {
            size_t hlen = snprintf(part_buf, 64, _STREAM_PART, _jpg_buf_len);
            res = httpd_resp_send_chunk(req, part_buf, hlen);
        }
        if (res == ESP_OK)
        {
            res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);
        }
        if (fb->format != PIXFORMAT_JPEG)
        {
            free(_jpg_buf);
        }
        esp_camera_fb_return(fb);
        if (res != ESP_OK)
        {
            break;
        }

        ESP_LOGI(TAG, "MJPG: %uKB %ums (%.1ffps)",
                 (uint32_t)(_jpg_buf_len / 1024),
                 (uint32_t)(elapsed_time / 1000),
                 1000000.0 / (float)elapsed_time);
    }

    last_frame_time = 0;
    return res;
}

void setup()
{
    Serial.begin(115200);

    // Initialize the camera
    WiFi.mode(WIFI_STA);
    WiFi.setTxPower(WIFI_POWER_19_5dBm);
    WiFi.setSleep(false);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("Camera Ready! Use 'http://");
    Serial.print(WiFi.localIP());
    Serial.println("/stream' to connect");

    esp_err_t err = esp_camera_init(&camera_config);
    if (err != ESP_OK)
    {
        Serial.printf("Camera init failed with error 0x%x", err);
        return;
    }

    sensor_t *s = esp_camera_sensor_get();
    // s->set_saturation(s, -2);
    // s->set_contrast(s, 1);
    s->set_gainceiling(s, GAINCEILING_64X);
    s->set_awb_gain(s, 1);
    s->set_wb_mode(s, 0);
    s->set_raw_gma(s, 1);
    s->set_lenc(s, 0);
    s->set_dcw(s, 0);
    s->set_bpc(s, 0);
    s->set_wpc(s, 0);
    s->set_ae_level(s, -2);
    s->set_framesize(s, DEFAULT_FRAMESIZE);
    s->set_quality(s, DEFAULT_JPEG_QUALITY);

    // Start HTTP server
    httpd_config_t httpd_config = HTTPD_DEFAULT_CONFIG();
    // IGNORE THE WARNING, I WORK
    httpd_config.core_id = 0;
    httpd_config.stack_size = TASK_STACK_SIZE;
    httpd_config.task_priority = tskIDLE_PRIORITY + 10;
    httpd_config.max_uri_handlers = 2;
    httpd_config.max_open_sockets = 2;

    httpd_uri_t stream_uri = {
        .uri = "/stream",
        .method = HTTP_GET,
        .handler = jpg_stream_httpd_handler,
        .user_ctx = NULL};

    if (httpd_start(&stream_httpd, &httpd_config) == ESP_OK)
    {
        httpd_register_uri_handler(stream_httpd, &stream_uri);
        Serial.println("Camera stream server started");
    }
    else
    {
        Serial.println("Camera stream server failed to start");
    }
}

void loop()
{
    // Add basic WiFi reconnection handling
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("WiFi disconnected. Reconnecting...");
        WiFi.begin(ssid, password);
    }
    delay(5000);
}