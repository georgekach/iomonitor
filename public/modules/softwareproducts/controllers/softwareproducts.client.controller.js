'use strict';

// Softwareproducts controller
angular.module('softwareproducts').controller('SoftwareproductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Softwareproducts',
	function($scope, $stateParams, $location, Authentication, Softwareproducts) {
		$scope.authentication = Authentication;

		// Create new Softwareproduct
		$scope.create = function() {
			// Create new Softwareproduct object
			var softwareproduct = new Softwareproducts ({
				name: this.name,
				description : this.description
			});

			// Redirect after save
			softwareproduct.$save(function(response) {
				$location.path('softwareproducts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Softwareproduct
		$scope.remove = function(softwareproduct) {
			if ( softwareproduct ) { 
				softwareproduct.$remove();

				for (var i in $scope.softwareproducts) {
					if ($scope.softwareproducts [i] === softwareproduct) {
						$scope.softwareproducts.splice(i, 1);
					}
				}
			} else {
				$scope.softwareproduct.$remove(function() {
					$location.path('softwareproducts');
				});
			}
		};

		// Update existing Softwareproduct
		$scope.update = function() {
			var softwareproduct = $scope.softwareproduct;

			softwareproduct.$update(function() {
				$location.path('softwareproducts/' + softwareproduct._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Softwareproducts
		$scope.find = function() {
			$scope.softwareproducts = Softwareproducts.query();
		};

		// Find existing Softwareproduct
		$scope.findOne = function() {
			$scope.softwareproduct = Softwareproducts.get({ 
				softwareproductId: $stateParams.softwareproductId
			});
		};
	}
]);
