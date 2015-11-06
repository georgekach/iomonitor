'use strict';

//Clients service used to communicate Clients REST endpoints
angular.module('clients').factory('MyClients', ['$resource',
	function($resource) {
		return $resource('myclients/:clientId', { clientId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
