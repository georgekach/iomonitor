'use strict';

(function() {
	// Softwareproductkeys Controller Spec
	describe('Softwareproductkeys Controller Tests', function() {
		// Initialize global variables
		var SoftwareproductkeysController,
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

			// Initialize the Softwareproductkeys controller.
			SoftwareproductkeysController = $controller('SoftwareproductkeysController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Softwareproductkey object fetched from XHR', inject(function(Softwareproductkeys) {
			// Create sample Softwareproductkey using the Softwareproductkeys service
			var sampleSoftwareproductkey = new Softwareproductkeys({
				name: 'New Softwareproductkey'
			});

			// Create a sample Softwareproductkeys array that includes the new Softwareproductkey
			var sampleSoftwareproductkeys = [sampleSoftwareproductkey];

			// Set GET response
			$httpBackend.expectGET('softwareproductkeys').respond(sampleSoftwareproductkeys);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.softwareproductkeys).toEqualData(sampleSoftwareproductkeys);
		}));

		it('$scope.findOne() should create an array with one Softwareproductkey object fetched from XHR using a softwareproductkeyId URL parameter', inject(function(Softwareproductkeys) {
			// Define a sample Softwareproductkey object
			var sampleSoftwareproductkey = new Softwareproductkeys({
				name: 'New Softwareproductkey'
			});

			// Set the URL parameter
			$stateParams.softwareproductkeyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/softwareproductkeys\/([0-9a-fA-F]{24})$/).respond(sampleSoftwareproductkey);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.softwareproductkey).toEqualData(sampleSoftwareproductkey);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Softwareproductkeys) {
			// Create a sample Softwareproductkey object
			var sampleSoftwareproductkeyPostData = new Softwareproductkeys({
				name: 'New Softwareproductkey'
			});

			// Create a sample Softwareproductkey response
			var sampleSoftwareproductkeyResponse = new Softwareproductkeys({
				_id: '525cf20451979dea2c000001',
				name: 'New Softwareproductkey'
			});

			// Fixture mock form input values
			scope.name = 'New Softwareproductkey';

			// Set POST response
			$httpBackend.expectPOST('softwareproductkeys', sampleSoftwareproductkeyPostData).respond(sampleSoftwareproductkeyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Softwareproductkey was created
			expect($location.path()).toBe('/softwareproductkeys/' + sampleSoftwareproductkeyResponse._id);
		}));

		it('$scope.update() should update a valid Softwareproductkey', inject(function(Softwareproductkeys) {
			// Define a sample Softwareproductkey put data
			var sampleSoftwareproductkeyPutData = new Softwareproductkeys({
				_id: '525cf20451979dea2c000001',
				name: 'New Softwareproductkey'
			});

			// Mock Softwareproductkey in scope
			scope.softwareproductkey = sampleSoftwareproductkeyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/softwareproductkeys\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/softwareproductkeys/' + sampleSoftwareproductkeyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid softwareproductkeyId and remove the Softwareproductkey from the scope', inject(function(Softwareproductkeys) {
			// Create new Softwareproductkey object
			var sampleSoftwareproductkey = new Softwareproductkeys({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Softwareproductkeys array and include the Softwareproductkey
			scope.softwareproductkeys = [sampleSoftwareproductkey];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/softwareproductkeys\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSoftwareproductkey);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.softwareproductkeys.length).toBe(0);
		}));
	});
}());