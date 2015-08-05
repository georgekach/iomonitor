'use strict';

//Devicesensoralerts service used to communicate Devicesensoralerts REST endpoints
angular.module('devicesensoralerts').factory('Devicesensoralerts', ['$resource',
	function($resource) {
		return $resource('devicesensoralerts/:devicesensoralertId', { devicesensoralertId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);