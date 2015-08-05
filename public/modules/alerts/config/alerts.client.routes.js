'use strict';

//Setting up route
angular.module('alerts').config(['$stateProvider',
	function($stateProvider) {
		// Alerts state routing
		$stateProvider.
		state('listAlerts', {
			url: '/alerts',
			templateUrl: 'modules/alerts/views/list-alerts.client.view.html'
		}).
		state('createAlert', {
			url: '/alerts/create',
			templateUrl: 'modules/alerts/views/create-alert.client.view.html'
		}).
		state('viewAlert', {
			url: '/alerts/:alertId',
			templateUrl: 'modules/alerts/views/view-alert.client.view.html'
		}).
		state('editAlert', {
			url: '/alerts/:alertId/edit',
			templateUrl: 'modules/alerts/views/edit-alert.client.view.html'
		});
	}
]);