'use strict';

//Setting up route
angular.module('devicesensoralarmactions').config(['$stateProvider',
	function($stateProvider) {
		// Devicesensoralarmactions state routing
		$stateProvider.
		state('listDevicesensoralarmactions', {
			url: '/devicesensoralarmactions',
			templateUrl: 'modules/devicesensoralarmactions/views/list-devicesensoralarmactions.client.view.html'
		}).
		state('createDevicesensoralarmaction', {
			url: '/devicesensoralarmactions/create',
			templateUrl: 'modules/devicesensoralarmactions/views/create-devicesensoralarmaction.client.view.html'
		}).
		state('viewDevicesensoralarmaction', {
			url: '/devicesensoralarmactions/:devicesensoralarmactionId',
			templateUrl: 'modules/devicesensoralarmactions/views/view-devicesensoralarmaction.client.view.html'
		}).
		state('editDevicesensoralarmaction', {
			url: '/devicesensoralarmactions/:devicesensoralarmactionId/edit',
			templateUrl: 'modules/devicesensoralarmactions/views/edit-devicesensoralarmaction.client.view.html'
		});
	}
]);