'use strict';

// Devicesensors controller
angular.module('devicesensors').controller('DevicesensorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Devicesensors',
	function($scope, $stateParams, $location, Authentication, Devicesensors) {
		$scope.authentication = Authentication;

		// Create new Devicesensor
		$scope.create = function() {
			// Create new Devicesensor object
			var devicesensor = new Devicesensors ({
				name: this.name
			});

			// Redirect after save
			devicesensor.$save(function(response) {
				$location.path('devicesensors/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Devicesensor
		$scope.remove = function(devicesensor) {
			if ( devicesensor ) { 
				devicesensor.$remove();

				for (var i in $scope.devicesensors) {
					if ($scope.devicesensors [i] === devicesensor) {
						$scope.devicesensors.splice(i, 1);
					}
				}
			} else {
				$scope.devicesensor.$remove(function() {
					$location.path('devicesensors');
				});
			}
		};

		// Update existing Devicesensor
		$scope.update = function() {
			var devicesensor = $scope.devicesensor;

			devicesensor.$update(function() {
				$location.path('devicesensors/' + devicesensor._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Devicesensors
		$scope.find = function() {
			$scope.devicesensors = Devicesensors.query();
		};

		// Find existing Devicesensor
		$scope.findOne = function() {
			$scope.devicesensor = Devicesensors.get({ 
				devicesensorId: $stateParams.devicesensorId
			});
		};
	}
]);