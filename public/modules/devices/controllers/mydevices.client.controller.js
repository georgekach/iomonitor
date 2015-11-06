'use strict';

// Devices controller
angular.module('devices').controller('MyDevicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'MyDevices', '$rootScope', '$mdToast', 'Devicesensors', 'Sensortypes', '$filter', 'Devicesensoralerts', '$modal','Readings2','DeviceSensor',
	function ($scope, $stateParams, $location, Authentication, MyDevices, $rootScope, $mdToast, Devicesensors, Sensortypes, $filter, Devicesensoralerts, $modal,Readings2,DeviceSensor) {
		$scope.authentication = Authentication;
		$rootScope.section = 'Devices';
		$scope.selectedView = '';
		$scope.selectedAlertView = '';
		$scope.currentSelectedSensorAlert = '';
		$scope.selectedAlertActionView = '';
		$scope.currentSelectedSensorAlertAction = '';
		$scope.devicesReadings = '';

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

		$scope.currentSelectedSensor = '';
		$scope.availableSensortypes = '';
		$scope.showView = function (selection, sensor) {
			$scope.selectedView = selection;
			$scope.currentSelectedSensor = sensor;
			if ((selection === 'edit') || (selection === 'create')) {

				$scope.availableSensortypes = Sensortypes.query();

			}
		};

		$scope.showAlertView = function (selection, sensorAlert) {
			$scope.selectedAlertView = selection;
			if(sensorAlert) {
				$scope.currentSelectedSensorAlert = sensorAlert;
				if (sensorAlert.alarmactions) {
					$scope.currentSelectedSensorAlertsActions = sensorAlert.alarmactions;
				}
			}

		};
		$scope.showAlertActionView = function (selection, sensorAlertAction) {
			$scope.selectedAlertActionView = selection;
			if(sensorAlertAction){
			$scope.currentSelectedSensorAlertAction = sensorAlertAction;
			}

		};
		// Create new Device
		$scope.create = function () {


			// Create new Device object
			var device = new MyDevices({
				deviceId: this.deviceId,
				location: this.location,
				name: this.name,
				description: this.description

			});

			if (device.sensors) {
				device.sensors.push({ name: 'An Embedded Sensor Document', sensoralerts: [] });
			} else {
				device.sensors = [];
				device.sensors.push({ name: 'An Embedded Sensor Document', sensoralerts: [] });
			}

			//device.sensors.push({name:'An Embedded Sensor Document',sensoralerts:[]});
			// Redirect after save
			device.$save(function (response) {
				$location.path('devices/' + response._id);

				// Clear form fields

				$scope.location = '';
				$scope.deviceId = '';

				$mdToast.show(
					$mdToast.simple()
						.content('Record Created')
						.position($scope.getToastPosition())
						.hideDelay(3000)
					);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		// Remove existing Device
		$scope.remove = function (device) {
			if (device) {
				device.$remove();

				for (var i in $scope.devices) {
					if ($scope.devices[i] === device) {
						$scope.devices.splice(i, 1);
					}
				}
			} else {
				$scope.device.$remove(function () {
					$location.path('devices');
				});
			}
		};

		// Update existing Device
		$scope.update = function () {
			var device = $scope.device;

			device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

				//$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Find a list of Devices
		$scope.find = function () {
			$scope.devices = MyDevices.query();
		};

		$scope.deviceSensorAlerts = '';
		// Find existing Device
		$scope.findOne = function () {
			$scope.device = MyDevices.get({
				deviceId: $stateParams.deviceId
			});


			$scope.devicesReadings = Readings2.query({ myId: $stateParams.deviceId});



		/*	var resultP = Devicesensors.query();
			var devId = $stateParams.deviceId;
			$scope.connectedSensors = resultP;
			var resForDeviceSensorAlerts = Devicesensoralerts.query();
			$scope.deviceSensorAlerts = resForDeviceSensorAlerts;*/
			
		};

		$scope.animationsEnabled = true;

		$scope.openCreateSensorAlert = function (size, selectedAlert) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralerts/views/create-devicesensoralert.client.view.html',//'myModalContent.html',
				controller: function ($modalInstnce, $scope, alert) {
					$scope.devicesensoralert = alert;
				},
				size: size,
				resolve: {
					alert: function () {
						return selectedAlert;
					}
				}
			});
		};

		$scope.openEditSensorAlert = function (size, selectedAlert) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralerts/views/edit-devicesensoralert.client.view.html',//'myModalContent.html',
				controller: function ($modalInstance, $scope, alert) {
					$scope.devicesensoralert = alert;

					$scope.ok = function () {
						$modalInstance.close(alert);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};

				},
				size: size,
				resolve: {
					alert: function () {
						return selectedAlert;
					}
				}
			});
		};

		$scope.openEditDevice = function (size, selectedDevice) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devices/views/edit-device.client.view.html',//'myModalContent.html',
				controller: function ($modalInstance, $scope, deviceOnEdit) {
					$scope.device = deviceOnEdit;

					var resultP = Devicesensors.query();
					var devId = $scope.device._id;
					$scope.connectedSensors = resultP;

					var resForDeviceSensorAlerts = Devicesensoralerts.query();
					$scope.deviceSensorAlerts = resForDeviceSensorAlerts;

					$scope.ok = function () {
						$modalInstance.close(deviceOnEdit);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};

				},
				windowClass: 'app-modal-window',
				size: size,
				resolve: {
					deviceOnEdit: function () {
						return selectedDevice;
					}
				}
			});
		};

		//update device on modal
		this.updateDevice = function () {
			var device = $scope.device;

			console.log(' Device Details are ' + device.location.lon);

			$scope.device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
					);

				$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.createsensor = function() {

			// Create new Devicesensor object
			/*var devicesensor = new Devicesensors ({
				name: this.sensorname_c,
				sensortype: this.sensortype_c,
				deviceId: this.parentdeviceId,
				channel: this.channel_c
			});*/

			if(!$scope.device.sensors){
				$scope.device.sensors = [];
			}

			$scope.device.sensors.push({
					name: this.sensorname_c,
				sensortype: this.sensortype_c,
				channel: this.channel_c
				});

			$scope.device.$update(function(err)
			{
				if(err)
				{
					console.log('error updating record');
				}

				$mdToast.show(
					$mdToast.simple()
						.content('Sensor Record Created')
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);


			});
			// Redirect after save
			/*
			devicesensor.$save(function(response) {
				//$location.path('devicesensors/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.sensorname_c = '';
					$scope.sensortype_c = '';
					$scope.parentdeviceId = '';
					$scope.channel_c = '';
				$scope.showView('view',$scope.currentSelectedSensor);

				$mdToast.show(
					$mdToast.simple()
						.content('Sensor Record Created')
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				$mdToast.show(
					$mdToast.simple()
						.content('Error '+ $scope.error)
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);
			});*/
		};

		$scope.connectedSensorTabSelected = function()
		{

			alert('Youve selected connected sensors');
		};

		$scope.removeSensor = function(devicesensor)
		{
			$scope.device.sensors.splice( $scope.device.sensors.indexOf(devicesensor), 1 );
			$scope.device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);
				if($scope.device.sensors){
					$scope.currentSelectedSensor = $scope.device.sensors[0];
					$scope.showView('edit',$scope.currentSelectedSensor);
				}

				//$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		$scope.createSensorAlert = function(){

			var newDeviceSensorAlert = {
				name: this.alertname_c
			};

			console.log('Alert Details'+newDeviceSensorAlert);
			newDeviceSensorAlert.alarmactions = [];

			$scope.showAlertView('editAlert',newDeviceSensorAlert);


			if($scope.currentSelectedSensor.sensoralerts){
				$scope.currentSelectedSensor.sensoralerts.push(newDeviceSensorAlert);

			}
			else{
				$scope.currentSelectedSensor.sensoralerts = [];
				$scope.currentSelectedSensor.sensoralerts.push(newDeviceSensorAlert);
			}
			$scope.device.$update(function (){



				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);
			});
		};

		$scope.removeSensorAlert = function(alert){
			console.log(alert);
			console.log($scope.currentSelectedSensor.sensoralerts);
			$scope.currentSelectedSensor.sensoralerts.id(alert._id).remove();
			$scope.device.save(function(err){

			});
		};

		$scope.createAlertAction = function()
		{
			var newAlertAction = {

				name: this.alertaction_name_c,
				actiontype: this.alertaction_actiontype_c,
				thresholdvaluemin:this.alertaction_thresholdvaluemin_c,
				thresholdvaluemax: this.alertaction_thresholdvaluemax_c,
				sendonclear: this.alertaction_sendonclear_c
			};

			//$scope.showAlertActionView();
			if($scope.currentSelectedSensorAlert.alertactions)
			{
				$scope.currentSelectedSensorAlert.alertactions.push(newAlertAction);
			}
			else{
				$scope.currentSelectedSensorAlert.alertactions = [];
				$scope.currentSelectedSensorAlert.alertactions.push(newAlertAction);

			}

			$scope.device.$update(function(){
				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
			);

			});
		};

		$scope.updateDeviceSensor = function()
		{
			var deviceSensor = $scope.currentSelectedSensor;

			deviceSensor.$update(function() {
				//$location.path('devices/' + device._id);
				$mdToast.show(
					$mdToast.simple()
						.content('Device Sensor Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		$scope.updateRecord = function()
		{


			$scope.device.$update(function() {
				//$location.path('devices/' + device._id);
				$mdToast.show(
					$mdToast.simple()
						.content('Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.connectedSensorsTabSelected = function () {

			if($scope.device.sensors){
				$scope.currentSelectedSensor = $scope.device.sensors[0];

				$scope.showView('edit',$scope.currentSelectedSensor);
			}


		};

		$scope.sensorsAlertsTabSelected = function () {

			if($scope.currentSelectedSensor.sensoralerts){
				$scope.currentSelectedSensorAlert = $scope.currentSelectedSensor.sensoralerts[0];

				$scope.showAlertView('editAlert',$scope.currentSelectedSensorAlert);
			}

		};

	}
]);
