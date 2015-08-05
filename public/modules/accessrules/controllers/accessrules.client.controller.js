'use strict';

// Accessrules controller
angular.module('accessrules').controller('AccessrulesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Accessrules',
	function($scope, $stateParams, $location, Authentication, Accessrules) {
		$scope.authentication = Authentication;

		// Create new Accessrule
		$scope.create = function() {
			// Create new Accessrule object
			var accessrule = new Accessrules ({
				name: this.name
			});

			// Redirect after save
			accessrule.$save(function(response) {
				$location.path('accessrules/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Accessrule
		$scope.remove = function(accessrule) {
			if ( accessrule ) { 
				accessrule.$remove();

				for (var i in $scope.accessrules) {
					if ($scope.accessrules [i] === accessrule) {
						$scope.accessrules.splice(i, 1);
					}
				}
			} else {
				$scope.accessrule.$remove(function() {
					$location.path('accessrules');
				});
			}
		};

		// Update existing Accessrule
		$scope.update = function() {
			var accessrule = $scope.accessrule;

			accessrule.$update(function() {
				$location.path('accessrules/' + accessrule._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Accessrules
		$scope.find = function() {
			$scope.accessrules = Accessrules.query();
		};

		// Find existing Accessrule
		$scope.findOne = function() {
			$scope.accessrule = Accessrules.get({ 
				accessruleId: $stateParams.accessruleId
			});
		};
	}
]);