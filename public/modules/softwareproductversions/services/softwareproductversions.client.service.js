'use strict';

//Softwareproductversions service used to communicate Softwareproductversions REST endpoints
angular.module('softwareproductversions').factory('Softwareproductversions', ['$resource',
	function($resource) {
		return $resource('softwareproductversions/:softwareproductversionId', { softwareproductversionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);