'use strict';

angular.module('dashboard').controller('DashboardController', ['$scope','$mdToast', '$animate','$mdDialog','$interval','Devices','MyDevices','Authentication','$log','$timeout','$q',
	function($scope,$mdToast, $animate,$mdDialog,$interval,Devices,MyDevices,Authentication,$log,$timeout,$q) {
		// Controller Logic
		// ...
		//
		$scope.selectedDevice = '';
		$scope.authentication = Authentication;

		//overlay morph
		$scope.morphSettings = {
			closeEl: '.close',
			overlay: {
				templateUrl: 'modules/dashboard/views/morph.client.view.html',
				scroll: false
			}
		};


		//angular-intro
		$scope.IntroOptions = {
			steps:[
				{
					element: '#step1',
					intro: 'First tooltip'
				},
				{
					element: '#step4',
					intro: 'Second tooltip',
					position: 'right'
				}]
		};

		$scope.callFunction = function(){
			$timeout( function() {
				$scope.CallMe('1');
			});
		};

		var usersClient = $scope.authentication.user.client;
		if(usersClient){
			$scope.devices = MyDevices.query();
		}else
		{

			$scope.devices = Devices.query();

		}



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

		/*
		var socket = io('https://40.124.8.98');
		socket.on('connect', function(){
			console.log('connected');
		});*/
		var currentDeviceId = '';
		$scope.sensor1 ='';
		$scope.sensor2 = '';
		$scope.sensor3 = '';
		$scope.sensor4 = '';

		if($scope.selectedDevice)
		currentDeviceId = $scope.selectedDevice.deviceId;

	var count = 0;

		var myRun;
/*
		var myRun = $interval(function(dev){
			console.log('getDeviceData called ' +dev._Id);
			var devs = Devices.query();
			var currentDevice = dev;


			console.log(currentDevice);
			if(typeof currentDevice !== 'undefined') {


				//$scope.evalAsync(function(){
				//$timeout(function() {
				console.log('Inside $timeout');
				count = count + 1;
				$scope.sensor1 = count;
				$scope.sensor2 = currentDevice.latestreadinglastValue2;
				$scope.sensor3 = currentDevice.latestreadinglastValue3;
				$scope.sensor4 = currentDevice.latestreadinglastValue4;

				$scope.pushpoint({sensor1:$scope.sensor1,sensor2:$scope.sensor2,sensor3:$scope.sensor3,sensor4:$scope.sensor4})
			}
			},5000
				);
*/

		/*
		var c=0;
		$scope.message="This DIV is refreshed "+c+" time.";
		$interval(function(){
			$scope.message="This DIV is refreshed "+c+" time.";
			c++;
		},1000);
		 */

		$scope.fail=false;

		$scope.myFunction = function(){

			var deferred  = $q.defer();
			var promise  = deferred.promise;

			promise.then(function(result){
				alert('success'+ result);
			},function(reason){
				alert('Error '+ reason);
			});

			if($scope.fail) {
				deferred.reject('Sorry');
			}
				else {
				deferred.resolve('Cool');
			}


		};


		$scope.start = function () {
			$scope.stop();
			myRun = $interval(function(){
				/*console.log('pushed point');
				console.log('Selected Device is '+$scope.selectedDevice)*/

				if($scope.selectedDevice){
				Devices.get({deviceId:$scope.selectedDevice._id},function(deviceData){

					/*console.log('found the data');
					console.log('deviceData.latestreadinglastValue1 ->'+deviceData.latestreadinglastValue1);*/
					$scope.pushpoint({sensor1:deviceData.latestreadinglastValue1,
						sensor2:deviceData.latestreadinglastValue2,
						sensor3:deviceData.latestreadinglastValue3,
						sensor4:deviceData.latestreadinglastValue4});
				});
				}



			},1000);
		};

		$scope.stop = function () {
			$interval.cancel(myRun);
		};

		$scope.$on('$destroy', function() {
			$scope.stop();
		});

		$scope.$watch('selectedDevice',function(){
			$scope.stop();

			$scope.chartConfig.series[0].data = [];
			$scope.chartConfig.series[1].data = [];

			$scope.start();
		});
/*

		socket.on('pushdatac', function(data){



			if($scope.selectedDevice)
			if(data.device===$scope.selectedDevice.deviceId)
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


		}

		});
		socket.on('disconnect', function(){

			console.log('Connection is lost');
		});
		*/
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

		$scope.newPointToPush = function(){

			console.log('pushed point');
			$scope.pushpoint({sensor1:1,sensor2:4,sensor3:7,sensor4:8});
		};

		$scope.pushpoint = function(data){

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
