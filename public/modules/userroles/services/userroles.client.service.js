'use strict';

//Userroles service used to communicate Userroles REST endpoints
angular.module('userroles').factory('Userroles', ['$resource',
	function($resource) {
		return $resource('userroles/:userroleId', { userroleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);