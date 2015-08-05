'use strict';

//Setting up route
angular.module('softwareproductkeys').config(['$stateProvider',
	function($stateProvider) {
		// Softwareproductkeys state routing
		$stateProvider.
		state('listSoftwareproductkeys', {
			url: '/softwareproductkeys',
			templateUrl: 'modules/softwareproductkeys/views/list-softwareproductkeys.client.view.html'
		}).
		state('createSoftwareproductkey', {
			url: '/softwareproductkeys/create',
			templateUrl: 'modules/softwareproductkeys/views/create-softwareproductkey.client.view.html'
		}).
		state('viewSoftwareproductkey', {
			url: '/softwareproductkeys/:softwareproductkeyId',
			templateUrl: 'modules/softwareproductkeys/views/view-softwareproductkey.client.view.html'
		}).
		state('editSoftwareproductkey', {
			url: '/softwareproductkeys/:softwareproductkeyId/edit',
			templateUrl: 'modules/softwareproductkeys/views/edit-softwareproductkey.client.view.html'
		});
	}
]);