'use strict';

var coremodule = angular.module('core');

coremodule.controller('HomeController', ['$scope', 'Authentication','$document',
	function($scope, Authentication,$document) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		angular.element(document.querySelector( '.navbar-nav' )).addClass('green-fg');

	}
]);

