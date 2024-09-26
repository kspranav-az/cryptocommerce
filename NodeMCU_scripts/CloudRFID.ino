#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <TimeLib.h>
#include "Firebase.h"

#define RST_PIN D3   
#define SS_PIN D4    

const char* ssid = "Kavik's S24 Ultra";
const char* password = "mercury1";

String firebaseHost = "cloud-d78bf-default-rtdb.firebaseio.com";
String firebaseAuthToken = "Zjj4zJHKOa7N4JC3TNEWsQ7DhlmKTK4p9U2kpXbt";  

Firebase firebase(firebaseHost, firebaseAuthToken);
MFRC522 rfid(SS_PIN, RST_PIN); 


WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 0, 60000);  

void setup() {
  Serial.begin(115200); 
  SPI.begin();  
  rfid.PCD_Init();    
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Connected to Wi-Fi");

  // Initialize NTP client to get the current date and time
  timeClient.begin();
  timeClient.update();

  Serial.println("Place your RFID card/tag near the reader...");
}

void loop() {
  // Update time from the NTP server
  timeClient.update();

  // Check if a new RFID card is present
  if (!rfid.PICC_IsNewCardPresent()) {
    return;
  }

  // Read the card serial number (UID)
  if (!rfid.PICC_ReadCardSerial()) {
    return;
  }

  // Print the UID of the card
  String uid = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    uid += String(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
    uid += String(rfid.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();

  Serial.print("UID tag: ");
  Serial.println(uid);

  // Fetch current date and time from NTP server
  String formattedDateTime = timeClient.getFormattedTime();  
  unsigned long epochTime = timeClient.getEpochTime();       

  // Convert epoch time to human-readable date format
  tm* timeStruct = gmtime((time_t*)&epochTime);
  String date = String(timeStruct->tm_mday) + "/" + String(timeStruct->tm_mon + 1) + "/" + String(timeStruct->tm_year + 1900);

  // Prepare data in JSON format with UID and readable timestamp
  String jsonData = "{";
  jsonData += "\"uid\":\"" + uid + "\",";
  jsonData += "\"date\":\"" + date + "\",";
  jsonData += "\"time\":\"" + formattedDateTime + "\"";
  jsonData += "}";

  // Create a unique path using millis()
  String path = "/rfid_data/" + String(millis());

  // Send data to Firebase
  int response = firebase.pushJson(path, jsonData);
  if (response == 200) {
    Serial.println("Data sent to Firebase with date and time");
  } else {
    Serial.print("Failed to send data: ");
    Serial.println(response);
  }

  // Halt the RFID card processing
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  delay(500);  // Small delay before next read
}
