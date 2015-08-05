'use strict';

//Setting up route
angular.module('devicesensoralerts').config(['$stateProvider',
	function($stateProvider) {
		// Devicesensoralerts state routing
		$stateProvider.
		state('listDevicesensoralerts', {
			url: '/devicesensoralerts',
			templateUrl: 'modules/devicesensoralerts/views/list-devicesensoralerts.client.view.html'
		}).
		state('createDevicesensoralert', {
			url: '/devicesensoralerts/create',
			templateUrl: 'modules/devicesensoralerts/views/create-devicesensoralert.client.view.html'
		}).
		state('viewDevicesensoralert', {
			url: '/devicesensoralerts/:devicesensoralertId',
			templateUrl: 'modules/devicesensoralerts/views/view-devicesensoralert.client.view.html'
		}).
		state('editDevicesensoralert', {
			url: '/devicesensoralerts/:devicesensoralertId/edit',
			templateUrl: 'modules/devicesensoralerts/views/edit-devicesensoralert.client.view.html'
		});
	}
]);