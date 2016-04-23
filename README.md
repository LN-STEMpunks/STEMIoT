# STEMIoT
IoT challenge #4 for LNSTEMPUNKS FRC 3966

## Explanation
Using a IoT Particle Photon we use the WeatherShield module to monitor temperature, humidity, and barometric pressure.


These values are each recorded at a rate of once per second, and are published to the Particle Cloud Event API once per second.


In our WebApp (http://lnstempunks.azurewebsites.net/STEMIoT/), we capture these values in an event stream, and build charts that update in real time.

 
We make use of Ionic, AngularJS, Google Visualization Charts, and Particle Javascript SDK.

## Implementation
You can see this in action by visiting http://lnstempunks.azurewebsites.net/STEMIoT/