'use strict';

//Setting up route
angular.module('clients').config(['$stateProvider',
	function($stateProvider) {
		// Clients state routing
		$stateProvider.
		state('listClients', {
			url: '/clients',
			templateUrl: 'modules/clients/views/list-clients.client.view.html',
				data:{
					displayName:'Clients'
				}
		}).
			state('listMyClients', {
				url: '/myclients',
				templateUrl: 'modules/clients/views/list-myclients.client.view.html',
				data:{
					displayName:'My Clients'
				}
			}).
		state('createClient', {
			url: '/clients/create',
			templateUrl: 'modules/clients/views/create-client.client.view.html'
		}).
		state('viewClient', {
			url: '/clients/:clientId',
			templateUrl: 'modules/clients/views/view-client.client.view.html'
		}).
		state('editClient', {
			url: '/clients/:clientId/edit',
			templateUrl: 'modules/clients/views/edit-client.client.view.html'
		}).
			state('editMyClient', {
				url: '/myclients/:clientId/edit',
				templateUrl: 'modules/clients/views/edit-myclient.client.view.html'
			});
	}
]);
