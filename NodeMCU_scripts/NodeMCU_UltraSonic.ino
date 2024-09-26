 #define TRIG_PIN D1  // Pin connected to Trig on HC-SR04
 #define ECHO_PIN D2  // Pin connected to Echo on HC-SR04

 void setup() {
   Serial.begin(115200);  // Initialize serial communication at 115200 baud rate
   pinMode(TRIG_PIN, OUTPUT);  // Set Trig pin as output
   pinMode(ECHO_PIN, INPUT);   // Set Echo pin as input
 }

 void loop() {
//   // Send a 10us HIGH pulse to trigger the sensor
   digitalWrite(TRIG_PIN, LOW);  
  delayMicroseconds(2);  // Ensure clean LOW pulse
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);  // 10 microseconds pulse
  digitalWrite(TRIG_PIN, LOW);

//   // Measure the time for the echo to return
  long duration = pulseIn(ECHO_PIN, HIGH);

  // Calculate the distance in centimeters
  float distance = duration * 0.034 / 2;

  // Print the distance to the Serial Monitor
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

   delay(500);  // Delay for half a second before the next reading
 }
