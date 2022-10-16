/*********
  Complete project details at https://randomnerdtutorials.com  
*********/

#include <SoftwareSerial.h>

// Configure software serial port
SoftwareSerial SIM900(7, 8); 
//Variable to save incoming SMS characters
char incoming_char=0;

void setup() {
  // Arduino communicates with SIM900 GSM shield at a baud rate of 19200
  // Make sure that corresponds to the baud rate of your module
  Serial.begin(19200);
  Serial.println("Starting SIM");
  SIM900.begin(19200);
  // Give time to your GSM shield log on to network
  // delay(20000);   
  Serial.println("Checking if working");
  // Check if working
  checkOk();
  
  // Send the SMS
  Serial.println("sending sms");
  sendSMS();
}

void loop() { 
    // Display any text that the GSM shield sends out on the serial monitor
  while(SIM900.available() >0) {
    //Get the character from the cellular serial port
    incoming_char=SIM900.read(); 
    //Print the incoming character to the terminal
    Serial.print(incoming_char); 
  }
}

void checkOk() {
  SIM900.print("AT\r");
  delay(1000);
}

void sendSMS() {
  // AT command to set SIM900 to SMS mode
  SIM900.print("AT+CMGF=1\r"); 
  delay(100);

  // REPLACE THE X's WITH THE RECIPIENT'S MOBILE NUMBER
  // USE INTERNATIONAL FORMAT CODE FOR MOBILE NUMBERS
  SIM900.println("AT+CMGS=\"+16093542562\""); 
  delay(100);
  
  // REPLACE WITH YOUR OWN SMS MESSAGE CONTENT
  SIM900.println("Message example from Arduino Uno. YEE"); 
  delay(100);

  // End AT command with a ^Z, ASCII code 26
  SIM900.println((char)26); 
  delay(100);
  SIM900.println();
  // Give module time to send SMS
  delay(5000); 
}
