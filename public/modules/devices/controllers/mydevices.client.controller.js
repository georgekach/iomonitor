'use strict';

// Devices controller
angular.module('devices').controller('MyDevicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'MyDevices', '$rootScope', '$mdToast', 'Devicesensors', 'Sensortypes', '$filter', 'Devicesensoralerts', '$uibModal','Readings2','DeviceSensor','$log','ReadingsInPeriod','moment','Devicesensoralarmactions','ClientsUsers',
	function ($scope, $stateParams, $location, Authentication, MyDevices, $rootScope, $mdToast, Devicesensors, Sensortypes, $filter, Devicesensoralerts, $uibModal,Readings2,DeviceSensor,$log,ReadingsInPeriod,moment,Devicesensoralarmactions,ClientsUsers) {
		$scope.authentication = Authentication;
		$rootScope.section = 'Devices';
		$scope.selectedView = '';
		$scope.selectedAlertView = '';
		$scope.currentSelectedSensorAlert = '';
		$scope.selectedAlertActionView = '';
		$scope.currentSelectedSensorAlertAction = '';
		$scope.devicesReadings = '';
		$scope.currentPage = 1;
		$scope.pageSize = 20;
		//Date picker
		$scope.endDate = new Date();
		$scope.startDate = new Date();

		$scope.dateFormat = 'dd-MMMM-yyyy';
		$scope.status = {
			opened: false
		};
		$scope.statusEnd = {
			opened: false
		};

		$scope.minDate = new Date(2000,1,1,0,0,0,0);

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();
		$scope.maxDate = new Date(2020, 5, 22);

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.disabled = function(date, mode) {
			return false;
			 //for disabling selection of weekend days
			 //( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};


		$scope.open = function($event) {
			$scope.status.opened = true;
		};

		$scope.open1 = function($event) {
			$scope.statusEnd.opened = true;
		};
		// end of Datepicker

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


		$scope.fetchFilteredReadings = function(sd,ed){

			console.log(sd.toJSON());
			console.log(ed.toJSON());
			$scope.devicesReadings = ReadingsInPeriod.query({myId1:$scope.device._id,startOfPeriod:sd.toJSON(),endOfPeriod:ed.toJSON()});//Readings2.query({ myId: $stateParams.deviceId});

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

		$scope.deviceSensorAlerts = '' ;
		// Find existing Device
		$scope.findOne = function () {
			$scope.device = MyDevices.get({
				deviceId: $stateParams.deviceId
			});


			var mm = moment();
			var startingMoment =  moment().subtract(2,'days');

			$scope.endDate = new Date();
			$scope.startDate = new Date(startingMoment.year(),startingMoment.month(),startingMoment.date(),0,0,0,0);
			$scope.devicesReadings = ReadingsInPeriod.query({myId1:$stateParams.deviceId,startOfPeriod:$scope.startDate.toJSON(),endOfPeriod:$scope.endDate.toJSON()});//Readings2.query({ myId: $stateParams.deviceId});

			$scope.availableSensortypes = Sensortypes.query();
			$scope.availableActionTypes = [{name:'email',type:'email'},
											{name:'text',type:'text'},
				{name:'phone',type:'phone'},
				{name:'alert',type:'alert'}];

		/*	var resultP = Devicesensors.query();
			var devId = $stateParams.deviceId;
			$scope.connectedSensors = resultP;
			var resForDeviceSensorAlerts = Devicesensoralerts.query();
			$scope.deviceSensorAlerts = resForDeviceSensorAlerts;*/
			
		};

		$scope.animationsEnabled = true;

		$scope.openCreateSensor = function (size, selecteddevice) {

			var uibModalInstance  = $uibModal.open({
				animation: $scope.animationsEnabled,

				templateUrl: 'modules/devicesensors/views/create-devicesensor.client.view.html',//'myModalContent.html',
				controller: function($uibModalInstance,$scope,device){

					//console.log('Resolved Value is  '+ device.name);
					$scope.cancel = function(){$uibModalInstance.dismiss('cancel');};
					$scope.ok = function(){
						var newSensor = new Devicesensors({
							name: this.name
						});
						$uibModalInstance.close(newSensor);
					};
				},
				size: size,
				resolve: {
					device: function () {
						//console.log('Resolved to '+ selecteddevice);
						return selecteddevice;
					}
				}
			});


			uibModalInstance.result.then(function (newSensor) {

				$scope.device.sensors.push(newSensor);
				$scope.updateDeviceAndStay();
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		$scope.openCreateSensorAlert = function (size, selectedSensor) {

			console.log('Am here');
			var uibModalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralerts/views/create-devicesensoralert.client.view.html',//'myModalContent.html',
				controller: function ($uibModalInstance, $scope, sensor) {


					$scope.cancel = function(){$uibModalInstance.dismiss('cancel');};
					$scope.ok = function(){
						var newSensorAlert = new Devicesensoralerts({
							name: this.name
						});

						var results = {
							result:newSensorAlert,
							parent:sensor
						};

						$uibModalInstance.close(results);
					};
				},
				size: size,
				resolve: {
					sensor: function () {
						return selectedSensor;
					}
				}
			});


			uibModalInstance.result.then(function (results) {


				results.parent.sensoralerts.push(results.result);
				$scope.updateDeviceAndStay();
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});

		};

		$scope.openCreateSensorAlarmAction = function (size, selectedAlert) {


			var uibModalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralarmactions/views/create-devicesensoralarmaction.client.view.html',//'myModalContent.html',
				controller: function ($uibModalInstance, $scope, alert) {


					$scope.cancel = function(){$uibModalInstance.dismiss('cancel');};
					$scope.ok = function(){
						var newSensorAlarmAction = new Devicesensoralarmactions({
							name: this.name
						});

						var results = {
							result:newSensorAlarmAction,
							parent:alert
						};
						$uibModalInstance.close(results);
					};
				},
				size: size,
				resolve: {
					alert: function () {
						return selectedAlert;
					}
				}
			});


			 uibModalInstance.result.then(function (results) {


			 results.parent.alertactions.push(results.result);
				 $scope.updateDeviceAndStay();
			 }, function () {
			 $log.info('Modal dismissed at: ' + new Date());
			 });

		};

		/*
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
*/
		//update device on modal
		$scope.updateDevice = function () {
			var device = $scope.device;

			//console.log(' Device Details are ' + device.location.lon);

			$scope.device.$update(function () {

				console.log('Running this one');
				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
					);

				$location.path('mydevices/' + device._id);

			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.updateDeviceAndStay = function () {
			var device = $scope.device;

			//console.log(' Device Details are ' + device.location.lon);

			$scope.device.$update(function () {


				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);

				//$location.path('mydevices/' + device._id);

			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
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
				/*
				if($scope.device.sensors){
					$scope.currentSelectedSensor = $scope.device.sensors[0];
					$scope.showView('edit',$scope.currentSelectedSensor);
				}*/

				//$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		$scope.removeSensorAlert = function(sensor,alert){
			//console.log(alert);
			//console.log($scope.currentSelectedSensor.sensoralerts);
			$scope.device.sensors[$scope.device.sensors.indexOf(sensor)].sensoralerts.splice(
				$scope.device.sensors[$scope.device.sensors.indexOf(sensor)].sensoralerts.indexOf(alert),1);
			//$scope.currentSelectedSensor.sensoralerts.id(alert._id).remove();
			$scope.device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.removeSensorAlertAction = function(alert,action){
			//console.log(alert);
			//console.log($scope.currentSelectedSensor.sensoralerts);
			/*
			$scope.device.sensors[$scope.device.sensors.indexOf(sensor)].sensoralerts[$scope.device.sensors[$scope.device.sensors[$scope.device.sensors.indexOf(sensor)]].indexOf(alert)].alertactions.splice(
			$scope.device.sensors[$scope.device.sensors.indexOf(sensor)].sensoralerts[$scope.device.sensors.indexOf(alert)].alertactions.indexOf(action)
				,1);*/

			alert.alertactions.splice(alert.alertactions.indexOf(action),1);

			//$scope.currentSelectedSensor.sensoralerts.id(alert._id).remove();
			$scope.device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.removeUserFromAlertAction = function(action,user){
			//console.log(alert);
			//console.log($scope.currentSelectedSensor.sensoralerts);
			/*
			 $scope.device.sensors[$scope.device.sensors.indexOf(sensor)].sensoralerts[$scope.device.sensors[$scope.device.sensors[$scope.device.sensors.indexOf(sensor)]].indexOf(alert)].alertactions.splice(
			 $scope.device.sensors[$scope.device.sensors.indexOf(sensor)].sensoralerts[$scope.device.sensors.indexOf(alert)].alertactions.indexOf(action)
			 ,1);*/

			//alert.alertactions.splice(alert.alertactions.indexOf(action),1);
			action.userstonotify.splice(action.usertonotify.indexOf(user),1);
			//$scope.currentSelectedSensor.sensoralerts.id(alert._id).remove();
			$scope.device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		$scope.openSelectUsersToNotify = function (size, selectedAction) {


			var clientId = Authentication.user.client;

			var usersList = ClientsUsers.query({clientId1:clientId},function(){

				usersList.forEach(function(user){
					//otherList.push({user:user,select:false});
					user.select = false;
				});
			});



			$scope.users = usersList;


			var uibModalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/users/views/manage/list-users-forselect.client.view.html',//'myModalContent.html',
				controller: function ($uibModalInstance, $scope, action,users) {


					$scope.cancel = function(){$uibModalInstance.dismiss('cancel');};
					$scope.ok = function(users){
						/*var newSensorAlarmAction = new Devicesensoralarmactions({
							name: this.name
						});

						var results = {
							result:newSensorAlarmAction,
							parent:action
						}*/
						if(!action.userstonotify){
							action.userstonotify = [];
						}
						console.log($scope);
						users.forEach(function(userInList){

							if(userInList.select)
							{
								action.userstonotify.push(userInList._id);
							}
						});


						$uibModalInstance.close();
					};
				},
				size: size,
				resolve: {
					action: function () {
						return selectedAction;
					},
					users:function(){
						return $scope.users;
					}
				}
			});


			uibModalInstance.result.then(function () {
				$scope.updateDeviceAndStay();
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});

		};



		/*
		$scope.createsensor = function() {

			// Create new Devicesensor object

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
			});
		};*/
		/*
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

			//console.log('Alert Details'+newDeviceSensorAlert);
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
			//console.log(alert);
			//console.log($scope.currentSelectedSensor.sensoralerts);
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

			console.log('Am Here Success-toast');
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
		};*/
/*
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

		};*/

	}
]);
