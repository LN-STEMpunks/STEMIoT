#include <SparkFun_Photon_Weather_Shield_Library/SparkFun_Photon_Weather_Shield_Library.h>

//For simple math computations
#include <math.h>

/*

Pins used to connect various sensors

*/
int led1 = D0;
int led2 = D7;
int power = A5; 

/*

Our three readings we get

*/
double humidity = 0;
double tempf = 0;
double pascals = 0;

//Sensor
Weather sensor;

//Runs once, setup pins and such
void setup() {
    Particle.variable("humidity", humidity);
    Particle.variable("tempF", tempf);
    Particle.variable("pascals", pascals);
    sensor.begin();
    sensor.setModeBarometer();
    sensor.setOversampleRate(7);
    sensor.enableEventFlags();
    pinMode(led1, OUTPUT);
    pinMode(led2, OUTPUT);
    pinMode(power,OUTPUT);
    digitalWrite(power,HIGH);
}

//Should loop once per second
void loop() {
    on();
    delay(500);
    off();
    delay(500);
    getWeather();
    //Publish to event api
    Particle.publish("humidity", String(humidity));
    Particle.publish("tempF", String(tempf));
    Particle.publish("pascals", String(pascals));
}

//Turn both on
void on() {
      digitalWrite(led1, HIGH);
      digitalWrite(led2, HIGH);
}

//Turn both off
void off() {
      digitalWrite(led1, LOW);
      digitalWrite(led2, LOW);
}

//Updates all 3 variables
void getWeather()
{
  // Measure Relative Humidity from the HTU21D or Si7021
  humidity = sensor.getRH();

  // Measure Temperature from the HTU21D or Si7021
  tempf = sensor.getTempF();

  //Measure Pressure from the MPL3115A2
  pascals = sensor.readPressure();
}

