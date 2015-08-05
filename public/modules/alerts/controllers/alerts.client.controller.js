'use strict';

// Alerts controller
angular.module('alerts').controller('AlertsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Alerts',
	function($scope, $stateParams, $location, Authentication, Alerts) {
		$scope.authentication = Authentication;

		// Create new Alert
		$scope.create = function() {
			// Create new Alert object
			var alert = new Alerts ({
				name: this.name
			});

			// Redirect after save
			alert.$save(function(response) {
				$location.path('alerts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Alert
		$scope.remove = function(alert) {
			if ( alert ) { 
				alert.$remove();

				for (var i in $scope.alerts) {
					if ($scope.alerts [i] === alert) {
						$scope.alerts.splice(i, 1);
					}
				}
			} else {
				$scope.alert.$remove(function() {
					$location.path('alerts');
				});
			}
		};

		// Update existing Alert
		$scope.update = function() {
			var alert = $scope.alert;

			alert.$update(function() {
				$location.path('alerts/' + alert._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Alerts
		$scope.find = function() {
			$scope.alerts = Alerts.query();
		};

		// Find existing Alert
		$scope.findOne = function() {
			$scope.alert = Alerts.get({ 
				alertId: $stateParams.alertId
			});
		};
	}
]);