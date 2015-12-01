'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'meantest';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils','ngMaterial','highcharts-ng','btford.socket-io','ngJustGage','openlayers-directive','angularChart','duScroll','shoppinpal.mobile-menu'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$mdThemingProvider', '$mdIconProvider',
	function($locationProvider,$mdThemingProvider,$mdIconProvider) {
		$locationProvider.hashPrefix('!');
		
		$mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red')
            ;
 
        // Register the user `avatar` icons
        $mdIconProvider
            .defaultIconSet('./assets/svg/avatars.svg', 128)
            .icon('menu'       , './modules/core/img/icons/ic_menu_48px.svg'        , 48)
            .icon('temp'       , './modules/core/img/icons/temperature_icon_48px.svg'        , 48)
            .icon('share'      , './assets/svg/share.svg'       , 24)
            .icon('google_plus', './assets/svg/google_plus.svg' , 512)
            .icon('hangouts'   , './assets/svg/hangouts.svg'    , 512)
            .icon('twitter'    , './assets/svg/twitter.svg'     , 512)
            .icon('phone'      , './assets/svg/phone.svg'       , 512);
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('accessrules');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('alerts');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('clients');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('dashboard');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('devices');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('devicesensoralarmactions');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('devicesensoralerts');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('devicesensors');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('notifications');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('readings');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('sensortypes');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('softwareproductkeys');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('softwareproducts');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('softwareproductversions');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('systemadministration');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('useradministration');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('userroles');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('vendors');
'use strict';

// Configuring the Articles module
angular.module('accessrules').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Accessrules', 'accessrules', 'dropdown', '/accessrules(/create)?');
		Menus.addSubMenuItem('topbar', 'accessrules', 'List Accessrules', 'accessrules');
		Menus.addSubMenuItem('topbar', 'accessrules', 'New Accessrule', 'accessrules/create');
	}
]);
'use strict';

//Setting up route
angular.module('accessrules').config(['$stateProvider',
	function($stateProvider) {
		// Accessrules state routing
		$stateProvider.
		state('listAccessrules', {
			url: '/accessrules',
			templateUrl: 'modules/accessrules/views/list-accessrules.client.view.html'
		}).
		state('createAccessrule', {
			url: '/accessrules/create',
			templateUrl: 'modules/accessrules/views/create-accessrule.client.view.html'
		}).
		state('viewAccessrule', {
			url: '/accessrules/:accessruleId',
			templateUrl: 'modules/accessrules/views/view-accessrule.client.view.html'
		}).
		state('editAccessrule', {
			url: '/accessrules/:accessruleId/edit',
			templateUrl: 'modules/accessrules/views/edit-accessrule.client.view.html'
		});
	}
]);
'use strict';

// Accessrules controller
angular.module('accessrules').controller('AccessrulesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Accessrules',
	function($scope, $stateParams, $location, Authentication, Accessrules) {
		$scope.authentication = Authentication;

		// Create new Accessrule
		$scope.create = function() {
			// Create new Accessrule object
			var accessrule = new Accessrules ({
				name: this.name
			});

			// Redirect after save
			accessrule.$save(function(response) {
				$location.path('accessrules/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Accessrule
		$scope.remove = function(accessrule) {
			if ( accessrule ) { 
				accessrule.$remove();

				for (var i in $scope.accessrules) {
					if ($scope.accessrules [i] === accessrule) {
						$scope.accessrules.splice(i, 1);
					}
				}
			} else {
				$scope.accessrule.$remove(function() {
					$location.path('accessrules');
				});
			}
		};

		// Update existing Accessrule
		$scope.update = function() {
			var accessrule = $scope.accessrule;

			accessrule.$update(function() {
				$location.path('accessrules/' + accessrule._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Accessrules
		$scope.find = function() {
			$scope.accessrules = Accessrules.query();
		};

		// Find existing Accessrule
		$scope.findOne = function() {
			$scope.accessrule = Accessrules.get({ 
				accessruleId: $stateParams.accessruleId
			});
		};
	}
]);
'use strict';

//Accessrules service used to communicate Accessrules REST endpoints
angular.module('accessrules').factory('Accessrules', ['$resource',
	function($resource) {
		return $resource('accessrules/:accessruleId', { accessruleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('alerts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Alerts', 'alerts', 'dropdown', '/alerts(/create)?');
		Menus.addSubMenuItem('topbar', 'alerts', 'List Alerts', 'alerts');
		Menus.addSubMenuItem('topbar', 'alerts', 'New Alert', 'alerts/create');
	}
]);
'use strict';

//Setting up route
angular.module('alerts').config(['$stateProvider',
	function($stateProvider) {
		// Alerts state routing
		$stateProvider.
		state('listAlerts', {
			url: '/alerts',
			templateUrl: 'modules/alerts/views/list-alerts.client.view.html'
		}).
		state('createAlert', {
			url: '/alerts/create',
			templateUrl: 'modules/alerts/views/create-alert.client.view.html'
		}).
		state('viewAlert', {
			url: '/alerts/:alertId',
			templateUrl: 'modules/alerts/views/view-alert.client.view.html'
		}).
		state('editAlert', {
			url: '/alerts/:alertId/edit',
			templateUrl: 'modules/alerts/views/edit-alert.client.view.html'
		});
	}
]);
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
'use strict';

//Alerts service used to communicate Alerts REST endpoints
angular.module('alerts').factory('Alerts', ['$resource',
	function($resource) {
		return $resource('alerts/:alertId', { alertId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
/**
 * Created by George on 9/28/2015.
 */
'use strict';

angular.module('alerts').factory('MyAlerts', ['$resource',
    function($resource) {
        return $resource('myalerts/:userId', { userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

/**
 * Created by George on 9/30/2015.
 */
'use strict';

angular.module('alerts').factory('UnresolvedAlerts', ['$resource',
    function($resource) {
        return $resource('unresolvedalerts/:alerttype', { userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
		
	//	Menus.addMenuItem('footbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
	//	Menus.addSubMenuItem('footbar', 'articles', 'List Articles', 'articles');
	//	Menus.addSubMenuItem('footbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html',
				data: { displayName: 'Create Article'}
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);

'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles','$mdToast', '$animate','$mdDialog','Socket',
	function($scope, $stateParams, $location, Authentication, Articles,$mdToast, $animate,$mdDialog,Socket) {
		$scope.authentication = Authentication;
		

		// Toastr

		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};

		//2. the method looks for the position that we want to display the toast
		$scope.getToastPosition = function() {
			return Object.keys($scope.toastPosition)
				.filter(function(pos) { return $scope.toastPosition[pos]; })
				.join(' ');
		};

		//1. The send button will call this method
		$scope.sendMail = function() {
			$mdToast.show(
				$mdToast.simple()
					.content('Thanks for your Message  You Rock!')
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);
		};
		
		//SOckect.io
		Socket.on('article.created', function(article) {
    			$mdToast.show(
				$mdToast.simple()
					.content('Article created'+article)
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);
			});
			
			Socket.on('reading.received', function(reading) {
    			$mdToast.show(
				$mdToast.simple()
					.content('reading received '+reading.toString())
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);
			});
		
		
		//Dialog
		 $scope.showAlert = function(ev) {
	    // Appending dialog to document.body to cover sidenav in docs app
	    // Modal dialogs should fully cover application
	    // to prevent interaction outside of dialog
	    $mdDialog.show(
	      $mdDialog.alert()
	        
	        .title('This is an alert title')
	        .content('You can specify some description text in here.')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Got it!')
	        .targetEvent(ev)
	    );
	  };


		$scope.create = function() {

			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			
			
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('clients').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Clients', 'clients', 'dropdown', '/clients(/create)?');
		Menus.addSubMenuItem('topbar', 'clients', 'List Clients', 'clients');
		Menus.addSubMenuItem('topbar', 'clients', 'New Client', 'clients/create');
	}
]);


'use strict';

//Setting up route
angular.module('clients').config(['$stateProvider',
	function($stateProvider) {
		// Clients state routing
		$stateProvider.
		state('listClients', {
			url: '/clients',
			templateUrl: 'modules/clients/views/list-clients.client.view.html',
				data:{
					displayName:'Clients'
				}
		}).
			state('listMyClients', {
				url: '/myclients',
				templateUrl: 'modules/clients/views/list-myclients.client.view.html',
				data:{
					displayName:'My Clients'
				}
			}).
		state('createClient', {
			url: '/clients/create',
			templateUrl: 'modules/clients/views/create-client.client.view.html'
		}).
		state('viewClient', {
			url: '/clients/:clientId',
			templateUrl: 'modules/clients/views/view-client.client.view.html'
		}).
		state('editClient', {
			url: '/clients/:clientId/edit',
			templateUrl: 'modules/clients/views/edit-client.client.view.html'
		});
	}
]);

'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients','$mdToast', '$animate','$mdDialog','Devices','$modal','$log','ClientsUsers',
	function($scope, $stateParams, $location, Authentication, Clients,$mdToast, $animate,$mdDialog,Devices,$modal,$log,ClientsUsers) {
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

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modules/clients/views/edit-client.client.view.html',//'myModalContent.html',
                controller: 'ClientsController',
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
			$scope.clients = Clients.query();
		};

		// Find existing Client
		$scope.findOne = function() {
			$scope.client = Clients.get({ 
				clientId: $stateParams.clientId
			});

            //$scope.clientsDevices = Devices.query();
            $scope.clientsUsers = ClientsUsers.query({clientId1:$stateParams.clientId});

		};
		
		// Highcharts
		/*
		//This is not a highcharts object. It just looks a little like one!
                $scope.chartConfig = {
                
                  options: {
                      //This is the Main Highcharts chart config. Any Highchart options are valid here.
                      //will be overriden by values specified below.
                      chart: {
                          type: 'bar'
                      },
                      tooltip: {
                          style: {
                              padding: 10,
                              fontWeight: 'bold'
                          }
                      }
                  },
                  //The below properties are watched separately for changes.
                
                  //Series object (optional) - a list of series using normal highcharts series options.
                  series: [{
                     data: [10, 15, 12, 8, 7]
                  }],
                  //Title configuration (optional)
                  title: {
                     text: 'Hello'
                  },
                  //Boolean to control showng loading status on chart (optional)
                  //Could be a string if you want to show specific loading text.
                  loading: false,
                  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
                  //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
                  xAxis: {
                  currentMin: 0,
                  currentMax: 20,
                  title: {text: 'values'}
                  },
                  //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
                  useHighStocks: false,
                  //size (optional) if left out the chart will default to size of the div or something sensible.
                  size: {
                   width: 400,
                   height: 300
                  },
                  //function (optional)
                  func: function (chart) {
                   //setup some logic for the chart
                  }
                };
*/
		

        var globalSeries;

        /*Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });*/

        $scope.chartConfig = {
            chart: {
                type: 'spline',
                //renderTo: 'container',
                //animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        globalSeries = series;
                      
                        updateData();
                    }
                }
            },
            title: {
                text: 'Readings Cold Room 1'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]

            },
            //tooltip: {
             //   formatter: function () {
             //       return '<b>' + this.series.name + '</b><br/>' +
             //               Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
             //               Highcharts.numberFormat(this.y, 2);
             //   }
            //},

            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                            time = (new Date()).getTime(),
                            i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        };

       
       function updateData(){
            setInterval(function () {
                var x = (new Date()).getTime(), // current time
                        y = Math.random();
               globalSeries.addPoint([x, y], true, true);
            }, 1000);
        }
    /*    var socket = io.connect('http://localhost:3001');


        socket.on('pushdata', function (data) {
            document.getElementById("currentreading").innerHTML = data.readingvalue;
            //ko.applyBindings(new ViewModel(data));
            //updateData(data);

            var x = data.readingtime,
                    y = data.readingvalue/100; //Math.random();
            globalSeries.addPoint([x, y], true, true);

        });*/
       	
	}
]);

'use strict';

// Clients controller
angular.module('clients').controller('MyClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'MyClients','$mdToast', '$animate','$mdDialog','Devices','$modal','$log','ClientsUsers',
	function($scope, $stateParams, $location, Authentication, MyClients,$mdToast, $animate,$mdDialog,Devices,$modal,$log,ClientsUsers) {
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

            var modalInstance = $modal.open({
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
		
		// Highcharts
		/*
		//This is not a highcharts object. It just looks a little like one!
                $scope.chartConfig = {
                
                  options: {
                      //This is the Main Highcharts chart config. Any Highchart options are valid here.
                      //will be overriden by values specified below.
                      chart: {
                          type: 'bar'
                      },
                      tooltip: {
                          style: {
                              padding: 10,
                              fontWeight: 'bold'
                          }
                      }
                  },
                  //The below properties are watched separately for changes.
                
                  //Series object (optional) - a list of series using normal highcharts series options.
                  series: [{
                     data: [10, 15, 12, 8, 7]
                  }],
                  //Title configuration (optional)
                  title: {
                     text: 'Hello'
                  },
                  //Boolean to control showng loading status on chart (optional)
                  //Could be a string if you want to show specific loading text.
                  loading: false,
                  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
                  //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
                  xAxis: {
                  currentMin: 0,
                  currentMax: 20,
                  title: {text: 'values'}
                  },
                  //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
                  useHighStocks: false,
                  //size (optional) if left out the chart will default to size of the div or something sensible.
                  size: {
                   width: 400,
                   height: 300
                  },
                  //function (optional)
                  func: function (chart) {
                   //setup some logic for the chart
                  }
                };
*/
		

        var globalSeries;

        /*Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });*/

        $scope.chartConfig = {
            chart: {
                type: 'spline',
                //renderTo: 'container',
                //animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        globalSeries = series;
                      
                        updateData();
                    }
                }
            },
            title: {
                text: 'Readings Cold Room 1'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]

            },
            //tooltip: {
             //   formatter: function () {
             //       return '<b>' + this.series.name + '</b><br/>' +
             //               Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
             //               Highcharts.numberFormat(this.y, 2);
             //   }
            //},

            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                            time = (new Date()).getTime(),
                            i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        };

       
       function updateData(){
            setInterval(function () {
                var x = (new Date()).getTime(), // current time
                        y = Math.random();
               globalSeries.addPoint([x, y], true, true);
            }, 1000);
        }
    /*    var socket = io.connect('http://localhost:3001');


        socket.on('pushdata', function (data) {
            document.getElementById("currentreading").innerHTML = data.readingvalue;
            //ko.applyBindings(new ViewModel(data));
            //updateData(data);

            var x = data.readingtime,
                    y = data.readingvalue/100; //Math.random();
            globalSeries.addPoint([x, y], true, true);

        });*/
       	
	}
]);

'use strict';

//Clients service used to communicate Clients REST endpoints
angular.module('clients').factory('Clients', ['$resource',
	function($resource) {
		return $resource('clients/:clientId', { clientId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Clients service used to communicate Clients REST endpoints
angular.module('clients').factory('MyClients', ['$resource',
	function($resource) {
		return $resource('myclients/:clientId', { clientId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html',
				data: { displayName: 'Home'}
		});
	}
]);

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
         */
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
        };
	}
]);

'use strict';

var coremodule = angular.module('core');

coremodule.controller('HomeController', ['$scope', 'Authentication','$document',
	function($scope, Authentication,$document) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		angular.element(document.querySelector( '.navbar-nav' )).addClass('green-fg');

	}
]);


/**
 * Created by George on 9/27/2015.
 */
'use strict';

var coremodule = angular.module('core');

coremodule.directive('restrict',['Authentication', function(Authentication){
        return{
            restrict: 'A',
            priority: 100000,
            scope: false,
            link: function(){
                //alert('ergo sum!');
            },
            compile:  function(element, attr, linker){
                var accessDenied = true;
                var user = Authentication.user;//authService.getUser();


                var attributes = attr.access.split(' ');
                for(var i in attributes){
                    //if(user.role === attributes[i]){
                      //  accessDenied = false;
                    //}
                    if(user.roles)
                    if(user.roles.indexOf(attributes[i])>-1)
                    {
                        accessDenied = false;
                    }
                }


                if(accessDenied){
                    if(user){
                    element.children().remove();
                    element.remove();
                    console.log('Removed Element');
                    }
                }

            }
        };
    }]);


'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
		//this.addMenu('footbar');
	}
]);
'use strict';

//socket factory that provides the socket service
angular.module('core').factory('Socket', ['socketFactory',
    function(socketFactory) {
        return socketFactory();
        //{
          //  prefix: ''//,
            //ioSocket: io.connect('http://localhost:3000')
        //}
    }
]);
'use strict';

//Setting up route
angular.module('dashboard').config(['$stateProvider',
	function($stateProvider) {
		// Dashboard state routing
		$stateProvider.
		state('dashboard', {
			url: '/dashboard',
			templateUrl: 'modules/dashboard/views/dashboard.client.view.html'
		});
	}
]);
'use strict';

angular.module('dashboard').controller('DashboardController', ['$scope','$mdToast', '$animate','$mdDialog','$interval','Devices','MyDevices',"Authentication",
	function($scope,$mdToast, $animate,$mdDialog,$interval,Devices,MyDevices,Authentication) {
		// Controller Logic
		// ...
		$scope.authentication = Authentication;

		var usersClient = $scope.authentication.user.client;
		if(usersClient){
			$scope.devices = MyDevices.query();
		}else
		{
			$scope.devices = Devices.query();
		}

		$scope.selectedDevice = '';

		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};

		$scope.getToastPosition = function () {
			return Object.keys($scope.toastPosition)
				.filter(function (pos) { return $scope.toastPosition[pos]; })
				.join(' ');
		};

		var globalSeries;

		/*Highcharts.setOptions({
		 global: {
		 useUTC: false
		 }
		 });*/

		var socket = io('https://40.124.8.98');
		socket.on('connect', function(){
			console.log('connected');
		});
		var currentDeviceId = '';
		$scope.sensor1 ='';
		$scope.sensor2 = '';
		$scope.sensor3 = '';
		$scope.sensor4 = '';

		if($scope.selectedDevice)
		currentDeviceId = $scope.selectedDevice.deviceId;
		$scope.$watch('selectedDevice',function(){

				$scope.chartConfig.series[0].data = [];
				$scope.chartConfig.series[1].data = [];

		});

		socket.on('pushdata', function(data){


			/*console.log('Data Received'+ data.readingtime+' '+data.readingvalue+ ''+data.device);

			console.log('$scope.myval = '+$scope.myval)*/
			if($scope.selectedDevice)
			if(data.device==$scope.selectedDevice.deviceId)
			{
				$scope.$apply(function(){
					$scope.sensor1 = data.sensor1;
					$scope.sensor2 = data.sensor2;
					$scope.sensor3 = data.sensor3;
					$scope.sensor4 = data.sensor4;

					var x = (new Date()).getTime(); // current time
					var y = data.sensor1,y2 = data.sensor2;
					//$scope.chartConfig.series[0].data.concat(10,x,y)//.addPoint([x, y], true, true);
					if($scope.chartConfig.series[0].data){
						if($scope.chartConfig.series[0].data.length>15)
						$scope.chartConfig.series[0].data.shift();
						$scope.chartConfig.series[0].data.push([x,  parseFloat(y)]);}
					if($scope.chartConfig.series[1].data){
						if($scope.chartConfig.series[1].data.length>15)
					 $scope.chartConfig.series[1].data.shift();
					 $scope.chartConfig.series[1].data.push([x, parseFloat(y2)]);
					 //$scope.myval = y;
					 }
					if($scope.chartConfig.series[2].data){
						if($scope.chartConfig.series[2].data.length>15)
							$scope.chartConfig.series[2].data.shift();
						$scope.chartConfig.series[2].data.push([x, parseFloat(data.sensor3)]);
						//$scope.myval = y;
					}
					if($scope.chartConfig.series[3].data){
						if($scope.chartConfig.series[3].data.length>15)
							$scope.chartConfig.series[3].data.shift();
						$scope.chartConfig.series[3].data.push([x, parseFloat(data.sensor4)]);
						//$scope.myval = y;
					}

				});

				/*
			$mdToast.show(

				$mdToast.simple()
					.content('Data Received @'+ data.readingtime+'  '+data.readingvalue)
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);*/
		}

		});
		socket.on('disconnect', function(){

			console.log('Connection is lost');
		});

		$scope.colours = [{
			name: 'Red',
			hex: '#F21B1B'
		}, {
			name: 'Blue',
			hex: '#1B66F2'
		}, {
			name: 'Green',
			hex: '#07BA16'
		}];
		$scope.colour = '';

		$scope.center = {
			lat: -17.829220000000000000,
				lon: 31.053961000000072000,
				zoom: 8
		};
		$scope.defaults = {
			layer: {
				url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
			},
			map: {
				scrollWheelZoom: true
			},
			controls: {
				zoom: {
					position: 'topright'
				}
			}
		};

		$scope.chartConfig = {
			chart: {
				type: 'spline',
				//renderTo: 'container',
				//animation: Highcharts.svg, // don't animate in old IE
				marginRight: 10,
				events: {
					load: function () {

						// set up the updating of the chart each second
						var series = this.series[0];
						globalSeries = series;

						this.updateData();
					}
				}
			},
			title: {
				text: 'Readings'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 150
			},
			yAxis: {
				title: {
					text: 'Temperature'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}],
				max:100

			},
			//tooltip: {
			//   formatter: function () {
			//       return '<b>' + this.series.name + '</b><br/>' +
			//               Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
			//               Highcharts.numberFormat(this.y, 2);
			//   }
			//},
			pointInterval: 60*1000,// every minute
			legend: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: 'Sensor 1',
				data: (function () {
					// generate an array of random data
					var data = [],
				time = (new Date()).getTime(),
						i; /*

					for (i = -19; i <= 0; i += 1) {
						data.push({
							x: time + i * 1000,
							y: Math.random()
						});
					}*/
					return data;
				}()),
				color:'#808080'
			},
				{
					name: 'Sensor 2',
					data: (function () {
						// generate an array of random data
						var data = [],
							time = (new Date()).getTime(),
							i;/*

						for (i = -19; i <= 0; i += 1) {
							data.push({
								x: time + i * 1000,
								y: Math.random()
							});
						}*/
						return data;
					}()),
					color:'#ff0000'
				},
				{
					name: 'Sensor 3',
					data: (function () {
						// generate an array of random data
						var data = [],
							time = (new Date()).getTime(),
							i;/*

						 for (i = -19; i <= 0; i += 1) {
						 data.push({
						 x: time + i * 1000,
						 y: Math.random()
						 });
						 }*/
						return data;
					}()),
					color:'#0000ff'
				},
				{
					name: 'Sensor 4',
					data: (function () {
						// generate an array of random data
						var data = [],
							time = (new Date()).getTime(),
							i;/*

						 for (i = -19; i <= 0; i += 1) {
						 data.push({
						 x: time + i * 1000,
						 y: Math.random()
						 });
						 }*/
						return data;
					}()),
					color:'#00ff00'
				}
			]
		};

		$scope.myval = 0;

		$scope.options = {
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;

				for (i = -19; i <= 0; i += 1) {
					data.push({
						sales:time + i * 1000 ,
						income: Math.random()
					});
				}
				return data;
			}())

			,
			dimensions: {
				sales: {
					type: 'line'
				},
				income: {
					axis: 'x'
				}
			}
		};

		$scope.pushpoint = function()
		{
			$scope.options.data.shift();
			$scope.options.data.push({sales:(new Date()).getTime(),income: Math.random()});
		};

		$scope.update = function() {
			$scope.chartConfig.title = $scope.selectedDevice.name;
			// use $scope.selectedItem.code and $scope.selectedItem.name here
			// for other stuff ...
		};

		$scope.showSummary = function(selection)
		{
			$scope.selectedSummary = selection;

		};
		/*
		// undo this for dummy data

		$interval(function(){
		//	$scope.myval = Math.random();
			var x = (new Date()).getTime(), // current time
				y = Math.random();
			//$scope.chartConfig.series[0].data.concat(10,x,y)//.addPoint([x, y], true, true);
			$scope.chartConfig.series[0].data.shift();
			$scope.chartConfig.series[0].data.push([x, y]);
			$scope.myval = y*100;

		},1000);*/

		function updateData(){
			setInterval(function () {
				var x = (new Date()).getTime(), // current time
					y = Math.random();
				//$scope.chartConfig.series[0].data.concat(10,x,y)//.addPoint([x, y], true, true);
				globalSeries.addPoint([x, y], true, true);
			}, 1000);
		}

	}
]);

'use strict';

// Configuring the Articles module
angular.module('devices').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Devices', 'devices', 'dropdown', '/devices(/create)?');
		Menus.addSubMenuItem('topbar', 'devices', 'List Devices', 'devices');
		Menus.addSubMenuItem('topbar', 'devices', 'New Device', 'devices/create');
	}
]);
'use strict';

//Setting up route
angular.module('devices').config(['$stateProvider',
	function($stateProvider) {
		// Devices state routing
		$stateProvider.
		state('listDevices', {
			url: '/devices',
			templateUrl: 'modules/devices/views/list-devices.client.view.html'
		}).
		state('createDevice', {
			url: '/devices/create',
			templateUrl: 'modules/devices/views/create-device.client.view.html'
		}).
		state('viewDevice', {
			url: '/devices/:deviceId',
			templateUrl: 'modules/devices/views/view-device.client.view.html'
		}).
		state('editDevice', {
			url: '/devices/:deviceId/edit',
			templateUrl: 'modules/devices/views/edit-device.client.view.html'
		}).
			state('listMyDevices', {
				url: '/mydevices',
				templateUrl: 'modules/devices/views/list-mydevices.client.view.html'
			})./*
			state('createMyDevice', {
				url: '/mydevices/create',
				templateUrl: 'modules/devices/views/create-mydevice.client.view.html'
			}).
			state('viewMyDevice', {
				url: '/mydevices/:deviceId',
				templateUrl: 'modules/devices/views/view-mydevice.client.view.html'
			}).*/
			state('editMyDevice', {
				url: '/mydevices/:deviceId/edit',
				templateUrl: 'modules/devices/views/edit-mydevice.client.view.html'
			});
	}
]);

'use strict';

// Devices controller
angular.module('devices').controller('DevicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Devices', '$rootScope', '$mdToast', 'Devicesensors', 'Sensortypes', '$filter', 'Devicesensoralerts', '$modal','Readings2','DeviceSensor',
	function ($scope, $stateParams, $location, Authentication, Devices, $rootScope, $mdToast, Devicesensors, Sensortypes, $filter, Devicesensoralerts, $modal,Readings2,DeviceSensor) {
		$scope.authentication = Authentication;
		$rootScope.section = 'Devices';
		$scope.selectedView = '';
		$scope.selectedAlertView = '';
		$scope.currentSelectedSensorAlert = '';
		$scope.selectedAlertActionView = '';
		$scope.currentSelectedSensorAlertAction = '';
		$scope.devicesReadings = '';


		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};

		$scope.getToastPosition = function () {
			return Object.keys($scope.toastPosition)
				.filter(function (pos) { return $scope.toastPosition[pos]; })
				.join(' ');
		};

		$scope.currentSelectedSensor = '';
		$scope.availableSensortypes = '';
		$scope.showView = function (selection, sensor) {
			$scope.selectedView = selection;
			$scope.currentSelectedSensor = sensor;
			if ((selection === 'edit') || (selection === 'create')) {

				$scope.availableSensortypes = Sensortypes.query();

			}
		};

		$scope.showAlertView = function (selection, sensorAlert) {
			$scope.selectedAlertView = selection;
			if(sensorAlert) {
				$scope.currentSelectedSensorAlert = sensorAlert;
				if (sensorAlert.alarmactions) {
					$scope.currentSelectedSensorAlertsActions = sensorAlert.alarmactions;
				}
			}

		};
		$scope.showAlertActionView = function (selection, sensorAlertAction) {
			$scope.selectedAlertActionView = selection;
			if(sensorAlertAction){
			$scope.currentSelectedSensorAlertAction = sensorAlertAction;
			}

		};
		// Create new Device
		$scope.create = function () {


			// Create new Device object
			var device = new Devices({
				deviceId: this.deviceId,
				location: this.location,
				name: this.name,
				description: this.description

			});

			if (device.sensors) {
				device.sensors.push({ name: 'An Embedded Sensor Document', sensoralerts: [] });
			} else {
				device.sensors = [];
				device.sensors.push({ name: 'An Embedded Sensor Document', sensoralerts: [] });
			}

			//device.sensors.push({name:'An Embedded Sensor Document',sensoralerts:[]});
			// Redirect after save
			device.$save(function (response) {
				$location.path('devices/' + response._id);

				// Clear form fields

				$scope.location = '';
				$scope.deviceId = '';

				$mdToast.show(
					$mdToast.simple()
						.content('Record Created')
						.position($scope.getToastPosition())
						.hideDelay(3000)
					);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		// Remove existing Device
		$scope.remove = function (device) {
			if (device) {
				device.$remove();

				for (var i in $scope.devices) {
					if ($scope.devices[i] === device) {
						$scope.devices.splice(i, 1);
					}
				}
			} else {
				$scope.device.$remove(function () {
					$location.path('devices');
				});
			}
		};

		// Update existing Device
		$scope.update = function () {
			var device = $scope.device;

			device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

				//$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Find a list of Devices
		$scope.find = function () {
			$scope.devices = Devices.query();
		};

		$scope.deviceSensorAlerts = '';
		// Find existing Device
		$scope.findOne = function () {
			$scope.device = Devices.get({
				deviceId: $stateParams.deviceId
			});


			$scope.devicesReadings = Readings2.query({ myId: $stateParams.deviceId});


		/*	var resultP = Devicesensors.query();
			var devId = $stateParams.deviceId;
			$scope.connectedSensors = resultP;
			var resForDeviceSensorAlerts = Devicesensoralerts.query();
			$scope.deviceSensorAlerts = resForDeviceSensorAlerts;*/
			
		};

		$scope.animationsEnabled = true;

		$scope.openCreateSensorAlert = function (size, selectedAlert) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralerts/views/create-devicesensoralert.client.view.html',//'myModalContent.html',
				controller: ["$modalInstnce", "$scope", "alert", function ($modalInstnce, $scope, alert) {
					$scope.devicesensoralert = alert;
				}],
				size: size,
				resolve: {
					alert: function () {
						return selectedAlert;
					}
				}
			});
		};

		$scope.openEditSensorAlert = function (size, selectedAlert) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralerts/views/edit-devicesensoralert.client.view.html',//'myModalContent.html',
				controller: ["$modalInstance", "$scope", "alert", function ($modalInstance, $scope, alert) {
					$scope.devicesensoralert = alert;

					$scope.ok = function () {
						$modalInstance.close(alert);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};

				}],
				size: size,
				resolve: {
					alert: function () {
						return selectedAlert;
					}
				}
			});
		};

		$scope.openEditDevice = function (size, selectedDevice) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devices/views/edit-device.client.view.html',//'myModalContent.html',
				controller: ["$modalInstance", "$scope", "deviceOnEdit", function ($modalInstance, $scope, deviceOnEdit) {
					$scope.device = deviceOnEdit;

					var resultP = Devicesensors.query();
					var devId = $scope.device._id;
					$scope.connectedSensors = resultP;

					var resForDeviceSensorAlerts = Devicesensoralerts.query();
					$scope.deviceSensorAlerts = resForDeviceSensorAlerts;

					$scope.ok = function () {
						$modalInstance.close(deviceOnEdit);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};

				}],
				windowClass: 'app-modal-window',
				size: size,
				resolve: {
					deviceOnEdit: function () {
						return selectedDevice;
					}
				}
			});
		};

		//update device on modal
		this.updateDevice = function () {
			var device = $scope.device;

			console.log(' Device Details are ' + device.location.lon);

			$scope.device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
					);

				$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.createsensor = function() {

			// Create new Devicesensor object
			/*var devicesensor = new Devicesensors ({
				name: this.sensorname_c,
				sensortype: this.sensortype_c,
				deviceId: this.parentdeviceId,
				channel: this.channel_c
			});*/

			if(!$scope.device.sensors){
				$scope.device.sensors = [];
			}

			$scope.device.sensors.push({
					name: this.sensorname_c,
				sensortype: this.sensortype_c,
				channel: this.channel_c
				});

			$scope.device.$update(function(err)
			{
				if(err)
				{
					console.log('error updating record');
				}

				$mdToast.show(
					$mdToast.simple()
						.content('Sensor Record Created')
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);


			});
			// Redirect after save
			/*
			devicesensor.$save(function(response) {
				//$location.path('devicesensors/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.sensorname_c = '';
					$scope.sensortype_c = '';
					$scope.parentdeviceId = '';
					$scope.channel_c = '';
				$scope.showView('view',$scope.currentSelectedSensor);

				$mdToast.show(
					$mdToast.simple()
						.content('Sensor Record Created')
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				$mdToast.show(
					$mdToast.simple()
						.content('Error '+ $scope.error)
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);
			});*/
		};

		$scope.connectedSensorTabSelected = function()
		{

			alert('Youve selected connected sensors');
		};

		$scope.removeSensor = function(devicesensor)
		{
			$scope.device.sensors.splice( $scope.device.sensors.indexOf(devicesensor), 1 );
			$scope.device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);
				if($scope.device.sensors){
					$scope.currentSelectedSensor = $scope.device.sensors[0];
					$scope.showView('edit',$scope.currentSelectedSensor);
				}

				//$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		$scope.createSensorAlert = function(){

			var newDeviceSensorAlert = {
				name: this.alertname_c
			};

			console.log('Alert Details'+newDeviceSensorAlert);
			newDeviceSensorAlert.alarmactions = [];

			$scope.showAlertView('editAlert',newDeviceSensorAlert);


			if($scope.currentSelectedSensor.sensoralerts){
				$scope.currentSelectedSensor.sensoralerts.push(newDeviceSensorAlert);

			}
			else{
				$scope.currentSelectedSensor.sensoralerts = [];
				$scope.currentSelectedSensor.sensoralerts.push(newDeviceSensorAlert);
			}
			$scope.device.$update(function (){



				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);
			});
		};

		$scope.removeSensorAlert = function(alert){
			console.log(alert);
			console.log($scope.currentSelectedSensor.sensoralerts);
			$scope.currentSelectedSensor.sensoralerts.id(alert._id).remove();
			$scope.device.save(function(err){

			});
		};

		$scope.createAlertAction = function()
		{
			var newAlertAction = {

				name: this.alertaction_name_c,
				actiontype: this.alertaction_actiontype_c,
				thresholdvaluemin:this.alertaction_thresholdvaluemin_c,
				thresholdvaluemax: this.alertaction_thresholdvaluemax_c,
				sendonclear: this.alertaction_sendonclear_c
			};

			//$scope.showAlertActionView();
			if($scope.currentSelectedSensorAlert.alertactions)
			{
				$scope.currentSelectedSensorAlert.alertactions.push(newAlertAction);
			}
			else{
				$scope.currentSelectedSensorAlert.alertactions = [];
				$scope.currentSelectedSensorAlert.alertactions.push(newAlertAction);

			}

			$scope.device.$update(function(){
				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
			);

			});
		};

		$scope.updateDeviceSensor = function()
		{
			var deviceSensor = $scope.currentSelectedSensor;

			deviceSensor.$update(function() {
				//$location.path('devices/' + device._id);
				$mdToast.show(
					$mdToast.simple()
						.content('Device Sensor Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		$scope.updateRecord = function()
		{


			$scope.device.$update(function() {
				//$location.path('devices/' + device._id);
				$mdToast.show(
					$mdToast.simple()
						.content('Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.connectedSensorsTabSelected = function () {

			if($scope.device.sensors){
				$scope.currentSelectedSensor = $scope.device.sensors[0];

				$scope.showView('edit',$scope.currentSelectedSensor);
			}


		};

		$scope.sensorsAlertsTabSelected = function () {

			if($scope.currentSelectedSensor.sensoralerts){
				$scope.currentSelectedSensorAlert = $scope.currentSelectedSensor.sensoralerts[0];

				$scope.showAlertView('editAlert',$scope.currentSelectedSensorAlert);
			}

		};

	}
]);

'use strict';

// Devices controller
angular.module('devices').controller('MyDevicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'MyDevices', '$rootScope', '$mdToast', 'Devicesensors', 'Sensortypes', '$filter', 'Devicesensoralerts', '$modal','Readings2','DeviceSensor',
	function ($scope, $stateParams, $location, Authentication, MyDevices, $rootScope, $mdToast, Devicesensors, Sensortypes, $filter, Devicesensoralerts, $modal,Readings2,DeviceSensor) {
		$scope.authentication = Authentication;
		$rootScope.section = 'Devices';
		$scope.selectedView = '';
		$scope.selectedAlertView = '';
		$scope.currentSelectedSensorAlert = '';
		$scope.selectedAlertActionView = '';
		$scope.currentSelectedSensorAlertAction = '';
		$scope.devicesReadings = '';

		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};

		$scope.getToastPosition = function () {
			return Object.keys($scope.toastPosition)
				.filter(function (pos) { return $scope.toastPosition[pos]; })
				.join(' ');
		};

		$scope.currentSelectedSensor = '';
		$scope.availableSensortypes = '';
		$scope.showView = function (selection, sensor) {
			$scope.selectedView = selection;
			$scope.currentSelectedSensor = sensor;
			if ((selection === 'edit') || (selection === 'create')) {

				$scope.availableSensortypes = Sensortypes.query();

			}
		};

		$scope.showAlertView = function (selection, sensorAlert) {
			$scope.selectedAlertView = selection;
			if(sensorAlert) {
				$scope.currentSelectedSensorAlert = sensorAlert;
				if (sensorAlert.alarmactions) {
					$scope.currentSelectedSensorAlertsActions = sensorAlert.alarmactions;
				}
			}

		};
		$scope.showAlertActionView = function (selection, sensorAlertAction) {
			$scope.selectedAlertActionView = selection;
			if(sensorAlertAction){
			$scope.currentSelectedSensorAlertAction = sensorAlertAction;
			}

		};
		// Create new Device
		$scope.create = function () {


			// Create new Device object
			var device = new MyDevices({
				deviceId: this.deviceId,
				location: this.location,
				name: this.name,
				description: this.description

			});

			if (device.sensors) {
				device.sensors.push({ name: 'An Embedded Sensor Document', sensoralerts: [] });
			} else {
				device.sensors = [];
				device.sensors.push({ name: 'An Embedded Sensor Document', sensoralerts: [] });
			}

			//device.sensors.push({name:'An Embedded Sensor Document',sensoralerts:[]});
			// Redirect after save
			device.$save(function (response) {
				$location.path('devices/' + response._id);

				// Clear form fields

				$scope.location = '';
				$scope.deviceId = '';

				$mdToast.show(
					$mdToast.simple()
						.content('Record Created')
						.position($scope.getToastPosition())
						.hideDelay(3000)
					);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		// Remove existing Device
		$scope.remove = function (device) {
			if (device) {
				device.$remove();

				for (var i in $scope.devices) {
					if ($scope.devices[i] === device) {
						$scope.devices.splice(i, 1);
					}
				}
			} else {
				$scope.device.$remove(function () {
					$location.path('devices');
				});
			}
		};

		// Update existing Device
		$scope.update = function () {
			var device = $scope.device;

			device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

				//$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Find a list of Devices
		$scope.find = function () {
			$scope.devices = MyDevices.query();
		};

		$scope.deviceSensorAlerts = '';
		// Find existing Device
		$scope.findOne = function () {
			$scope.device = MyDevices.get({
				deviceId: $stateParams.deviceId
			});


			$scope.devicesReadings = Readings2.query({ myId: $stateParams.deviceId});



		/*	var resultP = Devicesensors.query();
			var devId = $stateParams.deviceId;
			$scope.connectedSensors = resultP;
			var resForDeviceSensorAlerts = Devicesensoralerts.query();
			$scope.deviceSensorAlerts = resForDeviceSensorAlerts;*/
			
		};

		$scope.animationsEnabled = true;

		$scope.openCreateSensorAlert = function (size, selectedAlert) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralerts/views/create-devicesensoralert.client.view.html',//'myModalContent.html',
				controller: ["$modalInstnce", "$scope", "alert", function ($modalInstnce, $scope, alert) {
					$scope.devicesensoralert = alert;
				}],
				size: size,
				resolve: {
					alert: function () {
						return selectedAlert;
					}
				}
			});
		};

		$scope.openEditSensorAlert = function (size, selectedAlert) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devicesensoralerts/views/edit-devicesensoralert.client.view.html',//'myModalContent.html',
				controller: ["$modalInstance", "$scope", "alert", function ($modalInstance, $scope, alert) {
					$scope.devicesensoralert = alert;

					$scope.ok = function () {
						$modalInstance.close(alert);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};

				}],
				size: size,
				resolve: {
					alert: function () {
						return selectedAlert;
					}
				}
			});
		};

		$scope.openEditDevice = function (size, selectedDevice) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/devices/views/edit-device.client.view.html',//'myModalContent.html',
				controller: ["$modalInstance", "$scope", "deviceOnEdit", function ($modalInstance, $scope, deviceOnEdit) {
					$scope.device = deviceOnEdit;

					var resultP = Devicesensors.query();
					var devId = $scope.device._id;
					$scope.connectedSensors = resultP;

					var resForDeviceSensorAlerts = Devicesensoralerts.query();
					$scope.deviceSensorAlerts = resForDeviceSensorAlerts;

					$scope.ok = function () {
						$modalInstance.close(deviceOnEdit);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};

				}],
				windowClass: 'app-modal-window',
				size: size,
				resolve: {
					deviceOnEdit: function () {
						return selectedDevice;
					}
				}
			});
		};

		//update device on modal
		this.updateDevice = function () {
			var device = $scope.device;

			console.log(' Device Details are ' + device.location.lon);

			$scope.device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
					);

				$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.createsensor = function() {

			// Create new Devicesensor object
			/*var devicesensor = new Devicesensors ({
				name: this.sensorname_c,
				sensortype: this.sensortype_c,
				deviceId: this.parentdeviceId,
				channel: this.channel_c
			});*/

			if(!$scope.device.sensors){
				$scope.device.sensors = [];
			}

			$scope.device.sensors.push({
					name: this.sensorname_c,
				sensortype: this.sensortype_c,
				channel: this.channel_c
				});

			$scope.device.$update(function(err)
			{
				if(err)
				{
					console.log('error updating record');
				}

				$mdToast.show(
					$mdToast.simple()
						.content('Sensor Record Created')
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);


			});
			// Redirect after save
			/*
			devicesensor.$save(function(response) {
				//$location.path('devicesensors/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.sensorname_c = '';
					$scope.sensortype_c = '';
					$scope.parentdeviceId = '';
					$scope.channel_c = '';
				$scope.showView('view',$scope.currentSelectedSensor);

				$mdToast.show(
					$mdToast.simple()
						.content('Sensor Record Created')
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				$mdToast.show(
					$mdToast.simple()
						.content('Error '+ $scope.error)
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);
			});*/
		};

		$scope.connectedSensorTabSelected = function()
		{

			alert('Youve selected connected sensors');
		};

		$scope.removeSensor = function(devicesensor)
		{
			$scope.device.sensors.splice( $scope.device.sensors.indexOf(devicesensor), 1 );
			$scope.device.$update(function () {

				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);
				if($scope.device.sensors){
					$scope.currentSelectedSensor = $scope.device.sensors[0];
					$scope.showView('edit',$scope.currentSelectedSensor);
				}

				//$location.path('devices/' + device._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		$scope.createSensorAlert = function(){

			var newDeviceSensorAlert = {
				name: this.alertname_c
			};

			console.log('Alert Details'+newDeviceSensorAlert);
			newDeviceSensorAlert.alarmactions = [];

			$scope.showAlertView('editAlert',newDeviceSensorAlert);


			if($scope.currentSelectedSensor.sensoralerts){
				$scope.currentSelectedSensor.sensoralerts.push(newDeviceSensorAlert);

			}
			else{
				$scope.currentSelectedSensor.sensoralerts = [];
				$scope.currentSelectedSensor.sensoralerts.push(newDeviceSensorAlert);
			}
			$scope.device.$update(function (){



				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);
			});
		};

		$scope.removeSensorAlert = function(alert){
			console.log(alert);
			console.log($scope.currentSelectedSensor.sensoralerts);
			$scope.currentSelectedSensor.sensoralerts.id(alert._id).remove();
			$scope.device.save(function(err){

			});
		};

		$scope.createAlertAction = function()
		{
			var newAlertAction = {

				name: this.alertaction_name_c,
				actiontype: this.alertaction_actiontype_c,
				thresholdvaluemin:this.alertaction_thresholdvaluemin_c,
				thresholdvaluemax: this.alertaction_thresholdvaluemax_c,
				sendonclear: this.alertaction_sendonclear_c
			};

			//$scope.showAlertActionView();
			if($scope.currentSelectedSensorAlert.alertactions)
			{
				$scope.currentSelectedSensorAlert.alertactions.push(newAlertAction);
			}
			else{
				$scope.currentSelectedSensorAlert.alertactions = [];
				$scope.currentSelectedSensorAlert.alertactions.push(newAlertAction);

			}

			$scope.device.$update(function(){
				$mdToast.show(
					$mdToast.simple()
						.content('Device Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
			);

			});
		};

		$scope.updateDeviceSensor = function()
		{
			var deviceSensor = $scope.currentSelectedSensor;

			deviceSensor.$update(function() {
				//$location.path('devices/' + device._id);
				$mdToast.show(
					$mdToast.simple()
						.content('Device Sensor Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		$scope.updateRecord = function()
		{


			$scope.device.$update(function() {
				//$location.path('devices/' + device._id);
				$mdToast.show(
					$mdToast.simple()
						.content('Record Updated')
						.position($scope.getToastPosition())
						.theme('success-toast')
						.hideDelay(3000)
				);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.connectedSensorsTabSelected = function () {

			if($scope.device.sensors){
				$scope.currentSelectedSensor = $scope.device.sensors[0];

				$scope.showView('edit',$scope.currentSelectedSensor);
			}


		};

		$scope.sensorsAlertsTabSelected = function () {

			if($scope.currentSelectedSensor.sensoralerts){
				$scope.currentSelectedSensorAlert = $scope.currentSelectedSensor.sensoralerts[0];

				$scope.showAlertView('editAlert',$scope.currentSelectedSensorAlert);
			}

		};

	}
]);

'use strict';

angular.module('devices').filter('devicesensorsfilter', [
	function() {
		return function(input) {
			// Clientsfilter directive logic
			// ...

			return input.deviceId.match(/^Ma/) ? true : false;
		};
	}
]);

/**
 * Created by George on 11/6/2015.
 */
'use strict';

angular.module('devices').filter('mydevicesfilter', [
    function() {
        return function(input) {
            // Clientsfilter directive logic
            // ...

            return input.deviceId.match(/^Ma/) ? true : false;
        };
    }
]);

'use strict';

//Devices service used to communicate Devices REST endpoints

angular.module('devices').factory('Devices', ['$resource',
	function($resource) {
		return $resource('devices/:deviceId', { deviceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
/**
 * Created by George on 9/17/2015.
 */
'use strict';
//Devices Sensor service used to communicate Devices sensors REST endpoints

angular.module('devices').factory('DeviceSensor', ['$resource',
    function($resource) {
        return $resource('devicesensor/:sensId', { sensId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

//Devices service used to communicate Devices REST endpoints

angular.module('devices').factory('MyDevices', ['$resource',
	function($resource) {
		return $resource('mydevices/:deviceId', { deviceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

//Setting up route
angular.module('devicesensoralarmactions').config(['$stateProvider',
	function($stateProvider) {
		// Devicesensoralarmactions state routing
		$stateProvider.
		state('listDevicesensoralarmactions', {
			url: '/devicesensoralarmactions',
			templateUrl: 'modules/devicesensoralarmactions/views/list-devicesensoralarmactions.client.view.html'
		}).
		state('createDevicesensoralarmaction', {
			url: '/devicesensoralarmactions/create',
			templateUrl: 'modules/devicesensoralarmactions/views/create-devicesensoralarmaction.client.view.html'
		}).
		state('viewDevicesensoralarmaction', {
			url: '/devicesensoralarmactions/:devicesensoralarmactionId',
			templateUrl: 'modules/devicesensoralarmactions/views/view-devicesensoralarmaction.client.view.html'
		}).
		state('editDevicesensoralarmaction', {
			url: '/devicesensoralarmactions/:devicesensoralarmactionId/edit',
			templateUrl: 'modules/devicesensoralarmactions/views/edit-devicesensoralarmaction.client.view.html'
		});
	}
]);
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
'use strict';

//Devicesensoralarmactions service used to communicate Devicesensoralarmactions REST endpoints
angular.module('devicesensoralarmactions').factory('Devicesensoralarmactions', ['$resource',
	function($resource) {
		return $resource('devicesensoralarmactions/:devicesensoralarmactionId', { devicesensoralarmactionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('devicesensoralerts').config(['$stateProvider',
	function($stateProvider) {
		// Devicesensoralerts state routing
		$stateProvider.
		state('listDevicesensoralerts', {
			url: '/devicesensoralerts',
			templateUrl: 'modules/devicesensoralerts/views/list-devicesensoralerts.client.view.html'
		}).
		state('createDevicesensoralert', {
			url: '/devicesensoralerts/create',
			templateUrl: 'modules/devicesensoralerts/views/create-devicesensoralert.client.view.html'
		}).
		state('viewDevicesensoralert', {
			url: '/devicesensoralerts/:devicesensoralertId',
			templateUrl: 'modules/devicesensoralerts/views/view-devicesensoralert.client.view.html'
		}).
		state('editDevicesensoralert', {
			url: '/devicesensoralerts/:devicesensoralertId/edit',
			templateUrl: 'modules/devicesensoralerts/views/edit-devicesensoralert.client.view.html'
		});
	}
]);
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

'use strict';

//Devicesensoralerts service used to communicate Devicesensoralerts REST endpoints
angular.module('devicesensoralerts').factory('Devicesensoralerts', ['$resource',
	function($resource) {
		return $resource('devicesensoralerts/:devicesensoralertId', { devicesensoralertId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('devicesensors').config(['$stateProvider',
	function($stateProvider) {
		// Devicesensors state routing
		$stateProvider.
		state('listDevicesensors', {
			url: '/devicesensors',
			templateUrl: 'modules/devicesensors/views/list-devicesensors.client.view.html'
		}).
		state('createDevicesensor', {
			url: '/devicesensors/create',
			templateUrl: 'modules/devicesensors/views/create-devicesensor.client.view.html'
		}).
		state('viewDevicesensor', {
			url: '/devicesensors/:devicesensorId',
			templateUrl: 'modules/devicesensors/views/view-devicesensor.client.view.html'
		}).
		state('editDevicesensor', {
			url: '/devicesensors/:devicesensorId/edit',
			templateUrl: 'modules/devicesensors/views/edit-devicesensor.client.view.html'
		});
	}
]);
'use strict';

// Devicesensors controller
angular.module('devicesensors').controller('DevicesensorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Devicesensors','$mdToast',
	function($scope, $stateParams, $location, Authentication, Devicesensors,$mdToast) {
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
'use strict';

//Devicesensors service used to communicate Devicesensors REST endpoints
angular.module('devicesensors').factory('Devicesensors', ['$resource',
	function($resource) {
		return $resource('devicesensors/:devicesensorId', { devicesensorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('notifications').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Notifications', 'notifications', 'dropdown', '/notifications(/create)?');
		Menus.addSubMenuItem('topbar', 'notifications', 'List Notifications', 'notifications');
		Menus.addSubMenuItem('topbar', 'notifications', 'New Notification', 'notifications/create');
	}
]);
'use strict';

//Setting up route
angular.module('notifications').config(['$stateProvider',
	function($stateProvider) {
		// Notifications state routing
		$stateProvider.
		state('listNotifications', {
			url: '/notifications',
			templateUrl: 'modules/notifications/views/list-notifications.client.view.html'
		}).
		state('createNotification', {
			url: '/notifications/create',
			templateUrl: 'modules/notifications/views/create-notification.client.view.html'
		}).
		state('viewNotification', {
			url: '/notifications/:notificationId',
			templateUrl: 'modules/notifications/views/view-notification.client.view.html'
		}).
		state('editNotification', {
			url: '/notifications/:notificationId/edit',
			templateUrl: 'modules/notifications/views/edit-notification.client.view.html'
		});
	}
]);
'use strict';

// Notifications controller
angular.module('notifications').controller('NotificationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Notifications',
	function($scope, $stateParams, $location, Authentication, Notifications) {
		$scope.authentication = Authentication;

		// Create new Notification
		$scope.create = function() {
			// Create new Notification object
			var notification = new Notifications ({
				name: this.name
			});

			// Redirect after save
			notification.$save(function(response) {
				$location.path('notifications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Notification
		$scope.remove = function(notification) {
			if ( notification ) { 
				notification.$remove();

				for (var i in $scope.notifications) {
					if ($scope.notifications [i] === notification) {
						$scope.notifications.splice(i, 1);
					}
				}
			} else {
				$scope.notification.$remove(function() {
					$location.path('notifications');
				});
			}
		};

		// Update existing Notification
		$scope.update = function() {
			var notification = $scope.notification;

			notification.$update(function() {
				$location.path('notifications/' + notification._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Notifications
		$scope.find = function() {
			$scope.notifications = Notifications.query();
		};

		// Find existing Notification
		$scope.findOne = function() {
			$scope.notification = Notifications.get({ 
				notificationId: $stateParams.notificationId
			});
		};
	}
]);
'use strict';

//Notifications service used to communicate Notifications REST endpoints
angular.module('notifications').factory('Notifications', ['$resource',
	function($resource) {
		return $resource('notifications/:notificationId', { notificationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('readings').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Readings', 'readings', 'dropdown', '/readings(/create)?');
		Menus.addSubMenuItem('topbar', 'readings', 'List Readings', 'readings');
		Menus.addSubMenuItem('topbar', 'readings', 'New Reading', 'readings/create');
	}
]);
'use strict';

//Setting up route
angular.module('readings').config(['$stateProvider',
	function($stateProvider) {
		// Readings state routing
		$stateProvider.
		state('listReadings', {
			url: '/readings',
			templateUrl: 'modules/readings/views/list-readings.client.view.html'
		}).
		state('createReading', {
			url: '/readings/create',
			templateUrl: 'modules/readings/views/create-reading.client.view.html'
		}).
		state('viewReading', {
			url: '/readings/:readingId',
			templateUrl: 'modules/readings/views/view-reading.client.view.html'
		}).
		state('editReading', {
			url: '/readings/:readingId/edit',
			templateUrl: 'modules/readings/views/edit-reading.client.view.html'
		});
	}
]);
'use strict';

// Readings controller
angular.module('readings').controller('ReadingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Readings',
	function($scope, $stateParams, $location, Authentication, Readings) {
		$scope.authentication = Authentication;

		// Create new Reading
		$scope.create = function() {
			// Create new Reading object
			var reading = new Readings ({
				name: this.name
			});

			// Redirect after save
			reading.$save(function(response) {
				$location.path('readings/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Reading
		$scope.remove = function(reading) {
			if ( reading ) { 
				reading.$remove();

				for (var i in $scope.readings) {
					if ($scope.readings [i] === reading) {
						$scope.readings.splice(i, 1);
					}
				}
			} else {
				$scope.reading.$remove(function() {
					$location.path('readings');
				});
			}
		};

		// Update existing Reading
		$scope.update = function() {
			var reading = $scope.reading;

			reading.$update(function() {
				$location.path('readings/' + reading._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Readings
		$scope.find = function() {
			$scope.readings = Readings.query();
		};

		// Find existing Reading
		$scope.findOne = function() {
			$scope.reading = Readings.get({ 
				readingId: $stateParams.readingId
			});
		};
	}
]);
'use strict';

//Readings service used to communicate Readings REST endpoints
angular.module('readings').factory('Readings', ['$resource',
	function($resource) {
		return $resource('readings/:readingId', { readingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);



/**
 * Created by George on 9/10/2015.
 */
'use strict';

angular.module('readings').factory('Readings2', ['$resource',
    function($resource) {
        return $resource('readingsbydevice/:myId', { myId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

// Configuring the Articles module
angular.module('sensortypes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Sensortypes', 'sensortypes', 'dropdown', '/sensortypes(/create)?');
		Menus.addSubMenuItem('topbar', 'sensortypes', 'List Sensortypes', 'sensortypes');
		Menus.addSubMenuItem('topbar', 'sensortypes', 'New Sensortype', 'sensortypes/create');
	}
]);
'use strict';

//Setting up route
angular.module('sensortypes').config(['$stateProvider',
	function($stateProvider) {
		// Sensortypes state routing
		$stateProvider.
		state('listSensortypes', {
			url: '/sensortypes',
			templateUrl: 'modules/sensortypes/views/list-sensortypes.client.view.html'
		}).
		state('createSensortype', {
			url: '/sensortypes/create',
			templateUrl: 'modules/sensortypes/views/create-sensortype.client.view.html'
		}).
		state('viewSensortype', {
			url: '/sensortypes/:sensortypeId',
			templateUrl: 'modules/sensortypes/views/view-sensortype.client.view.html'
		}).
		state('editSensortype', {
			url: '/sensortypes/:sensortypeId/edit',
			templateUrl: 'modules/sensortypes/views/edit-sensortype.client.view.html'
		});
	}
]);
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
'use strict';

//Sensortypes service used to communicate Sensortypes REST endpoints
angular.module('sensortypes').factory('Sensortypes', ['$resource',
	function($resource) {
		return $resource('sensortypes/:sensortypeId', { sensortypeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('softwareproductkeys').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Softwareproductkeys', 'softwareproductkeys', 'dropdown', '/softwareproductkeys(/create)?');
		Menus.addSubMenuItem('topbar', 'softwareproductkeys', 'List Softwareproductkeys', 'softwareproductkeys');
		Menus.addSubMenuItem('topbar', 'softwareproductkeys', 'New Softwareproductkey', 'softwareproductkeys/create');
	}
]);
'use strict';

//Setting up route
angular.module('softwareproductkeys').config(['$stateProvider',
	function($stateProvider) {
		// Softwareproductkeys state routing
		$stateProvider.
		state('listSoftwareproductkeys', {
			url: '/softwareproductkeys',
			templateUrl: 'modules/softwareproductkeys/views/list-softwareproductkeys.client.view.html'
		}).
		state('createSoftwareproductkey', {
			url: '/softwareproductkeys/create',
			templateUrl: 'modules/softwareproductkeys/views/create-softwareproductkey.client.view.html'
		}).
		state('viewSoftwareproductkey', {
			url: '/softwareproductkeys/:softwareproductkeyId',
			templateUrl: 'modules/softwareproductkeys/views/view-softwareproductkey.client.view.html'
		}).
		state('editSoftwareproductkey', {
			url: '/softwareproductkeys/:softwareproductkeyId/edit',
			templateUrl: 'modules/softwareproductkeys/views/edit-softwareproductkey.client.view.html'
		});
	}
]);
'use strict';

// Softwareproductkeys controller
angular.module('softwareproductkeys').controller('SoftwareproductkeysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Softwareproductkeys',
	function($scope, $stateParams, $location, Authentication, Softwareproductkeys) {
		$scope.authentication = Authentication;

		// Create new Softwareproductkey
		$scope.create = function() {
			// Create new Softwareproductkey object
			var softwareproductkey = new Softwareproductkeys ({
				name: this.name
			});

			// Redirect after save
			softwareproductkey.$save(function(response) {
				$location.path('softwareproductkeys/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Softwareproductkey
		$scope.remove = function(softwareproductkey) {
			if ( softwareproductkey ) { 
				softwareproductkey.$remove();

				for (var i in $scope.softwareproductkeys) {
					if ($scope.softwareproductkeys [i] === softwareproductkey) {
						$scope.softwareproductkeys.splice(i, 1);
					}
				}
			} else {
				$scope.softwareproductkey.$remove(function() {
					$location.path('softwareproductkeys');
				});
			}
		};

		// Update existing Softwareproductkey
		$scope.update = function() {
			var softwareproductkey = $scope.softwareproductkey;

			softwareproductkey.$update(function() {
				$location.path('softwareproductkeys/' + softwareproductkey._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Softwareproductkeys
		$scope.find = function() {
			$scope.softwareproductkeys = Softwareproductkeys.query();
		};

		// Find existing Softwareproductkey
		$scope.findOne = function() {
			$scope.softwareproductkey = Softwareproductkeys.get({ 
				softwareproductkeyId: $stateParams.softwareproductkeyId
			});
		};
	}
]);
'use strict';

//Softwareproductkeys service used to communicate Softwareproductkeys REST endpoints
angular.module('softwareproductkeys').factory('Softwareproductkeys', ['$resource',
	function($resource) {
		return $resource('softwareproductkeys/:softwareproductkeyId', { softwareproductkeyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('softwareproducts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Softwareproducts', 'softwareproducts', 'dropdown', '/softwareproducts(/create)?');
		Menus.addSubMenuItem('topbar', 'softwareproducts', 'List Softwareproducts', 'softwareproducts');
		Menus.addSubMenuItem('topbar', 'softwareproducts', 'New Softwareproduct', 'softwareproducts/create');
	}
]);
'use strict';

//Setting up route
angular.module('softwareproducts').config(['$stateProvider',
	function($stateProvider) {
		// Softwareproducts state routing
		$stateProvider.
		state('listSoftwareproducts', {
			url: '/softwareproducts',
			templateUrl: 'modules/softwareproducts/views/list-softwareproducts.client.view.html'
		}).
		state('createSoftwareproduct', {
			url: '/softwareproducts/create',
			templateUrl: 'modules/softwareproducts/views/create-softwareproduct.client.view.html'
		}).
		state('viewSoftwareproduct', {
			url: '/softwareproducts/:softwareproductId',
			templateUrl: 'modules/softwareproducts/views/view-softwareproduct.client.view.html'
		}).
		state('editSoftwareproduct', {
			url: '/softwareproducts/:softwareproductId/edit',
			templateUrl: 'modules/softwareproducts/views/edit-softwareproduct.client.view.html'
		});
	}
]);
'use strict';

// Softwareproducts controller
angular.module('softwareproducts').controller('SoftwareproductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Softwareproducts',
	function($scope, $stateParams, $location, Authentication, Softwareproducts) {
		$scope.authentication = Authentication;

		// Create new Softwareproduct
		$scope.create = function() {
			// Create new Softwareproduct object
			var softwareproduct = new Softwareproducts ({
				name: this.name,
				description : this.description
			});

			// Redirect after save
			softwareproduct.$save(function(response) {
				$location.path('softwareproducts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Softwareproduct
		$scope.remove = function(softwareproduct) {
			if ( softwareproduct ) { 
				softwareproduct.$remove();

				for (var i in $scope.softwareproducts) {
					if ($scope.softwareproducts [i] === softwareproduct) {
						$scope.softwareproducts.splice(i, 1);
					}
				}
			} else {
				$scope.softwareproduct.$remove(function() {
					$location.path('softwareproducts');
				});
			}
		};

		// Update existing Softwareproduct
		$scope.update = function() {
			var softwareproduct = $scope.softwareproduct;

			softwareproduct.$update(function() {
				$location.path('softwareproducts/' + softwareproduct._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Softwareproducts
		$scope.find = function() {
			$scope.softwareproducts = Softwareproducts.query();
		};

		// Find existing Softwareproduct
		$scope.findOne = function() {
			$scope.softwareproduct = Softwareproducts.get({ 
				softwareproductId: $stateParams.softwareproductId
			});
		};
	}
]);

'use strict';

//Softwareproducts service used to communicate Softwareproducts REST endpoints
angular.module('softwareproducts').factory('Softwareproducts', ['$resource',
	function($resource) {
		return $resource('softwareproducts/:softwareproductId', { softwareproductId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('softwareproductversions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Softwareproductversions', 'softwareproductversions', 'dropdown', '/softwareproductversions(/create)?');
		Menus.addSubMenuItem('topbar', 'softwareproductversions', 'List Softwareproductversions', 'softwareproductversions');
		Menus.addSubMenuItem('topbar', 'softwareproductversions', 'New Softwareproductversion', 'softwareproductversions/create');
	}
]);
'use strict';

//Setting up route
angular.module('softwareproductversions').config(['$stateProvider',
	function($stateProvider) {
		// Softwareproductversions state routing
		$stateProvider.
		state('listSoftwareproductversions', {
			url: '/softwareproductversions',
			templateUrl: 'modules/softwareproductversions/views/list-softwareproductversions.client.view.html'
		}).
		state('createSoftwareproductversion', {
			url: '/softwareproductversions/create',
			templateUrl: 'modules/softwareproductversions/views/create-softwareproductversion.client.view.html'
		}).
		state('viewSoftwareproductversion', {
			url: '/softwareproductversions/:softwareproductversionId',
			templateUrl: 'modules/softwareproductversions/views/view-softwareproductversion.client.view.html'
		}).
		state('editSoftwareproductversion', {
			url: '/softwareproductversions/:softwareproductversionId/edit',
			templateUrl: 'modules/softwareproductversions/views/edit-softwareproductversion.client.view.html'
		});
	}
]);
'use strict';

// Softwareproductversions controller
angular.module('softwareproductversions').controller('SoftwareproductversionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Softwareproductversions',
	function($scope, $stateParams, $location, Authentication, Softwareproductversions) {
		$scope.authentication = Authentication;

		// Create new Softwareproductversion
		$scope.create = function() {
			// Create new Softwareproductversion object
			var softwareproductversion = new Softwareproductversions ({
				name: this.name
			});

			// Redirect after save
			softwareproductversion.$save(function(response) {
				$location.path('softwareproductversions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Softwareproductversion
		$scope.remove = function(softwareproductversion) {
			if ( softwareproductversion ) { 
				softwareproductversion.$remove();

				for (var i in $scope.softwareproductversions) {
					if ($scope.softwareproductversions [i] === softwareproductversion) {
						$scope.softwareproductversions.splice(i, 1);
					}
				}
			} else {
				$scope.softwareproductversion.$remove(function() {
					$location.path('softwareproductversions');
				});
			}
		};

		// Update existing Softwareproductversion
		$scope.update = function() {
			var softwareproductversion = $scope.softwareproductversion;

			softwareproductversion.$update(function() {
				$location.path('softwareproductversions/' + softwareproductversion._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Softwareproductversions
		$scope.find = function() {
			$scope.softwareproductversions = Softwareproductversions.query();
		};

		// Find existing Softwareproductversion
		$scope.findOne = function() {
			$scope.softwareproductversion = Softwareproductversions.get({ 
				softwareproductversionId: $stateParams.softwareproductversionId
			});
		};
	}
]);
'use strict';

//Softwareproductversions service used to communicate Softwareproductversions REST endpoints
angular.module('softwareproductversions').factory('Softwareproductversions', ['$resource',
	function($resource) {
		return $resource('softwareproductversions/:softwareproductversionId', { softwareproductversionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('systemadministration').config(['$stateProvider',
	function($stateProvider) {
		// Systemadministration state routing
		$stateProvider.
		state('systemadministration', {
			url: '/systemadministration',
			templateUrl: 'modules/systemadministration/views/systemadministration.client.view.html'
		});
	}
]);
'use strict';

angular.module('systemadministration').controller('SystemadministrationController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
	}
]);
'use strict';

//Setting up route
angular.module('useradministration').config(['$stateProvider',
	function($stateProvider) {
		// Useradministration state routing
		$stateProvider.
		state('useradministration', {
			url: '/useradministration',
			templateUrl: 'modules/useradministration/views/useradministration.client.view.html'
		});
	}
]);
'use strict';

angular.module('useradministration').controller('UseradministrationController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
	}
]);
'use strict';

//Setting up route
angular.module('userroles').config(['$stateProvider',
	function($stateProvider) {
		// Userroles state routing
		$stateProvider.
		state('listUserroles', {
			url: '/userroles',
			templateUrl: 'modules/userroles/views/list-userroles.client.view.html'
		}).
		state('createUserrole', {
			url: '/userroles/create',
			templateUrl: 'modules/userroles/views/create-userrole.client.view.html'
		}).
		state('viewUserrole', {
			url: '/userroles/:userroleId',
			templateUrl: 'modules/userroles/views/view-userrole.client.view.html'
		}).
		state('editUserrole', {
			url: '/userroles/:userroleId/edit',
			templateUrl: 'modules/userroles/views/edit-userrole.client.view.html'
		});
	}
]);
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
'use strict';

//Userroles service used to communicate Userroles REST endpoints
angular.module('userroles').factory('Userroles', ['$resource',
	function($resource) {
		return $resource('userroles/:userroleId', { userroleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		}).
		state('listUsers', {
			url: '/users',
			templateUrl: 'modules/users/views/manage/list-users.client.view.html',
			data:{
				displayName:'Users'
			}
		});
	}
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

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
                controller: ["$modalInstance", "$scope", "user", function($modalInstance,$scope,user){
                    /*$scope.device = deviceOnEdit;

                    var resultP = Devicesensors.query();
                    var devId = $scope.device._id;
                    $scope.connectedSensors = resultP;

                    var resForDeviceSensorAlerts = Devicesensoralerts.query();
                    $scope.deviceSensorAlerts = resForDeviceSensorAlerts;*/

                    $scope.ok = function () {
                        $modalInstance.close(user);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                }],
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

    }
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);


/**
 * Created by George on 9/11/2015.
 */
'use strict';

angular.module('users').factory('ClientsUsers', ['$resource',
    function($resource) {
        return $resource('clientsusers/:clientId1', { clientId1: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

// Configuring the Articles module
angular.module('vendors').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Vendors', 'vendors', 'dropdown', '/vendors(/create)?');
		Menus.addSubMenuItem('topbar', 'vendors', 'List Vendors', 'vendors');
		Menus.addSubMenuItem('topbar', 'vendors', 'New Vendor', 'vendors/create');
	}
]);
'use strict';

//Setting up route
angular.module('vendors').config(['$stateProvider',
	function($stateProvider) {
		// Vendors state routing
		$stateProvider.
		state('listVendors', {
			url: '/vendors',
			templateUrl: 'modules/vendors/views/list-vendors.client.view.html'
		}).
		state('createVendor', {
			url: '/vendors/create',
			templateUrl: 'modules/vendors/views/create-vendor.client.view.html'
		}).
		state('viewVendor', {
			url: '/vendors/:vendorId',
			templateUrl: 'modules/vendors/views/view-vendor.client.view.html'
		}).
		state('editVendor', {
			url: '/vendors/:vendorId/edit',
			templateUrl: 'modules/vendors/views/edit-vendor.client.view.html'
		});
	}
]);
'use strict';

// Vendors controller
angular.module('vendors').controller('VendorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vendors',
	function($scope, $stateParams, $location, Authentication, Vendors) {
		$scope.authentication = Authentication;
		$scope.vendorsClients = '';

		// Create new Vendor
		$scope.create = function() {
			// Create new Vendor object
			var vendor = new Vendors ({
				name: this.name
			});

			// Redirect after save
			vendor.$save(function(response) {
				$location.path('vendors/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vendor
		$scope.remove = function(vendor) {
			if ( vendor ) { 
				vendor.$remove();

				for (var i in $scope.vendors) {
					if ($scope.vendors [i] === vendor) {
						$scope.vendors.splice(i, 1);
					}
				}
			} else {
				$scope.vendor.$remove(function() {
					$location.path('vendors');
				});
			}
		};

		// Update existing Vendor
		$scope.update = function() {
			var vendor = $scope.vendor;

			vendor.$update(function() {
				$location.path('vendors/' + vendor._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vendors
		$scope.find = function() {
			$scope.vendors = Vendors.query();
		};

		// Find existing Vendor
		$scope.findOne = function() {
			$scope.vendor = Vendors.get({ 
				vendorId: $stateParams.vendorId
			});
		};
	}
]);

'use strict';

//Vendors service used to communicate Vendors REST endpoints
angular.module('vendors').factory('Vendors', ['$resource',
	function($resource) {
		return $resource('vendors/:vendorId', { vendorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);