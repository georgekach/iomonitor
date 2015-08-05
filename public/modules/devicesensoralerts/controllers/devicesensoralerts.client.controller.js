'use strict';

// Devicesensoralerts controller
angular.module('devicesensoralerts').controller('DevicesensoralertsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Devicesensoralerts',
	function($scope, $stateParams, $location, Authentication, Devicesensoralerts) {
		$scope.authentication = Authentication;

		// Create new Devicesensoralert
		$scope.create = function() {
			// Create new Devicesensoralert object
			var devicesensoralert = new Devicesensoralerts ({
				name: this.name
			});

			// Redirect after save
			devicesensoralert.$save(function(response) {
				$location.path('devicesensoralerts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Devicesensoralert
		$scope.remove = function(devicesensoralert) {
			if ( devicesensoralert ) { 
				devicesensoralert.$remove();

				for (var i in $scope.devicesensoralerts) {
					if ($scope.devicesensoralerts [i] === devicesensoralert) {
						$scope.devicesensoralerts.splice(i, 1);
					}
				}
			} else {
				$scope.devicesensoralert.$remove(function() {
					$location.path('devicesensoralerts');
				});
			}
		};

		// Update existing Devicesensoralert
		$scope.update = function() {
			var devicesensoralert = $scope.devicesensoralert;

			devicesensoralert.$update(function() {
				$location.path('devicesensoralerts/' + devicesensoralert._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		this.updateAlert = function(alert) {
			var devicesensoralert = alert;

			devicesensoralert.$update(function() {


			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Devicesensoralerts
		$scope.find = function() {
			$scope.devicesensoralerts = Devicesensoralerts.query();
		};

		// Find existing Devicesensoralert
		$scope.findOne = function() {
			$scope.devicesensoralert = Devicesensoralerts.get({ 
				devicesensoralertId: $stateParams.devicesensoralertId
			});
		};
	}
]);
