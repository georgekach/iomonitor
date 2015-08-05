'use strict';

// Devicesensoralarmactions controller
angular.module('devicesensoralarmactions').controller('DevicesensoralarmactionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Devicesensoralarmactions',
	function($scope, $stateParams, $location, Authentication, Devicesensoralarmactions) {
		$scope.authentication = Authentication;

		// Create new Devicesensoralarmaction
		$scope.create = function() {
			// Create new Devicesensoralarmaction object
			var devicesensoralarmaction = new Devicesensoralarmactions ({
				name: this.name
			});

			// Redirect after save
			devicesensoralarmaction.$save(function(response) {
				$location.path('devicesensoralarmactions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Devicesensoralarmaction
		$scope.remove = function(devicesensoralarmaction) {
			if ( devicesensoralarmaction ) { 
				devicesensoralarmaction.$remove();

				for (var i in $scope.devicesensoralarmactions) {
					if ($scope.devicesensoralarmactions [i] === devicesensoralarmaction) {
						$scope.devicesensoralarmactions.splice(i, 1);
					}
				}
			} else {
				$scope.devicesensoralarmaction.$remove(function() {
					$location.path('devicesensoralarmactions');
				});
			}
		};

		// Update existing Devicesensoralarmaction
		$scope.update = function() {
			var devicesensoralarmaction = $scope.devicesensoralarmaction;

			devicesensoralarmaction.$update(function() {
				$location.path('devicesensoralarmactions/' + devicesensoralarmaction._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Devicesensoralarmactions
		$scope.find = function() {
			$scope.devicesensoralarmactions = Devicesensoralarmactions.query();
		};

		// Find existing Devicesensoralarmaction
		$scope.findOne = function() {
			$scope.devicesensoralarmaction = Devicesensoralarmactions.get({ 
				devicesensoralarmactionId: $stateParams.devicesensoralarmactionId
			});
		};
	}
]);