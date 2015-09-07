'use strict';

// Devices controller
angular.module('devices').controller('DevicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Devices','$rootScope','$mdToast','Devicesensors','Sensortypes','$filter','Devicesensoralerts','$modal',
	function($scope, $stateParams, $location, Authentication, Devices,$rootScope,$mdToast,Devicesensors,Sensortypes,$filter,Devicesensoralerts,$modal) {
		$scope.authentication = Authentication;
		$rootScope.section = 'Devices';
		$scope.selectedView = '';
		$scope.selectedAlertView = '';
		$scope.currentSelectedSensorAlert = '';
		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};

		$scope.getToastPosition = function() {
			return Object.keys($scope.toastPosition)
				.filter(function(pos) { return $scope.toastPosition[pos]; })
				.join(' ');
		};

		$scope.currentSelectedSensor = '';
		$scope.availableSensortypes = '';
		$scope.showView = function(selection,sensor)
		{
			$scope.selectedView = selection;
			$scope.currentSelectedSensor = sensor;
			if((selection==='edit')||(selection==='create'))
			{

				$scope.availableSensortypes = Sensortypes.query();

			}
		};

		$scope.showAlertView = function(selection,sensorAlert)
		{
			$scope.selectedAlertView = selection;
			$scope.currentSelectedSensorAlert = sensorAlert;
			$scope.currentSelectedSensorAlertsActions = sensorAlert.alarmactions;

		};
		// Create new Device
		$scope.create = function() {
			
			
			// Create new Device object
			var device = new Devices ({
				deviceId: this.deviceId,
				location : this.location,
				name: this.name,
				description: this.description
			});

			// Redirect after save
			device.$save(function(response) {
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
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.createsensor = function() {
			// Create new Devicesensor object
			var devicesensor = new Devicesensors ({
				name: this.sensorname_c,
				sensortype: this.sensortype_c,
				deviceId: this.parentdeviceId,
				channel: this.channel_c
			});

			// Redirect after save
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
			});
		};

		// Remove existing Device
		$scope.remove = function(device) {
			if ( device ) { 
				device.$remove();

				for (var i in $scope.devices) {
					if ($scope.devices [i] === device) {
						$scope.devices.splice(i, 1);
					}
				}
			} else {
				$scope.device.$remove(function() {
					$location.path('devices');
				});
			}
		};

		// Update existing Device
		$scope.update = function() {
			var device = $scope.device;

			device.$update(function() {
				$location.path('devices/' + device._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.updateDeviceSensor = function()
		{
			var deviceSensor = $scope.currentSelectedSensor;

			deviceSensor.$update(function() {
				//$location.path('devices/' + device._id);
				$scope.showView('view',$scope.currentSelectedSensor);

				$mdToast.show(
					$mdToast.simple()
						.content('Sensor Record Updated')
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// Find a list of Devices
		$scope.find = function() {
			$scope.devices = Devices.query();
		};

		$scope.deviceSensorAlerts = '';
		// Find existing Device
		$scope.findOne = function() {
			$scope.device = Devices.get({ 
				deviceId: $stateParams.deviceId
			});
			var resultP = Devicesensors.query();
			var devId = $stateParams.deviceId;
			$scope.connectedSensors = resultP;

			var resForDeviceSensorAlerts = Devicesensoralerts.query();
			$scope.deviceSensorAlerts = resForDeviceSensorAlerts;

		};

		$scope.animationsEnabled = true;

		$scope.openCreateSensorAlert = function (size,selectedAlert) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralerts/views/create-devicesensoralert.client.view.html',//'myModalContent.html',
				controller: function($modalInstnce,$scope,alert){
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

		$scope.openEditSensorAlert = function (size,selectedAlert) {

				var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralerts/views/edit-devicesensoralert.client.view.html',//'myModalContent.html',
				controller: function($modalInstance,$scope,alert){
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

		$scope.openEditDevice = function (size,selectedDevice) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devices/views/edit-device.client.view.html',//'myModalContent.html',
				controller: function($modalInstance,$scope,deviceOnEdit){
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
		this.updateDevice = function(dev) {
			var device = dev;


			device.$update(function() {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);


			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
