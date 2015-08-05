'use strict';

//Softwareproductkeys service used to communicate Softwareproductkeys REST endpoints
angular.module('softwareproductkeys').factory('Softwareproductkeys', ['$resource',
	function($resource) {
		return $resource('softwareproductkeys/:softwareproductkeyId', { softwareproductkeyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);