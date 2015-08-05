'use strict';

// Sensortypes controller
angular.module('sensortypes').controller('SensortypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sensortypes',
	function($scope, $stateParams, $location, Authentication, Sensortypes) {
		$scope.authentication = Authentication;

		// Create new Sensortype
		$scope.create = function() {
			// Create new Sensortype object
			var sensortype = new Sensortypes ({
				name: this.name
			});

			// Redirect after save
			sensortype.$save(function(response) {
				$location.path('sensortypes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Sensortype
		$scope.remove = function(sensortype) {
			if ( sensortype ) { 
				sensortype.$remove();

				for (var i in $scope.sensortypes) {
					if ($scope.sensortypes [i] === sensortype) {
						$scope.sensortypes.splice(i, 1);
					}
				}
			} else {
				$scope.sensortype.$remove(function() {
					$location.path('sensortypes');
				});
			}
		};

		// Update existing Sensortype
		$scope.update = function() {
			var sensortype = $scope.sensortype;

			sensortype.$update(function() {
				$location.path('sensortypes/' + sensortype._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Sensortypes
		$scope.find = function() {
			$scope.sensortypes = Sensortypes.query();
		};

		// Find existing Sensortype
		$scope.findOne = function() {
			$scope.sensortype = Sensortypes.get({ 
				sensortypeId: $stateParams.sensortypeId
			});
		};
	}
]);