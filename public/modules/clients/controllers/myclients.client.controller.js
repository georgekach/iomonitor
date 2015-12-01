'use strict';

// Clients controller
angular.module('clients').controller('MyClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'MyClients','$mdToast', '$animate','$mdDialog','Devices','$uibModal','$log','ClientsUsers','Clients',
	function($scope, $stateParams, $location, Authentication, MyClients,$mdToast, $animate,$mdDialog,Devices,$uibModal,$log,ClientsUsers,Clients) {
		$scope.authentication = Authentication;
        $scope.section = 'Clients';
        $scope.clientsDevices = '';
        $scope.clientsUsers = '';

        //Toastr Settings
        $scope.toastPosition = {
            bottom: true,
            top: false,
            left: true,
            right: false
        };

        // Modal

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var uibModalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modules/clients/views/edit-client.client.view.html',//'myModalContent.html',
                controller: 'MyClientsController',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };



            //EndModal


        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };
		// Create new Client
		$scope.create = function() {
			// Create new Client object
			var client = new Clients ({
				name: this.name
			});

			// Redirect after save
			client.$save(function(response) {
				$location.path('clients/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Client
		$scope.remove = function(client) {
			if ( client ) { 
				client.$remove();

				for (var i in $scope.clients) {
					if ($scope.clients [i] === client) {
						$scope.clients.splice(i, 1);
					}
				}
			} else {
				$scope.client.$remove(function() {
					$location.path('clients');
				});
			}
		};

		// Update existing Client
		$scope.update = function() {
			var client = $scope.client;

			client.$update(function() {
				$location.path('clients/' + client._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
                $mdToast.show(
                    $mdToast.simple()
                        .content('Updated Record Successfully')
                        .position($scope.getToastPosition())
                        .hideDelay(3000)
                );
                $log.info($scope.error);
			});
		};

		// Find a list of Clients
		$scope.find = function() {
			$scope.clients = MyClients.query();
		};

		// Find existing Client
		$scope.findOne = function() {
			$scope.client = MyClients.get({
				clientId: $stateParams.clientId
			});

            //$scope.clientsDevices = Devices.query();
            $scope.clientsUsers = ClientsUsers.query({clientId1:$stateParams.clientId});

		};
		



	}
]);
