'use strict';

//Devicesensors service used to communicate Devicesensors REST endpoints
angular.module('devicesensors').factory('Devicesensors', ['$resource',
	function($resource) {
		return $resource('devicesensors/:devicesensorId', { devicesensorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);