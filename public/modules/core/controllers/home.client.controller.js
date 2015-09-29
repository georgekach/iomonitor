'use strict';

var coremodule = angular.module('core');

coremodule.controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


	}
]);

