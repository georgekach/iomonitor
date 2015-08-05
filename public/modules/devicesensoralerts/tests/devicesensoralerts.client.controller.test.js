'use strict';

(function() {
	// Devicesensoralerts Controller Spec
	describe('Devicesensoralerts Controller Tests', function() {
		// Initialize global variables
		var DevicesensoralertsController,
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

			// Initialize the Devicesensoralerts controller.
			DevicesensoralertsController = $controller('DevicesensoralertsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Devicesensoralert object fetched from XHR', inject(function(Devicesensoralerts) {
			// Create sample Devicesensoralert using the Devicesensoralerts service
			var sampleDevicesensoralert = new Devicesensoralerts({
				name: 'New Devicesensoralert'
			});

			// Create a sample Devicesensoralerts array that includes the new Devicesensoralert
			var sampleDevicesensoralerts = [sampleDevicesensoralert];

			// Set GET response
			$httpBackend.expectGET('devicesensoralerts').respond(sampleDevicesensoralerts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.devicesensoralerts).toEqualData(sampleDevicesensoralerts);
		}));

		it('$scope.findOne() should create an array with one Devicesensoralert object fetched from XHR using a devicesensoralertId URL parameter', inject(function(Devicesensoralerts) {
			// Define a sample Devicesensoralert object
			var sampleDevicesensoralert = new Devicesensoralerts({
				name: 'New Devicesensoralert'
			});

			// Set the URL parameter
			$stateParams.devicesensoralertId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/devicesensoralerts\/([0-9a-fA-F]{24})$/).respond(sampleDevicesensoralert);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.devicesensoralert).toEqualData(sampleDevicesensoralert);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Devicesensoralerts) {
			// Create a sample Devicesensoralert object
			var sampleDevicesensoralertPostData = new Devicesensoralerts({
				name: 'New Devicesensoralert'
			});

			// Create a sample Devicesensoralert response
			var sampleDevicesensoralertResponse = new Devicesensoralerts({
				_id: '525cf20451979dea2c000001',
				name: 'New Devicesensoralert'
			});

			// Fixture mock form input values
			scope.name = 'New Devicesensoralert';

			// Set POST response
			$httpBackend.expectPOST('devicesensoralerts', sampleDevicesensoralertPostData).respond(sampleDevicesensoralertResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Devicesensoralert was created
			expect($location.path()).toBe('/devicesensoralerts/' + sampleDevicesensoralertResponse._id);
		}));

		it('$scope.update() should update a valid Devicesensoralert', inject(function(Devicesensoralerts) {
			// Define a sample Devicesensoralert put data
			var sampleDevicesensoralertPutData = new Devicesensoralerts({
				_id: '525cf20451979dea2c000001',
				name: 'New Devicesensoralert'
			});

			// Mock Devicesensoralert in scope
			scope.devicesensoralert = sampleDevicesensoralertPutData;

			// Set PUT response
			$httpBackend.expectPUT(/devicesensoralerts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/devicesensoralerts/' + sampleDevicesensoralertPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid devicesensoralertId and remove the Devicesensoralert from the scope', inject(function(Devicesensoralerts) {
			// Create new Devicesensoralert object
			var sampleDevicesensoralert = new Devicesensoralerts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Devicesensoralerts array and include the Devicesensoralert
			scope.devicesensoralerts = [sampleDevicesensoralert];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/devicesensoralerts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDevicesensoralert);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.devicesensoralerts.length).toBe(0);
		}));
	});
}());