'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','$mdSidenav','$mdUtil','$log','$location','MyAlerts','UnresolvedAlerts',
	function($scope, Authentication, Menus,$mdSidenav,$mdUtil,$log,$location,MyAlerts,UnresolvedAlerts) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
        $scope.showOverlay = true;
		$scope.menu = Menus.getMenu('topbar');
		//$scope.menu = Menus.getMenu('footbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        var result = document.getElementById('side-menu');
        //alert(result);


        //var sidemenu = angular.element(result);
        //sidemenu.metisMenu();
        $('#side-menu').metisMenu();
        //(angular.element( document.querySelector( '#side-menu'))).metisMenu();

        $scope.myAlerts = '';


        $scope.myAlerts = MyAlerts.query({
            userId: Authentication.user._id
        });

        $scope.unresovedSystemAlerts = UnresolvedAlerts.query({
            alerttype:'system'
        });
        $scope.unresovedLicenceAlerts = UnresolvedAlerts.query({
            alerttype:'license'
        });

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         * */ /*
        function buildToggler(navID) {

            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug('toggle ' + navID + ' is done');
                    });
            },300);
            return debounceFn;
        }

        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug('close LEFT is done');
                });
        };
        $scope.closeRight = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug('close RIGHT is done');
                });
        };*/
	}
]);
