'use strict';

//Setting up route
angular.module('userroles').config(['$stateProvider',
	function($stateProvider) {
		// Userroles state routing
		$stateProvider.
		state('listUserroles', {
			url: '/userroles',
			templateUrl: 'modules/userroles/views/list-userroles.client.view.html'
		}).
		state('createUserrole', {
			url: '/userroles/create',
			templateUrl: 'modules/userroles/views/create-userrole.client.view.html'
		}).
		state('viewUserrole', {
			url: '/userroles/:userroleId',
			templateUrl: 'modules/userroles/views/view-userrole.client.view.html'
		}).
		state('editUserrole', {
			url: '/userroles/:userroleId/edit',
			templateUrl: 'modules/userroles/views/edit-userrole.client.view.html'
		});
	}
]);