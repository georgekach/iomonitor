'use strict';

// Softwareproductkeys controller
angular.module('softwareproductkeys').controller('SoftwareproductkeysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Softwareproductkeys',
	function($scope, $stateParams, $location, Authentication, Softwareproductkeys) {
		$scope.authentication = Authentication;

		// Create new Softwareproductkey
		$scope.create = function() {
			// Create new Softwareproductkey object
			var softwareproductkey = new Softwareproductkeys ({
				name: this.name
			});

			// Redirect after save
			softwareproductkey.$save(function(response) {
				$location.path('softwareproductkeys/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Softwareproductkey
		$scope.remove = function(softwareproductkey) {
			if ( softwareproductkey ) { 
				softwareproductkey.$remove();

				for (var i in $scope.softwareproductkeys) {
					if ($scope.softwareproductkeys [i] === softwareproductkey) {
						$scope.softwareproductkeys.splice(i, 1);
					}
				}
			} else {
				$scope.softwareproductkey.$remove(function() {
					$location.path('softwareproductkeys');
				});
			}
		};

		// Update existing Softwareproductkey
		$scope.update = function() {
			var softwareproductkey = $scope.softwareproductkey;

			softwareproductkey.$update(function() {
				$location.path('softwareproductkeys/' + softwareproductkey._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Softwareproductkeys
		$scope.find = function() {
			$scope.softwareproductkeys = Softwareproductkeys.query();
		};

		// Find existing Softwareproductkey
		$scope.findOne = function() {
			$scope.softwareproductkey = Softwareproductkeys.get({ 
				softwareproductkeyId: $stateParams.softwareproductkeyId
			});
		};
	}
]);