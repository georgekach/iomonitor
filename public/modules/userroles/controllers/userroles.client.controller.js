'use strict';

// Userroles controller
angular.module('userroles').controller('UserrolesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Userroles',
	function($scope, $stateParams, $location, Authentication, Userroles) {
		$scope.authentication = Authentication;

		// Create new Userrole
		$scope.create = function() {
			// Create new Userrole object
			var userrole = new Userroles ({
				name: this.name
			});

			// Redirect after save
			userrole.$save(function(response) {
				$location.path('userroles/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Userrole
		$scope.remove = function(userrole) {
			if ( userrole ) { 
				userrole.$remove();

				for (var i in $scope.userroles) {
					if ($scope.userroles [i] === userrole) {
						$scope.userroles.splice(i, 1);
					}
				}
			} else {
				$scope.userrole.$remove(function() {
					$location.path('userroles');
				});
			}
		};

		// Update existing Userrole
		$scope.update = function() {
			var userrole = $scope.userrole;

			userrole.$update(function() {
				$location.path('userroles/' + userrole._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Userroles
		$scope.find = function() {
			$scope.userroles = Userroles.query();
		};

		// Find existing Userrole
		$scope.findOne = function() {
			$scope.userrole = Userroles.get({ 
				userroleId: $stateParams.userroleId
			});
		};
	}
]);