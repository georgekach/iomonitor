'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients',
	function($scope, $stateParams, $location, Authentication, Clients) {
		$scope.authentication = Authentication;

		// Create new Client
		$scope.create = function() {
			// Create new Client object
			var client = new Clients ({
				name: this.name
			});

			// Redirect after save
			client.$save(function(response) {
				$location.path('clients/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Client
		$scope.remove = function(client) {
			if ( client ) { 
				client.$remove();

				for (var i in $scope.clients) {
					if ($scope.clients [i] === client) {
						$scope.clients.splice(i, 1);
					}
				}
			} else {
				$scope.client.$remove(function() {
					$location.path('clients');
				});
			}
		};

		// Update existing Client
		$scope.update = function() {
			var client = $scope.client;

			client.$update(function() {
				$location.path('clients/' + client._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Clients
		$scope.find = function() {
			$scope.clients = Clients.query();
		};

		// Find existing Client
		$scope.findOne = function() {
			$scope.client = Clients.get({ 
				clientId: $stateParams.clientId
			});
		};
		
		// Highcharts
		/*
		//This is not a highcharts object. It just looks a little like one!
                $scope.chartConfig = {
                
                  options: {
                      //This is the Main Highcharts chart config. Any Highchart options are valid here.
                      //will be overriden by values specified below.
                      chart: {
                          type: 'bar'
                      },
                      tooltip: {
                          style: {
                              padding: 10,
                              fontWeight: 'bold'
                          }
                      }
                  },
                  //The below properties are watched separately for changes.
                
                  //Series object (optional) - a list of series using normal highcharts series options.
                  series: [{
                     data: [10, 15, 12, 8, 7]
                  }],
                  //Title configuration (optional)
                  title: {
                     text: 'Hello'
                  },
                  //Boolean to control showng loading status on chart (optional)
                  //Could be a string if you want to show specific loading text.
                  loading: false,
                  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
                  //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
                  xAxis: {
                  currentMin: 0,
                  currentMax: 20,
                  title: {text: 'values'}
                  },
                  //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
                  useHighStocks: false,
                  //size (optional) if left out the chart will default to size of the div or something sensible.
                  size: {
                   width: 400,
                   height: 300
                  },
                  //function (optional)
                  func: function (chart) {
                   //setup some logic for the chart
                  }
                };
*/
		

        var globalSeries;
<<<<<<< HEAD
        /*Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });*/
=======
        //Highcharts.setOptions({
        //    global: {
        //        useUTC: false
        //    }
        //});
>>>>>>> origin/master
        $scope.chartConfig = {
            chart: {
                type: 'spline',
                //renderTo: 'container',
                //animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        globalSeries = series;
                      
                        updateData();
                    }
                }
            },
            title: {
                text: 'Readings Cold Room 1'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
<<<<<<< HEAD
            },/*,
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                }
            }*/
=======
            },
            //tooltip: {
             //   formatter: function () {
             //       return '<b>' + this.series.name + '</b><br/>' +
             //               Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
             //               Highcharts.numberFormat(this.y, 2);
             //   }
            //},
>>>>>>> origin/master
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                            time = (new Date()).getTime(),
                            i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        };

       
       function updateData(){
            setInterval(function () {
                var x = (new Date()).getTime(), // current time
                        y = Math.random();
               globalSeries.addPoint([x, y], true, true);
            }, 1000);
        }
    /*    var socket = io.connect('http://localhost:3001');


        socket.on('pushdata', function (data) {
            document.getElementById("currentreading").innerHTML = data.readingvalue;
            //ko.applyBindings(new ViewModel(data));
            //updateData(data);

            var x = data.readingtime,
                    y = data.readingvalue/100; //Math.random();
            globalSeries.addPoint([x, y], true, true);

        });*/
       	
	}
]);