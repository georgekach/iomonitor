'use strict';

//Devicesensoralarmactions service used to communicate Devicesensoralarmactions REST endpoints
angular.module('devicesensoralarmactions').factory('Devicesensoralarmactions', ['$resource',
	function($resource) {
		return $resource('devicesensoralarmactions/:devicesensoralarmactionId', { devicesensoralarmactionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);