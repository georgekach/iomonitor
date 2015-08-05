'use strict';

//Sensortypes service used to communicate Sensortypes REST endpoints
angular.module('sensortypes').factory('Sensortypes', ['$resource',
	function($resource) {
		return $resource('sensortypes/:sensortypeId', { sensortypeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);