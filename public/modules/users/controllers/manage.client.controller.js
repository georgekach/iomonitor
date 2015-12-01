/**
 * Created by George on 8/3/2015.
 */
'use strict';
angular.module('users').controller('ManageUsersController', ['$scope', '$http', '$location','Users','$uibModal','Devicesensoralerts','Devicesensors','Authentication','ClientsUsers',
    function($scope, $http, $location, Users,$uibModal,Devicesensoralerts,Devicesensors,Authentication,ClientsUsers) {

        $scope.animationsEnabled = true;

        $scope.openCreate = function(){

        var uibModalInstance =    $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modules/users/views/manage/create-user.client.view.html',//'myModalContent.html',
                controller: function($uibModalInstance,$scope,user){
                    /*$scope.device = deviceOnEdit;

                    var resultP = Devicesensors.query();
                    var devId = $scope.device._id;
                    $scope.connectedSensors = resultP;

                    var resForDeviceSensorAlerts = Devicesensoralerts.query();
                    $scope.deviceSensorAlerts = resForDeviceSensorAlerts;*/

                    $scope.ok = function () {
                        $uibModalInstance.close(user);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                },
                windowClass: 'app-modal-window',
                size: 'lg',//size
                resolve: {
                    user: function () {
                        return ''; //selectedDevice;
                    }
                }
            });
        };

    $scope.createUser = function(){




    };


        // Find a list of Devices
        $scope.find = function () {
            $scope.users = Users.query();
        };

        $scope.findAllForClient = function () {
            var clientId = Authentication.user.client;

            var usersList = ClientsUsers.query({clientId1:clientId},function(){

                usersList.forEach(function(user){
                    //otherList.push({user:user,select:false});
                    user.select = false;
                });
            });



            $scope.users = usersList;
        };

    }
]);
