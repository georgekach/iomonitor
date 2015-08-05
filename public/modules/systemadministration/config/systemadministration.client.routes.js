'use strict';

//Setting up route
angular.module('systemadministration').config(['$stateProvider',
	function($stateProvider) {
		// Systemadministration state routing
		$stateProvider.
		state('systemadministration', {
			url: '/systemadministration',
			templateUrl: 'modules/systemadministration/views/systemadministration.client.view.html'
		});
	}
]);