'use strict';

// Guards controller
angular.module('guards').controller('GuardsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Guards',
	function($scope, $stateParams, $location, Authentication, Guards) {
		$scope.authentication = Authentication;

		// Create new Guard
		$scope.create = function() {
			// Create new Guard object
			var guard = new Guards ({
				name: this.name
			});

			// Redirect after save
			guard.$save(function(response) {
				$location.path('guards/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Guard
		$scope.remove = function(guard) {
			if ( guard ) { 
				guard.$remove();

				for (var i in $scope.guards) {
					if ($scope.guards [i] === guard) {
						$scope.guards.splice(i, 1);
					}
				}
			} else {
				$scope.guard.$remove(function() {
					$location.path('guards');
				});
			}
		};

		// Update existing Guard
		$scope.update = function() {
			var guard = $scope.guard;

			guard.$update(function() {
				$location.path('guards/' + guard._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Guards
		$scope.find = function() {
			$scope.guards = Guards.query();
		};

		// Find existing Guard
		$scope.findOne = function() {
			$scope.guard = Guards.get({ 
				guardId: $stateParams.guardId
			});
		};
	}
]);