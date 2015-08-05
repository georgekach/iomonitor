'use strict';

//Setting up route
angular.module('accessrules').config(['$stateProvider',
	function($stateProvider) {
		// Accessrules state routing
		$stateProvider.
		state('listAccessrules', {
			url: '/accessrules',
			templateUrl: 'modules/accessrules/views/list-accessrules.client.view.html'
		}).
		state('createAccessrule', {
			url: '/accessrules/create',
			templateUrl: 'modules/accessrules/views/create-accessrule.client.view.html'
		}).
		state('viewAccessrule', {
			url: '/accessrules/:accessruleId',
			templateUrl: 'modules/accessrules/views/view-accessrule.client.view.html'
		}).
		state('editAccessrule', {
			url: '/accessrules/:accessruleId/edit',
			templateUrl: 'modules/accessrules/views/edit-accessrule.client.view.html'
		});
	}
]);