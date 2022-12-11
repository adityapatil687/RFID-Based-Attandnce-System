#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 11
#define RST_PIN 6

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance.

String OldCardID = "";
unsigned long previousMillis = 0;

#include <WiFiNINA.h>
#include <ArduinoHttpClient.h>
#include "arduino_secrets.h" 

char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)

char serverAddress[] = " ";  // server address || localhost
int port = 80;

int status = WL_IDLE_STATUS;

WiFiClient wifiClient;
HttpClient httpClient = HttpClient(wifiClient, serverAddress, port);

void setup()
{
  isWifi();
  Serial.begin(9600);
  SPI.begin(); 
  mfrc522.PCD_Init();
}

void loop() {
  delay(50);
  
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
 
  if ( ! mfrc522.PICC_ReadCardSerial()) {
    return;
  }
  
  String CardID ="";
  
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    CardID += mfrc522.uid.uidByte[i];
  }
  
  if( CardID == OldCardID ){
    return;
  }
  
  else{
    OldCardID = CardID;
  }
  
  Serial.println(CardID);

  if(CardID != "")
  {
    postRequest("/myPost", CardID);
    readResponse();
  }
  delay(1000);
}

void getRequest(String alpha)
{ 
  httpClient.get(alpha);
}

void postRequest(String delta, String data)
{
  Serial.println("making POST request");
  
  String contentType = "application/json";
  String postData = "{\"id\":"+data+"}";
  httpClient.post("/myPost", contentType, postData);
}

void readResponse()
{
  int statusCode = httpClient.responseStatusCode();
  String response = httpClient.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);
}

void printWifiStatus()
{
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void isWifi()
{
   // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) 
  {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv < WIFI_FIRMWARE_LATEST_VERSION) 
  {
    Serial.println("Please upgrade the firmware");
  }

  // attempt to connect to WiFi network:
  while (status != WL_CONNECTED)
  {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    Serial.println("Connected to WiFi");
    printWifiStatus();
  }
}
