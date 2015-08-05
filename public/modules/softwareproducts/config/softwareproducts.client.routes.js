'use strict';

//Setting up route
angular.module('softwareproducts').config(['$stateProvider',
	function($stateProvider) {
		// Softwareproducts state routing
		$stateProvider.
		state('listSoftwareproducts', {
			url: '/softwareproducts',
			templateUrl: 'modules/softwareproducts/views/list-softwareproducts.client.view.html'
		}).
		state('createSoftwareproduct', {
			url: '/softwareproducts/create',
			templateUrl: 'modules/softwareproducts/views/create-softwareproduct.client.view.html'
		}).
		state('viewSoftwareproduct', {
			url: '/softwareproducts/:softwareproductId',
			templateUrl: 'modules/softwareproducts/views/view-softwareproduct.client.view.html'
		}).
		state('editSoftwareproduct', {
			url: '/softwareproducts/:softwareproductId/edit',
			templateUrl: 'modules/softwareproducts/views/edit-softwareproduct.client.view.html'
		});
	}
]);