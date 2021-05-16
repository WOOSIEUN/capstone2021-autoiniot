#include <DHT.h>
#include <SPI.h>
#include <MFRC522.h>

#define DHTTYPE DHT11
#define DHTPIN 2
#define GasPIN 3
#define FirePIN 4
#define BuzzerPIN 5
#define SS_PIN 10
#define RST_PIN 9

DHT dht(DHTPIN, DHTTYPE);
MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key; 
byte nuidPICC[4];
bool delayFlag;

void setup() {
  pinMode(BuzzerPIN, OUTPUT);
  Serial.begin(9600); 
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522 

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  } 
}

void loop() {
  if (delayFlag) delay(700);
  else delay(1000);
  delayFlag = false;
  
  // Temperature & Humidity
  int h = dht.readHumidity();    // 변수 h를 선언하며 습도값 대입
  int t = dht.readTemperature(); // 변수 t를 선언하며 온도값 대입
  Serial.print("Humidity: ");   // 시리얼 모니터에 출력(이하 생략)
  Serial.print(h);
  Serial.print(" \t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.println(" C");
  
  // Flame Sensor
  if(digitalRead(FirePIN)==LOW) { //Detected Fire
    Serial.println("** Fire **");
  } else {    
    Serial.println("No Fire");
  }
  
  // Gas Sensor
  if(digitalRead(GasPIN)==LOW) { //Detected Gas
    Serial.println("** Gas **");
  } else {    
    Serial.println("No Gas");
  }
  
  // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
  // Verify if the NUID has been readed
  if ( ! rfid.PICC_IsNewCardPresent() || ! rfid.PICC_ReadCardSerial()) {
    // 카드 값 삭제해서 출력
    return;  
  }

  Serial.print(F("PICC type: "));
  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
  Serial.println(rfid.PICC_GetTypeName(piccType));

  // Check is the PICC of Classic MIFARE type
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&  
    piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
    piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
    // 형식에 맞지 않는 경우이므로 이때도 카드 값은 삭제해서 출력
    Serial.println(F("Your tag is not of type MIFARE Classic."));
    return;
  }

  if (rfid.uid.uidByte[0] != nuidPICC[0] || 
    rfid.uid.uidByte[1] != nuidPICC[1] || 
    rfid.uid.uidByte[2] != nuidPICC[2] || 
    rfid.uid.uidByte[3] != nuidPICC[3] ) {
    Serial.println(F("A new card has been detected."));

    // Store NUID into nuidPICC array
    for (byte i = 0; i < 4; i++) {
      nuidPICC[i] = rfid.uid.uidByte[i];
    }
    
    // 해당부분 이용하여 출력 수정
    Serial.println(F("The NUID tag is:"));
    Serial.print(F("In hex: "));
    printHex(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
    Serial.print(F("In dec: "));
    printDec(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();

    // 부저울리기
    digitalWrite(BuzzerPIN, HIGH);
    delay(300);
    digitalWrite(BuzzerPIN, LOW);
    delayFlag = true;
  } else Serial.println(F("Card read previously."));
  //위 else문도 이미 이전에 읽은 것이므로 카드 값 삭제해서 출력

  // Halt PICC
  rfid.PICC_HaltA();

  // Stop encryption on PCD
  rfid.PCD_StopCrypto1();
}

void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}

void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], DEC);
  }
}
