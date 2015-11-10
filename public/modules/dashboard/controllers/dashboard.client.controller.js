'use strict';

angular.module('dashboard').controller('DashboardController', ['$scope','$mdToast', '$animate','$mdDialog','$interval','Devices','MyDevices',"Authentication",
	function($scope,$mdToast, $animate,$mdDialog,$interval,Devices,MyDevices,Authentication) {
		// Controller Logic
		// ...
		$scope.authentication = Authentication;

		var usersClient = $scope.authentication.user.client;
		if(usersClient){
			$scope.devices = MyDevices.query();
		}else
		{
			$scope.devices = Devices.query();
		}

		$scope.selectedDevice = '';

		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};

		$scope.getToastPosition = function () {
			return Object.keys($scope.toastPosition)
				.filter(function (pos) { return $scope.toastPosition[pos]; })
				.join(' ');
		};

		var globalSeries;

		/*Highcharts.setOptions({
		 global: {
		 useUTC: false
		 }
		 });*/

		var socket = io('https://40.124.8.98');
		socket.on('connect', function(){
			console.log('connected');
		});
		var currentDeviceId = '';
		$scope.sensor1 ='';
		$scope.sensor2 = '';
		$scope.sensor3 = '';
		$scope.sensor4 = '';

		if($scope.selectedDevice)
		currentDeviceId = $scope.selectedDevice.deviceId;
		$scope.$watch('selectedDevice',function(){

				$scope.chartConfig.series[0].data = [];
				$scope.chartConfig.series[1].data = [];

		});

		socket.on('pushdata', function(data){


			/*console.log('Data Received'+ data.readingtime+' '+data.readingvalue+ ''+data.device);

			console.log('$scope.myval = '+$scope.myval)*/
			if($scope.selectedDevice)
			if(data.device==$scope.selectedDevice.deviceId)
			{
				$scope.$apply(function(){
					$scope.sensor1 = data.sensor1;
					$scope.sensor2 = data.sensor2;
					$scope.sensor3 = data.sensor3;
					$scope.sensor4 = data.sensor4;

					var x = (new Date()).getTime(); // current time
					var y = data.sensor1,y2 = data.sensor2;
					//$scope.chartConfig.series[0].data.concat(10,x,y)//.addPoint([x, y], true, true);
					if($scope.chartConfig.series[0].data){
						if($scope.chartConfig.series[0].data.length>15)
						$scope.chartConfig.series[0].data.shift();
						$scope.chartConfig.series[0].data.push([x,  parseFloat(y)]);}
					if($scope.chartConfig.series[1].data){
						if($scope.chartConfig.series[1].data.length>15)
					 $scope.chartConfig.series[1].data.shift();
					 $scope.chartConfig.series[1].data.push([x, parseFloat(y2)]);
					 //$scope.myval = y;
					 }
					if($scope.chartConfig.series[2].data){
						if($scope.chartConfig.series[2].data.length>15)
							$scope.chartConfig.series[2].data.shift();
						$scope.chartConfig.series[2].data.push([x, parseFloat(data.sensor3)]);
						//$scope.myval = y;
					}
					if($scope.chartConfig.series[3].data){
						if($scope.chartConfig.series[3].data.length>15)
							$scope.chartConfig.series[3].data.shift();
						$scope.chartConfig.series[3].data.push([x, parseFloat(data.sensor4)]);
						//$scope.myval = y;
					}

				});

				/*
			$mdToast.show(

				$mdToast.simple()
					.content('Data Received @'+ data.readingtime+'  '+data.readingvalue)
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);*/
		}

		});
		socket.on('disconnect', function(){

			console.log('Connection is lost');
		});

		$scope.colours = [{
			name: 'Red',
			hex: '#F21B1B'
		}, {
			name: 'Blue',
			hex: '#1B66F2'
		}, {
			name: 'Green',
			hex: '#07BA16'
		}];
		$scope.colour = '';

		$scope.center = {
			lat: -17.829220000000000000,
				lon: 31.053961000000072000,
				zoom: 8
		};
		$scope.defaults = {
			layer: {
				url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
			},
			map: {
				scrollWheelZoom: true
			},
			controls: {
				zoom: {
					position: 'topright'
				}
			}
		};

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

						this.updateData();
					}
				}
			},
			title: {
				text: 'Readings'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 150
			},
			yAxis: {
				title: {
					text: 'Temperature'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}],
				max:100

			},
			//tooltip: {
			//   formatter: function () {
			//       return '<b>' + this.series.name + '</b><br/>' +
			//               Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
			//               Highcharts.numberFormat(this.y, 2);
			//   }
			//},
			pointInterval: 60*1000,// every minute
			legend: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: 'Sensor 1',
				data: (function () {
					// generate an array of random data
					var data = [],
				time = (new Date()).getTime(),
						i; /*

					for (i = -19; i <= 0; i += 1) {
						data.push({
							x: time + i * 1000,
							y: Math.random()
						});
					}*/
					return data;
				}()),
				color:'#808080'
			},
				{
					name: 'Sensor 2',
					data: (function () {
						// generate an array of random data
						var data = [],
							time = (new Date()).getTime(),
							i;/*

						for (i = -19; i <= 0; i += 1) {
							data.push({
								x: time + i * 1000,
								y: Math.random()
							});
						}*/
						return data;
					}()),
					color:'#ff0000'
				},
				{
					name: 'Sensor 3',
					data: (function () {
						// generate an array of random data
						var data = [],
							time = (new Date()).getTime(),
							i;/*

						 for (i = -19; i <= 0; i += 1) {
						 data.push({
						 x: time + i * 1000,
						 y: Math.random()
						 });
						 }*/
						return data;
					}()),
					color:'#0000ff'
				},
				{
					name: 'Sensor 4',
					data: (function () {
						// generate an array of random data
						var data = [],
							time = (new Date()).getTime(),
							i;/*

						 for (i = -19; i <= 0; i += 1) {
						 data.push({
						 x: time + i * 1000,
						 y: Math.random()
						 });
						 }*/
						return data;
					}()),
					color:'#00ff00'
				}
			]
		};

		$scope.myval = 0;

		$scope.options = {
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;

				for (i = -19; i <= 0; i += 1) {
					data.push({
						sales:time + i * 1000 ,
						income: Math.random()
					});
				}
				return data;
			}())

			,
			dimensions: {
				sales: {
					type: 'line'
				},
				income: {
					axis: 'x'
				}
			}
		};

		$scope.pushpoint = function()
		{
			$scope.options.data.shift();
			$scope.options.data.push({sales:(new Date()).getTime(),income: Math.random()});
		};

		$scope.update = function() {
			$scope.chartConfig.title = $scope.selectedDevice.name;
			// use $scope.selectedItem.code and $scope.selectedItem.name here
			// for other stuff ...
		};

		$scope.showSummary = function(selection)
		{
			$scope.selectedSummary = selection;

		};
		/*
		// undo this for dummy data

		$interval(function(){
		//	$scope.myval = Math.random();
			var x = (new Date()).getTime(), // current time
				y = Math.random();
			//$scope.chartConfig.series[0].data.concat(10,x,y)//.addPoint([x, y], true, true);
			$scope.chartConfig.series[0].data.shift();
			$scope.chartConfig.series[0].data.push([x, y]);
			$scope.myval = y*100;

		},1000);*/

		function updateData(){
			setInterval(function () {
				var x = (new Date()).getTime(), // current time
					y = Math.random();
				//$scope.chartConfig.series[0].data.concat(10,x,y)//.addPoint([x, y], true, true);
				globalSeries.addPoint([x, y], true, true);
			}, 1000);
		}

	}
]);
