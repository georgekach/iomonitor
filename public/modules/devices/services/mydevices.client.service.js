'use strict';

//Devices service used to communicate Devices REST endpoints

angular.module('devices').factory('MyDevices', ['$resource',
	function($resource) {
		return $resource('mydevices/:deviceId', { deviceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
