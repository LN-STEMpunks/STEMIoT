angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ReadingsCtrl', function($rootScope, $scope, Readings) {
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawBasic);
function drawBasic() {

  var temp_data = new google.visualization.DataTable();
  temp_data.addColumn('datetime', 'X');
  temp_data.addColumn('number', 'Temperature');

    var pressure_data = new google.visualization.DataTable();
  pressure_data.addColumn('datetime', 'X');
  pressure_data.addColumn('number', 'Pressure');

    var humidity_data = new google.visualization.DataTable();
  humidity_data.addColumn('datetime', 'X');
  humidity_data.addColumn('number', 'Humidity');

var temp_options = {
  'legend': 'none',
  hAxis: {
    title: 'Time'
  },
  //Need a way to scale it better
  vAxis: {
    title: 'Temperature (F)',
    viewWindowMode:'explicit',
    /*viewWindow: {
        max:100,
        min:55
    }*/
  },
  series: {
    0: { color: 'ff0000' }
  },
  trendlines: {
      0: {
        color: 'red',
        lineWidth: 10,
        opacity: 0.2,
        type: 'linear'
      }
    }
};

var pressure_options = {
  'legend': 'none',
  hAxis: {
    title: 'Time'
  },
  //Need a way to scale it better
  vAxis: {
    title: 'Pressure \n(pascals)',
    viewWindowMode:'explicit',
    /*viewWindow: {
        max:98000,
        min:99000
    }*/

  },
    series: {
    0: { color: '0000ff' }
  },
  trendlines: {
      0: {
        color: 'blue',
        lineWidth: 10,
        opacity: 0.2,
        type: 'linear'
      }
    }
};

var humidity_options = {
  'legend': 'none',
  hAxis: {
    title: 'Time'
  },
  //Need a way to scale it better
  vAxis: {
    title: 'Humidy (percent)',
    viewWindowMode:'explicit',
    /*viewWindow: {
        max:0,
        min:100
    }*/
  },
    series: {
    0: { color: '006400' }
  },
  trendlines: {
      0: {
        color: 'green',
        lineWidth: 10,
        opacity: 0.2,
        type: 'linear'
      }
    }
};

var temp_chart = new google.visualization.LineChart(document.getElementById('temp_div'));
var pressure_chart = new google.visualization.LineChart(document.getElementById('pressure_div'));
var humidity_chart = new google.visualization.LineChart(document.getElementById('humidity_div'));

var max_measurements = 200;


$rootScope.$on('dataRecievedEvent', function (event, args) {
  /*$scope.temperatures = Readings.temperatures();
  $scope.pressures = Readings.pressures();
  $scope.humidities = Readings.humidities();*/
  if (args.name == "tempF") {
     temp_data.addRow([args.timestamp, Number(args.value)]);
     if (temp_data.getNumberOfRows() > max_measurements) {
        temp_data.removeRow(0);
     }
  }
  if (args.name == "pascals") {
     pressure_data.addRow([args.timestamp, Number(args.value)]);
     if (pressure_data.getNumberOfRows() > max_measurements) {
        pressure_data.removeRow(0);
     }
  }
  if (args.name == "humidity") {
     humidity_data.addRow([args.timestamp, Number(args.value)]);
     if (humidity_data.getNumberOfRows() > max_measurements) {
        humidity_data.removeRow(0);
     }

  }
  temp_chart.draw(temp_data, temp_options);
  pressure_chart.draw(pressure_data, pressure_options);
  humidity_chart.draw(humidity_data, humidity_options);
})
}
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
