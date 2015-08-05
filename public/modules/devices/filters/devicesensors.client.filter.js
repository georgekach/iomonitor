'use strict';

angular.module('devices').filter('devicesensorsfilter', [
	function() {
		return function(input) {
			// Clientsfilter directive logic
			// ...

			return input.deviceId.match(/^Ma/) ? true : false;
		};
	}
]);
