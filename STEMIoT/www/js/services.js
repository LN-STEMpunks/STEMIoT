angular.module('starter.services', [])

.factory('Readings', function($rootScope) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var temperatures = [];
  var pressures = [];
  var humidities = [];


  var particle = new Particle();
  var token;

//TODO: change from password
particle.login({username: 'YOUR_EMAIL', password: 'YOUR_PASSWORD'}).then(
  function(data){
    console.log('API call completed on promise resolve: ', data.body.access_token);
    token = data.body.access_token;
  getEventStream();

  },
  function(err) {
    console.log('API call completed on promise fail: ', err);
  }
  );

function getEventStream(){
//Get all events
particle.getEventStream({ auth: token, deviceId: '350029000a47343337373738'}).then(function(stream) {
  stream.on('event', function(data) {
    console.log("Event: "  + data.name + ": " + data.data );
    $rootScope.$broadcast("dataRecievedEvent", {name: data.name, timestamp: new Date(), value: data.data});
  });
});
}

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
