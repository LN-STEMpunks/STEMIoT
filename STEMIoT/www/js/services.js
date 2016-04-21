angular.module('starter.services', [])

.factory('Readings', function($rootScope) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var temperatures = [];
  var pressures = [];
  var humidities = [];


  var particle = new Particle();
  var token;

  token = '57c291e0afee2c04ae67a0337895eacf4060aae1';

function getEventStream(){
//Get all events
particle.getEventStream({ auth: token, deviceId: '350029000a47343337373738'}).then(function(stream) {
  stream.on('event', function(data) {
    console.log("Event: "  + data.name + ": " + data.data );
    $rootScope.$broadcast("dataRecievedEvent", {name: data.name, timestamp: new Date(), value: data.data});
  });
});
}

getEventStream();

return {
  temperatures: function() {
    return temperatures;
  },
  pressures: function() {
    return pressures;
  },
  humidities: function() {
    return humidities;
  },
};
});
