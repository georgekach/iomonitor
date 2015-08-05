'use strict';

//Setting up route
angular.module('devicesensors').config(['$stateProvider',
	function($stateProvider) {
		// Devicesensors state routing
		$stateProvider.
		state('listDevicesensors', {
			url: '/devicesensors',
			templateUrl: 'modules/devicesensors/views/list-devicesensors.client.view.html'
		}).
		state('createDevicesensor', {
			url: '/devicesensors/create',
			templateUrl: 'modules/devicesensors/views/create-devicesensor.client.view.html'
		}).
		state('viewDevicesensor', {
			url: '/devicesensors/:devicesensorId',
			templateUrl: 'modules/devicesensors/views/view-devicesensor.client.view.html'
		}).
		state('editDevicesensor', {
			url: '/devicesensors/:devicesensorId/edit',
			templateUrl: 'modules/devicesensors/views/edit-devicesensor.client.view.html'
		});
	}
]);