'use strict';

(function() {
	// Devicesensors Controller Spec
	describe('Devicesensors Controller Tests', function() {
		// Initialize global variables
		var DevicesensorsController,
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

			// Initialize the Devicesensors controller.
			DevicesensorsController = $controller('DevicesensorsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Devicesensor object fetched from XHR', inject(function(Devicesensors) {
			// Create sample Devicesensor using the Devicesensors service
			var sampleDevicesensor = new Devicesensors({
				name: 'New Devicesensor'
			});

			// Create a sample Devicesensors array that includes the new Devicesensor
			var sampleDevicesensors = [sampleDevicesensor];

			// Set GET response
			$httpBackend.expectGET('devicesensors').respond(sampleDevicesensors);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.devicesensors).toEqualData(sampleDevicesensors);
		}));

		it('$scope.findOne() should create an array with one Devicesensor object fetched from XHR using a devicesensorId URL parameter', inject(function(Devicesensors) {
			// Define a sample Devicesensor object
			var sampleDevicesensor = new Devicesensors({
				name: 'New Devicesensor'
			});

			// Set the URL parameter
			$stateParams.devicesensorId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/devicesensors\/([0-9a-fA-F]{24})$/).respond(sampleDevicesensor);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.devicesensor).toEqualData(sampleDevicesensor);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Devicesensors) {
			// Create a sample Devicesensor object
			var sampleDevicesensorPostData = new Devicesensors({
				name: 'New Devicesensor'
			});

			// Create a sample Devicesensor response
			var sampleDevicesensorResponse = new Devicesensors({
				_id: '525cf20451979dea2c000001',
				name: 'New Devicesensor'
			});

			// Fixture mock form input values
			scope.name = 'New Devicesensor';

			// Set POST response
			$httpBackend.expectPOST('devicesensors', sampleDevicesensorPostData).respond(sampleDevicesensorResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Devicesensor was created
			expect($location.path()).toBe('/devicesensors/' + sampleDevicesensorResponse._id);
		}));

		it('$scope.update() should update a valid Devicesensor', inject(function(Devicesensors) {
			// Define a sample Devicesensor put data
			var sampleDevicesensorPutData = new Devicesensors({
				_id: '525cf20451979dea2c000001',
				name: 'New Devicesensor'
			});

			// Mock Devicesensor in scope
			scope.devicesensor = sampleDevicesensorPutData;

			// Set PUT response
			$httpBackend.expectPUT(/devicesensors\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/devicesensors/' + sampleDevicesensorPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid devicesensorId and remove the Devicesensor from the scope', inject(function(Devicesensors) {
			// Create new Devicesensor object
			var sampleDevicesensor = new Devicesensors({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Devicesensors array and include the Devicesensor
			scope.devicesensors = [sampleDevicesensor];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/devicesensors\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDevicesensor);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.devicesensors.length).toBe(0);
		}));
	});
}());