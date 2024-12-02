#include <WiFi.h>
#include <FirebaseClient.h>
#include <ArduinoJson.h>
#include <WiFiClientSecure.h>
#include <Arduino.h>

#define WIFI_SSID "TestForEmbedded"
#define WIFI_PASSWORD "HackingHotspot"

//#define API_KEY "Web_API_KEY"
//#define USER_EMAIL "USER_EMAIL"
//#define USER_PASSWORD "USER_PASSWORD"

#define PUMP_PIN 25  // Define the pump pin (D25)
#define ECHO 18 // Define the echo ultra pin (D18)
#define TRIG 5 // Define the trig ultra pin (D5)
#define LED_ALERT_PIN 19 // Define the led alert pin (D19)
#define SOUND_ALERT_PIN 21 // Define the sound alert pin (D20)

// Define for water amount
#define MAX_WATER_DISTANCE 10
#define MIN_WATER_DISTANCE 100

// prototype the function
void asyncCB(AsyncResult &aResult);

// setup network
DefaultNetwork network;
WiFiClientSecure ssl_client;

//UserAuth user_auth(API_KEY, USER_EMAIL, USER_PASSWORD, 3000);
NoAuth no_auth;
FirebaseApp app;
using AsyncClient = AsyncClientClass; // For name shortening
AsyncClient aClient(ssl_client, getNetwork(network));
RealtimeDatabase Database;
unsigned long tmo = 0;

// water value
long duration; // sound travel duration
int distance;
float water_percent;
bool isDatabaseSetComplete = false;

// Thread
TaskHandle_t SensorTask;
TaskHandle_t PumpTask;

SemaphoreHandle_t xSemaphore;
void SensorTaskcode( void * pvParameters );
void PumpTaskcode( void * pvParameters );

void setup() {
  // Setup wifi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  unsigned long ms = millis();
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }

  // Print debug
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Firebase.printf("Firebase Client v%s\n", FIREBASE_CLIENT_VERSION);
  ssl_client.setInsecure(); 

  initializeApp(aClient, app, getAuth(no_auth), asyncCB, "authTask");
  app.getApp<RealtimeDatabase>(Database);
  Database.url("https://embeddedsystem-smeowhome-default-rtdb.asia-southeast1.firebasedatabase.app/");

  // Set pin mode
  pinMode(PUMP_PIN, OUTPUT);
  pinMode(LED_ALERT_PIN, OUTPUT);
  pinMode(TRIG, OUTPUT);     // กำหนดขา trig เป็น output
  pinMode(ECHO, INPUT);   // กำหนดขา echo เป็น input
  pinMode(SOUND_ALERT_PIN, OUTPUT);

  // Write down for all pin
  digitalWrite(PUMP_PIN, LOW);
  digitalWrite(LED_ALERT_PIN, LOW);
  digitalWrite(SOUND_ALERT_PIN, LOW);

  Serial.begin(115200);
  Serial.println("Start fountain");
  
  // Initial delay for sensor to stabilize
  delay(1000);

  // Set up Threads
  xSemaphore = xSemaphoreCreateBinary();
  xSemaphoreGive(xSemaphore);

  xTaskCreatePinnedToCore(
      SensorTaskcode,  
      "SensorTask",    
      10000,      
      NULL,       
      1,         
      &SensorTask,
      0           
  );
  xTaskCreatePinnedToCore(
      PumpTaskcode, 
      "PumpTask",   
      10000,     
      NULL,    
      1,         
      &PumpTask,  
      1         
  );
}

void loop() {}

// Sensor Task : Read ultrasonic value
void SensorTaskcode( void * pvParameters ){
  for(;;){
    if (xSemaphoreTake(xSemaphore, (TickType_t)10) == pdTRUE) {
      // Clear and send a pulse
      digitalWrite(TRIG, LOW);
      delayMicroseconds(2);
      digitalWrite(TRIG, HIGH);
      delayMicroseconds(10);
      digitalWrite(TRIG, LOW);

      // Measure distance
      duration = pulseIn(ECHO, HIGH); // 50ms timeout
      Serial.print("Duration: ");
      Serial.println(duration);
      if (duration > 0) {
        distance = (duration * 0.034) / 2;

        int diff = MIN_WATER_DISTANCE - MAX_WATER_DISTANCE;
        water_percent = (float)(MIN_WATER_DISTANCE - distance) / diff * 100;

        if (water_percent < 0) water_percent = 0;
      } else {
        distance = 0;
        water_percent = 0;
        Serial.println("No valid distance measurement!");
      }

      Serial.print("Distance: ");
      Serial.println(distance);
      Serial.print("Percent: ");
      Serial.println(water_percent);

      // Control LED Alert based on water_percent
      if (water_percent == 0) {
        digitalWrite(LED_ALERT_PIN, HIGH);
        digitalWrite(SOUND_ALERT_PIN, LOW); // Turn on SOUND alert
      } else if(water_percent > 100) {
        digitalWrite(SOUND_ALERT_PIN, HIGH); // Turn on SOUND alert
        digitalWrite(LED_ALERT_PIN, HIGH);
      } else {
        digitalWrite(LED_ALERT_PIN, LOW); // Turn off LED alert
        digitalWrite(SOUND_ALERT_PIN, LOW);
      }
      
      // Release the semaphore
      xSemaphoreGive(xSemaphore);
      vTaskDelay(100 / portTICK_PERIOD_MS); // Delay 500 ms
    }
  }  
}

// Pump Task : Control water pump
void PumpTaskcode( void * pvParameters ){
  for(;;){
    if (xSemaphoreTake(xSemaphore, (TickType_t)10) == pdTRUE) {
      // Read data
      app.loop();
      Database.loop();

      if (app.ready() && millis() - tmo > 1000) {
        tmo = millis();

        JsonDocument doc;
        doc["waterLeft"] = water_percent;
        String serializedObj;
        serializeJson(doc, serializedObj);

        isDatabaseSetComplete = false; // Reset flag before operation
        Database.set<object_t>(aClient, "/water", object_t(serializedObj), asyncCB);
        Database.get(aClient, "/control", asyncCB, false, "openWater");

        unsigned long startWait = millis();
        while (!isDatabaseSetComplete && millis() - startWait < 5000) {
          app.loop();
          delay(10); // Yield CPU for other tasks
        }

        if (!isDatabaseSetComplete) {
          Serial.println("Database set operation timed out.");
        } else {
          Serial.println("Database set operation completed.");
        }
      }

      // Release the semaphore
      xSemaphoreGive(xSemaphore);
      vTaskDelay(100 / portTICK_PERIOD_MS); // Delay 500 ms
    }
  }  
}


void asyncCB(AsyncResult &aResult) {
  // WARNING!
  // Do not put your codes inside the callback.

  if (aResult.isEvent()) {
    Firebase.printf("Event task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.appEvent().message().c_str(), aResult.appEvent().code());
  }

  if (aResult.isDebug()) {
    Firebase.printf("Debug task: %s, msg: %s\n", aResult.uid().c_str(), aResult.debug().c_str());
  }

  if (aResult.isError()) {
    Firebase.printf("Error task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.error().message().c_str(), aResult.error().code());
  }

  if (aResult.available()) {
      Firebase.printf("task: %s, payload: %s, resultPath: %s\n", aResult.uid().c_str(), aResult.c_str(), aResult.path());

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
        if (jsonDoc.containsKey("openWater")) {
          bool openWater = jsonDoc["openWater"];
          if (openWater) {
            Serial.println("Open pump");
            digitalWrite(PUMP_PIN, HIGH);
          } else {
            Serial.println("Close pump");
            digitalWrite(PUMP_PIN, LOW);
          }
        } else {
          Serial.println("Key 'openWater' not found in JSON payload.");
        }
      }
    }

  isDatabaseSetComplete = true;  // Mark as complete
}

