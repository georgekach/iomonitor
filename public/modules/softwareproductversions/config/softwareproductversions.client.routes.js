'use strict';

//Setting up route
angular.module('softwareproductversions').config(['$stateProvider',
	function($stateProvider) {
		// Softwareproductversions state routing
		$stateProvider.
		state('listSoftwareproductversions', {
			url: '/softwareproductversions',
			templateUrl: 'modules/softwareproductversions/views/list-softwareproductversions.client.view.html'
		}).
		state('createSoftwareproductversion', {
			url: '/softwareproductversions/create',
			templateUrl: 'modules/softwareproductversions/views/create-softwareproductversion.client.view.html'
		}).
		state('viewSoftwareproductversion', {
			url: '/softwareproductversions/:softwareproductversionId',
			templateUrl: 'modules/softwareproductversions/views/view-softwareproductversion.client.view.html'
		}).
		state('editSoftwareproductversion', {
			url: '/softwareproductversions/:softwareproductversionId/edit',
			templateUrl: 'modules/softwareproductversions/views/edit-softwareproductversion.client.view.html'
		});
	}
]);