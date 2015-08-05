'use strict';

//Softwareproducts service used to communicate Softwareproducts REST endpoints
angular.module('softwareproducts').factory('Softwareproducts', ['$resource',
	function($resource) {
		return $resource('softwareproducts/:softwareproductId', { softwareproductId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);