'use strict';

//Alerts service used to communicate Alerts REST endpoints
angular.module('alerts').factory('Alerts', ['$resource',
	function($resource) {
		return $resource('alerts/:alertId', { alertId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);