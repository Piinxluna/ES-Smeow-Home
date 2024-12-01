#include <DHT.h>
#include <WiFi.h>
#include <FirebaseClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
// #include <TridentTD_LineNotify.h>
#include <Arduino.h>

#define WIFI_SSID "JLTOT_2.4G"
#define WIFI_PASSWORD "70be9055"

// #define API_KEY "Web_API_KEY"
// #define USER_EMAIL "USER_EMAIL"
// #define USER_PASSWORD "USER_PASSWORD"

// Define servo pin
const int servoPin2 = 13;
const int servoPin1 = 12;

// Define Laser Pin
const int LASER = 18;

#define DHTPIN 25     // GPIO Number
#define DHTTYPE DHT22 // Or DHT22 or DHT21
#define MQ_7 35

void asyncCB(AsyncResult &aResult);
float analysisCO(int);

DefaultNetwork network;

// Create servo object
Servo myServo1;
Servo myServo2;

// UserAuth user_auth(API_KEY, USER_EMAIL, USER_PASSWORD, 3000);
NoAuth no_auth;

FirebaseApp app;

#include <WiFiClientSecure.h>

WiFiClientSecure ssl_client;

using AsyncClient = AsyncClientClass; // For name shortening

AsyncClient aClient(ssl_client, getNetwork(network));

RealtimeDatabase Database;

unsigned long tmo = 0;
unsigned long tmo_2 = 0;

DHT dht(DHTPIN, DHTTYPE);

// Line notify
// #define LINE_TOKEN "9J4MCiXa7aDUbNpNwsUCsl4jl7A2OmeKjXot2H5MQHt"
// unsigned long line_last_sent = 0;

// Critical value
float ideal_temp = 25;
float ideal_humid = 40;
float critical_temp = 9;
float critical_humid = 10;
float critical_CO = 70;

// laserMode 
int laserMode = 0;

// Thread
TaskHandle_t LaserTask;
TaskHandle_t WeatherTask;

SemaphoreHandle_t xSemaphore;
void LaserTaskcode( void * pvParameters );
void WeatherTaskcode( void * pvParameters );
void laserModePlay(int mode);

void setup()
{
  Serial.begin(115200);

  // Set up WIFI
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  unsigned long ms = millis();
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  // Set up firebase
  Firebase.printf("Firebase Client v%s\n", FIREBASE_CLIENT_VERSION);
  ssl_client.setInsecure();

  initializeApp(aClient, app, getAuth(no_auth), asyncCB, "authTask");
  app.getApp<RealtimeDatabase>(Database);
  Database.url("https://embeddedsystem-smeowhome-default-rtdb.asia-southeast1.firebasedatabase.app/");

  // Set up PINs
  dht.begin();
  myServo1.attach(servoPin1);
  myServo2.attach(servoPin2);
  Serial.println("SetUp");
  myServo1.write(90);
  myServo2.write(00);

  pinMode(LASER, OUTPUT);
  digitalWrite(LASER, HIGH);

  pinMode(MQ_7, INPUT);

  // Set up Line notify
  // Serial.println(LINE.getVersion());
  // LINE.setToken(LINE_TOKEN);

  // Initial delay for sensor to stabilize
  delay(2000); 

  // Set up Threads
  xSemaphore = xSemaphoreCreateBinary();
  xSemaphoreGive(xSemaphore);

  xTaskCreatePinnedToCore(
      LaserTaskcode,  
      "LaserTask",    
      10000,      
      NULL,       
      1,         
      &LaserTask,
      0           
  );
  xTaskCreatePinnedToCore(
      WeatherTaskcode, 
      "WeatherTask",   
      10000,     
      NULL,    
      1,         
      &WeatherTask,  
      1         
  );
}

void loop() {}

// Laser Task : cControl laser to play with cats
void LaserTaskcode( void * pvParameters ){
  for(;;){
    if (xSemaphoreTake(xSemaphore, (TickType_t)10) == pdTRUE) {

      laserModePlay(laserMode);
      
      // Release the semaphore
      xSemaphoreGive(xSemaphore);
      vTaskDelay(100 / portTICK_PERIOD_MS); // Delay 500 ms
    }
  }  
}

// Weather Task : Detect Temp, Humidity, Air quality & send data to firebase & notify via line
void WeatherTaskcode( void * pvParameters ){
  for(;;){
    if (xSemaphoreTake(xSemaphore, (TickType_t)10) == pdTRUE) {
      // Read data
      app.loop();
      Database.loop();

      float h = dht.readHumidity();
      float t = dht.readTemperature();
      float a = analysisCO(analogRead(MQ_7)); // TODO: edit this to read air quality sensor

      if (app.ready() && millis() - tmo > 1000)
      {
        tmo = millis();
        JsonDocument doc;
        doc["temperature"] = t;
        doc["humidity"] = h;
        doc["airQuality"] = a;
        String serializedObj;
        serializeJson(doc, serializedObj);

        // User code can be put here
        // Database.push<object_t>(aClient, "/temperature", doc, asyncCB, "someTask");
        // Database.set<number_t>(aClient, "/temperature", number_t(t), asyncCB);
        // Database.set<number_t>(aClient, "/humidity", number_t(h), asyncCB);
        Database.set<object_t>(aClient, "/weather", object_t(serializedObj), asyncCB);
        Database.get(aClient, "/control", asyncCB, false, "laserMode");
      }

      if (!isnan(h) && !isnan(t) && !isnan(a))
      {
        // Serial.print("Humidity: ");
        // Serial.print(h);
        // Serial.print("%  Temperature: ");
        // Serial.print(t);
        // Serial.print("°C CO level: ");
        // Serial.print(a);
        // Serial.println("PPM");

        // Check if something is critical and send line notify alert
        // if (millis() - line_last_sent > 10000){
          // Serial.println(">> SENT TO LINE : t=" + String(abs(t - ideal_temp)) + ", h=" + String(abs(h - ideal_humid)) + ", a=" + String(a));
        //   if(abs(t - ideal_temp) > critical_temp){
        //     if(t > ideal_temp) {
        //       LINE.notify("!! ALERT: TEMPERATURE IS TOO HIGH !!\nCurrent Temperature is " + String(t) + "°C");
        //     } else {
        //       LINE.notify("!! ALERT: TEMPERATURE IS TOO LOW !!\nCurrent Temperature is " + String(t) + "°C");
        //     }
        //     line_last_sent = millis();
        //   }
        //   if(abs(h - ideal_humid) > critical_humid){
        //     if(h > ideal_humid) {
        //       LINE.notify("!! ALERT: HUMIDITY IS TOO HIGH !!\nCurrent Humidity is " + String(h) + "%");
        //     } else {
        //       LINE.notify("!! ALERT: HUMIDITY IS TOO LOW !!\nCurrent Humidity is " + String(h) + "%");
        //     }
        //     line_last_sent = millis();
        //   }
        //   if(a > critical_CO){
        //     LINE.notify("!! ALERT: CO LEVEL IS TOO HIGH !!\nCurrent Carbon Monoxide level is " + String(a) + "PPM");
        //     line_last_sent = millis();
        //   }
        // }
      } else
      {
        Serial.println("Failed to read from DHT sensor!");
      }
      
      // Release the semaphore
      xSemaphoreGive(xSemaphore);
      vTaskDelay(100 / portTICK_PERIOD_MS); // Delay 1000 ms
    }
  }
}

void asyncCB(AsyncResult &aResult)
{
  // WARNING!
  // Do not put your codes inside the callback.

  if (aResult.isEvent())
  {
    Firebase.printf("Event task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.appEvent().message().c_str(), aResult.appEvent().code());
  }

  if (aResult.isDebug())
  {
    Firebase.printf("Debug task: %s, msg: %s\n", aResult.uid().c_str(), aResult.debug().c_str());
  }

  if (aResult.isError())
  {
    Firebase.printf("Error task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.error().message().c_str(), aResult.error().code());
  }

  if (aResult.available())
  {
    Firebase.printf("task: %s, payload: %s\n", aResult.uid().c_str(), aResult.c_str());

    // Check if the resultPath matches the expected path
      if (aResult.path() == "/control") {
        // Parse the JSON payload
        StaticJsonDocument<256> jsonDoc; // Adjust size as needed
        DeserializationError error = deserializeJson(jsonDoc, aResult.c_str());

        if (error) {
          Serial.print("JSON deserialization failed: ");
          Serial.println(error.c_str());
          return;
        }

        // Access the "openWater" field
        if (jsonDoc.containsKey("laserMode")) {
          laserMode = jsonDoc["laserMode"];
        } else {
          Serial.println("Key 'laserMode' not found in JSON payload.");
        }
      }
  }
}

float analysisCO(int adc)
{
  float slope = -0.7516072988;
  float A = 45.87510694;
  float Rseries = 1000;
  float V_Rseries = ((float)adc * 5) / 1023;
  float Rs = ((5 - V_Rseries) / V_Rseries) * Rseries; // Sensor resistance
  float R0 = 400;
  /*
   * R0 คือ ค่าความต้านทานเซ็นเซอร์เมื่อมีปริมาณแก๊ส CO ในอากาศ 100ppm
   * อุณหภูมิสภาพแวดล้อม 20℃ เเละมีความชื้น 33%RH
   * ควรปรับจูนด้วยการสอบเทียบกับเซ็นเซอร์มาตรฐาน
   */
  float Y = Rs / R0;
  float CO_ppm = pow(10, (log10(Y / A) / slope));
  return CO_ppm;
}

void laserModePlay(int mode) {
  // Static variables to maintain state across function calls
  static int currentX = 45; // Initial X position
  static int currentY = 70; // Initial Y position
  static bool toggleX = false; // Toggle state for X-axis
  static bool toggleY = false; // Toggle state for Zig Zag Flip
  static bool toggleLaser = false; // Toggle state for laser blinking in Dash mode

  if (mode == 0) {
    // Off Mode: Set servos to 90° and turn off laser
    myServo1.write(90);
    myServo2.write(90);
    digitalWrite(LASER, LOW);
  } else if (mode == 1) {
    // Random Mode: Randomize servo positions every 0.5 seconds
    int randX = random(30, 160);
    int randY = random(90, 180);
    myServo1.write(randX);
    myServo2.write(randY);
    delay(100);
    digitalWrite(LASER, HIGH); // Laser always on
  } else if (mode == 2) {
    // Zig Zag Mode
    currentX = toggleX ? 160 : 100; // Alternate X between 45° and 135°
    toggleX = !toggleX; // Toggle X state
    myServo1.write(currentX); // Write X position

    if (currentY > 45) {
      currentY--; // Gradually decrease Y-axis position
    } else {
      currentY = 135; // Reset Y to 100° when it reaches 160°
    }
    myServo2.write(currentY); // Write Y position
    digitalWrite(LASER, HIGH); // Laser always on
    delay(100);
  } else if (mode == 3) {
    // Zig Zag Flip Mode
    currentY = toggleY ? 160 : 130; // Alternate Y between 40° and 70°
    toggleY = !toggleY; // Toggle Y state
    myServo2.write(currentY); // Write Y position

    if (currentX < 135) {
      currentX++; // Gradually increase X-axis position
    } else {
      currentX = 45; // Reset X to 45° when it reaches 135°
    }
    myServo1.write(currentX); // Write X position
    digitalWrite(LASER, HIGH); // Laser always on
    delay(50);
  } else if (mode == 4) {
    // Circle Mode
    static int angle = 0; // Initial angle for circular motion
    int x = 75 + 30 * sin(angle * PI / 180); // X-axis oscillation (75° to 105°)
    int y = 120 + 15 * cos(angle * PI / 180); // Y-axis oscillation (100° to 70°)
    myServo1.write(x);
    myServo2.write(y);
    digitalWrite(LASER, HIGH); // Laser always on
    angle = (angle + 10) % 360; // Increment angle for next step
  } else if (mode == 5) {
    // Dash Mode
    currentX = (currentX < 150) ? currentX + 3 : 30; // Move X between 30° and 150°
    myServo1.write(currentX); // Write X position
    myServo2.write(140); // Keep Y fixed at 60°
    toggleLaser = !toggleLaser; // Toggle laser state
    digitalWrite(LASER, toggleLaser ? HIGH : LOW); // Blink laser every 3 degrees
    delay(50);
  }
}

