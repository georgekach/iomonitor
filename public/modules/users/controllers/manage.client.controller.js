/**
 * Created by George on 8/3/2015.
 */
'use strict';
angular.module('users').controller('ManageUsersController', ['$scope', '$http', '$location','Users','$modal','Devicesensoralerts','Devicesensors',
    function($scope, $http, $location, Users,$modal,Devicesensoralerts,Devicesensors) {

        $scope.animationsEnabled = true;

        $scope.openCreate = function(){

            $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modules/users/views/manage/create-user.client.view.html',//'myModalContent.html',
                controller: function($modalInstance,$scope,user){
                    $scope.device = deviceOnEdit;

                    var resultP = Devicesensors.query();
                    var devId = $scope.device._id;
                    $scope.connectedSensors = resultP;

                    var resForDeviceSensorAlerts = Devicesensoralerts.query();
                    $scope.deviceSensorAlerts = resForDeviceSensorAlerts;

                    $scope.ok = function () {
                        $modalInstance.close(user);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                },
                windowClass: 'app-modal-window',
                size: size,
                resolve: {
                    user: function () {
                        return selectedDevice;
                    }
                }
            });
        };

    $scope.createUser = function(){




    };

    }
]);
