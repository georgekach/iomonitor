'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'meantest';
	var applicationModuleVendorDependencies = ['ngResource','ui.bootstrap','ui.bootstrap.modal', 'ngAria' ,'ngAnimate', 'ui.router','ngMaterial','highcharts-ng','btford.socket-io','ngJustGage','openlayers-directive','angularChart','shoppinpal.mobile-menu','ngMorph','angular-intro','angularMoment'];//duscroll

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
