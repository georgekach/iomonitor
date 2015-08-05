'use strict';

//Setting up route
angular.module('useradministration').config(['$stateProvider',
	function($stateProvider) {
		// Useradministration state routing
		$stateProvider.
		state('useradministration', {
			url: '/useradministration',
			templateUrl: 'modules/useradministration/views/useradministration.client.view.html'
		});
	}
]);