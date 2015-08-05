'use strict';

//Accessrules service used to communicate Accessrules REST endpoints
angular.module('accessrules').factory('Accessrules', ['$resource',
	function($resource) {
		return $resource('accessrules/:accessruleId', { accessruleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);