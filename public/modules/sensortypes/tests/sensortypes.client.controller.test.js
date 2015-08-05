'use strict';

(function() {
	// Sensortypes Controller Spec
	describe('Sensortypes Controller Tests', function() {
		// Initialize global variables
		var SensortypesController,
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

			// Initialize the Sensortypes controller.
			SensortypesController = $controller('SensortypesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Sensortype object fetched from XHR', inject(function(Sensortypes) {
			// Create sample Sensortype using the Sensortypes service
			var sampleSensortype = new Sensortypes({
				name: 'New Sensortype'
			});

			// Create a sample Sensortypes array that includes the new Sensortype
			var sampleSensortypes = [sampleSensortype];

			// Set GET response
			$httpBackend.expectGET('sensortypes').respond(sampleSensortypes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sensortypes).toEqualData(sampleSensortypes);
		}));

		it('$scope.findOne() should create an array with one Sensortype object fetched from XHR using a sensortypeId URL parameter', inject(function(Sensortypes) {
			// Define a sample Sensortype object
			var sampleSensortype = new Sensortypes({
				name: 'New Sensortype'
			});

			// Set the URL parameter
			$stateParams.sensortypeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/sensortypes\/([0-9a-fA-F]{24})$/).respond(sampleSensortype);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sensortype).toEqualData(sampleSensortype);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Sensortypes) {
			// Create a sample Sensortype object
			var sampleSensortypePostData = new Sensortypes({
				name: 'New Sensortype'
			});

			// Create a sample Sensortype response
			var sampleSensortypeResponse = new Sensortypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Sensortype'
			});

			// Fixture mock form input values
			scope.name = 'New Sensortype';

			// Set POST response
			$httpBackend.expectPOST('sensortypes', sampleSensortypePostData).respond(sampleSensortypeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Sensortype was created
			expect($location.path()).toBe('/sensortypes/' + sampleSensortypeResponse._id);
		}));

		it('$scope.update() should update a valid Sensortype', inject(function(Sensortypes) {
			// Define a sample Sensortype put data
			var sampleSensortypePutData = new Sensortypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Sensortype'
			});

			// Mock Sensortype in scope
			scope.sensortype = sampleSensortypePutData;

			// Set PUT response
			$httpBackend.expectPUT(/sensortypes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/sensortypes/' + sampleSensortypePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid sensortypeId and remove the Sensortype from the scope', inject(function(Sensortypes) {
			// Create new Sensortype object
			var sampleSensortype = new Sensortypes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Sensortypes array and include the Sensortype
			scope.sensortypes = [sampleSensortype];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/sensortypes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSensortype);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.sensortypes.length).toBe(0);
		}));
	});
}());