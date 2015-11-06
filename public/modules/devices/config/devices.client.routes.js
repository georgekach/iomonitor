'use strict';

//Setting up route
angular.module('devices').config(['$stateProvider',
	function($stateProvider) {
		// Devices state routing
		$stateProvider.
		state('listDevices', {
			url: '/devices',
			templateUrl: 'modules/devices/views/list-devices.client.view.html'
		}).
		state('createDevice', {
			url: '/devices/create',
			templateUrl: 'modules/devices/views/create-device.client.view.html'
		}).
		state('viewDevice', {
			url: '/devices/:deviceId',
			templateUrl: 'modules/devices/views/view-device.client.view.html'
		}).
		state('editDevice', {
			url: '/devices/:deviceId/edit',
			templateUrl: 'modules/devices/views/edit-device.client.view.html'
		}).
			state('listMyDevices', {
				url: '/mydevices',
				templateUrl: 'modules/devices/views/list-mydevices.client.view.html'
			})./*
			state('createMyDevice', {
				url: '/mydevices/create',
				templateUrl: 'modules/devices/views/create-mydevice.client.view.html'
			}).
			state('viewMyDevice', {
				url: '/mydevices/:deviceId',
				templateUrl: 'modules/devices/views/view-mydevice.client.view.html'
			}).*/
			state('editMyDevice', {
				url: '/mydevices/:deviceId/edit',
				templateUrl: 'modules/devices/views/edit-mydevice.client.view.html'
			});
	}
]);
