'use strict';

//Guards service used to communicate Guards REST endpoints
angular.module('guards').factory('Guards', ['$resource',
	function($resource) {
		return $resource('guards/:guardId', { guardId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);