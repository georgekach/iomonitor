'use strict';

//Setting up route
angular.module('guards').config(['$stateProvider',
	function($stateProvider) {
		// Guards state routing
		$stateProvider.
		state('listGuards', {
			url: '/guards',
			templateUrl: 'modules/guards/views/list-guards.client.view.html'
		}).
		state('createGuard', {
			url: '/guards/create',
			templateUrl: 'modules/guards/views/create-guard.client.view.html'
		}).
		state('viewGuard', {
			url: '/guards/:guardId',
			templateUrl: 'modules/guards/views/view-guard.client.view.html'
		}).
		state('editGuard', {
			url: '/guards/:guardId/edit',
			templateUrl: 'modules/guards/views/edit-guard.client.view.html'
		});
	}
]);