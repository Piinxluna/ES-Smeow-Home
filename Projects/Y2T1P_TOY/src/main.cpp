#include <DHT.h>
#include <WiFi.h>
#include <FirebaseClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>

#define WIFI_SSID "vivo 1716"
#define WIFI_PASSWORD "nonenone"

//#define API_KEY "Web_API_KEY"
//#define USER_EMAIL "USER_EMAIL"
//#define USER_PASSWORD "USER_PASSWORD"

// Define servo pin
const int servoPin2 = 12;
const int servoPin1 = 13;

// Define Laser Pin
const int LASER = 4;

#define DHTPIN 25      // GPIO Number
#define DHTTYPE DHT22  // Or DHT22 or DHT21

void asyncCB(AsyncResult &aResult);

DefaultNetwork network;

// Create servo object
Servo myServo1;
Servo myServo2;

//UserAuth user_auth(API_KEY, USER_EMAIL, USER_PASSWORD, 3000);
NoAuth no_auth;

FirebaseApp app;

#include <WiFiClientSecure.h>

WiFiClientSecure ssl_client;

using AsyncClient = AsyncClientClass; // For name shortening

AsyncClient aClient(ssl_client, getNetwork(network));

RealtimeDatabase Database;

unsigned long tmo = 0;

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  unsigned long ms = millis();
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Firebase.printf("Firebase Client v%s\n", FIREBASE_CLIENT_VERSION);
  ssl_client.setInsecure();

  initializeApp(aClient, app, getAuth(no_auth), asyncCB, "authTask");
  app.getApp<RealtimeDatabase>(Database);
  Database.url("https://embeddedsystem-smeowhome-default-rtdb.asia-southeast1.firebasedatabase.app/");

  dht.begin();

  myServo1.attach(servoPin1);
  myServo1.attach(servoPin2);
  Serial.begin(9600);
  Serial.println("SetUp");
  myServo1.write(0);
  myServo2.write(0);

  pinMode(LASER, OUTPUT);
  digitalWrite(LASER, HIGH);

  delay(2000);  // Initial delay for sensor to stabilize
}

void loop() {

  app.loop();
  Database.loop();

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (app.ready() && millis() - tmo > 1000) {

    tmo = millis();
    JsonDocument doc;
    doc["temperature"] = t;
    doc["humidity"] = h;
    String serializedObj;
    serializeJson(doc, serializedObj);

    // User code can be put here
    // Database.push<object_t>(aClient, "/temperature", doc, asyncCB, "someTask");
    // Database.set<number_t>(aClient, "/temperature", number_t(t), asyncCB);
    // Database.set<number_t>(aClient, "/humidity", number_t(h), asyncCB);
    Database.set<object_t>(aClient, "/Weather", object_t(serializedObj), asyncCB);
  }


  if (!isnan(h) && !isnan(t)) {
/*     Serial.print("Humidity: ");
    Serial.print(h);
    Serial.print("%  Temperature: ");
    Serial.print(t);
    Serial.println("°C "); */
  } else {
    Serial.println("Failed to read from DHT sensor!");
  }

  int rand = esp_random();
  int rand2 = esp_random();

  int randDeg = std::abs(rand) % 180;
  int randDeg2 = std::abs(rand) % 180;
  myServo1.write(randDeg);
  myServo2.write(randDeg2);
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
}