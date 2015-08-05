'use strict';

//Setting up route
angular.module('sensortypes').config(['$stateProvider',
	function($stateProvider) {
		// Sensortypes state routing
		$stateProvider.
		state('listSensortypes', {
			url: '/sensortypes',
			templateUrl: 'modules/sensortypes/views/list-sensortypes.client.view.html'
		}).
		state('createSensortype', {
			url: '/sensortypes/create',
			templateUrl: 'modules/sensortypes/views/create-sensortype.client.view.html'
		}).
		state('viewSensortype', {
			url: '/sensortypes/:sensortypeId',
			templateUrl: 'modules/sensortypes/views/view-sensortype.client.view.html'
		}).
		state('editSensortype', {
			url: '/sensortypes/:sensortypeId/edit',
			templateUrl: 'modules/sensortypes/views/edit-sensortype.client.view.html'
		});
	}
]);