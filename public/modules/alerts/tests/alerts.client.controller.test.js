'use strict';

(function() {
	// Alerts Controller Spec
	describe('Alerts Controller Tests', function() {
		// Initialize global variables
		var AlertsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Alerts controller.
			AlertsController = $controller('AlertsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Alert object fetched from XHR', inject(function(Alerts) {
			// Create sample Alert using the Alerts service
			var sampleAlert = new Alerts({
				name: 'New Alert'
			});

			// Create a sample Alerts array that includes the new Alert
			var sampleAlerts = [sampleAlert];

			// Set GET response
			$httpBackend.expectGET('alerts').respond(sampleAlerts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.alerts).toEqualData(sampleAlerts);
		}));

		it('$scope.findOne() should create an array with one Alert object fetched from XHR using a alertId URL parameter', inject(function(Alerts) {
			// Define a sample Alert object
			var sampleAlert = new Alerts({
				name: 'New Alert'
			});

			// Set the URL parameter
			$stateParams.alertId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/alerts\/([0-9a-fA-F]{24})$/).respond(sampleAlert);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.alert).toEqualData(sampleAlert);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Alerts) {
			// Create a sample Alert object
			var sampleAlertPostData = new Alerts({
				name: 'New Alert'
			});

			// Create a sample Alert response
			var sampleAlertResponse = new Alerts({
				_id: '525cf20451979dea2c000001',
				name: 'New Alert'
			});

			// Fixture mock form input values
			scope.name = 'New Alert';

			// Set POST response
			$httpBackend.expectPOST('alerts', sampleAlertPostData).respond(sampleAlertResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Alert was created
			expect($location.path()).toBe('/alerts/' + sampleAlertResponse._id);
		}));

		it('$scope.update() should update a valid Alert', inject(function(Alerts) {
			// Define a sample Alert put data
			var sampleAlertPutData = new Alerts({
				_id: '525cf20451979dea2c000001',
				name: 'New Alert'
			});

			// Mock Alert in scope
			scope.alert = sampleAlertPutData;

			// Set PUT response
			$httpBackend.expectPUT(/alerts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/alerts/' + sampleAlertPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid alertId and remove the Alert from the scope', inject(function(Alerts) {
			// Create new Alert object
			var sampleAlert = new Alerts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Alerts array and include the Alert
			scope.alerts = [sampleAlert];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/alerts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAlert);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.alerts.length).toBe(0);
		}));
	});
}());