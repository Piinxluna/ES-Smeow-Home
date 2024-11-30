#include <WiFi.h>
#include <FirebaseClient.h>
#include <ArduinoJson.h>
#include <WiFiClientSecure.h>
#include <Arduino.h>


#define WIFI_SSID "JLTOT_2.4G"
#define WIFI_PASSWORD "70be9055"

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
#define MIN_WATER_DISTANCE 200

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
}

void loop() {
  app.loop();
  Database.loop();

  // Clear and send a pulse
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  // Measure distance
  duration = pulseIn(ECHO, HIGH, 30000); // 30ms timeout
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

  if (app.ready() && millis() - tmo > 1000) {
    tmo = millis();

    JsonDocument doc;
    doc["waterLeft"] = water_percent;
    String serializedObj;
    serializeJson(doc, serializedObj);

    isDatabaseSetComplete = false; // Reset flag before operation
    Database.set<object_t>(aClient, "/water", object_t(serializedObj), asyncCB);

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

  delay(50); // Stabilize sensor
  Serial.println("-------------------------------------------");
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
    Firebase.printf("task: %s, payload: %s\n", aResult.uid().c_str(), aResult.c_str());
  }

  isDatabaseSetComplete = true;  // Mark as complete
}
