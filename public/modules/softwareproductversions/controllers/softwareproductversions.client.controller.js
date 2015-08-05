'use strict';

// Softwareproductversions controller
angular.module('softwareproductversions').controller('SoftwareproductversionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Softwareproductversions',
	function($scope, $stateParams, $location, Authentication, Softwareproductversions) {
		$scope.authentication = Authentication;

		// Create new Softwareproductversion
		$scope.create = function() {
			// Create new Softwareproductversion object
			var softwareproductversion = new Softwareproductversions ({
				name: this.name
			});

			// Redirect after save
			softwareproductversion.$save(function(response) {
				$location.path('softwareproductversions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Softwareproductversion
		$scope.remove = function(softwareproductversion) {
			if ( softwareproductversion ) { 
				softwareproductversion.$remove();

				for (var i in $scope.softwareproductversions) {
					if ($scope.softwareproductversions [i] === softwareproductversion) {
						$scope.softwareproductversions.splice(i, 1);
					}
				}
			} else {
				$scope.softwareproductversion.$remove(function() {
					$location.path('softwareproductversions');
				});
			}
		};

		// Update existing Softwareproductversion
		$scope.update = function() {
			var softwareproductversion = $scope.softwareproductversion;

			softwareproductversion.$update(function() {
				$location.path('softwareproductversions/' + softwareproductversion._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Softwareproductversions
		$scope.find = function() {
			$scope.softwareproductversions = Softwareproductversions.query();
		};

		// Find existing Softwareproductversion
		$scope.findOne = function() {
			$scope.softwareproductversion = Softwareproductversions.get({ 
				softwareproductversionId: $stateParams.softwareproductversionId
			});
		};
	}
]);