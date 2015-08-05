'use strict';

(function() {
	// Softwareproductversions Controller Spec
	describe('Softwareproductversions Controller Tests', function() {
		// Initialize global variables
		var SoftwareproductversionsController,
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

			// Initialize the Softwareproductversions controller.
			SoftwareproductversionsController = $controller('SoftwareproductversionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Softwareproductversion object fetched from XHR', inject(function(Softwareproductversions) {
			// Create sample Softwareproductversion using the Softwareproductversions service
			var sampleSoftwareproductversion = new Softwareproductversions({
				name: 'New Softwareproductversion'
			});

			// Create a sample Softwareproductversions array that includes the new Softwareproductversion
			var sampleSoftwareproductversions = [sampleSoftwareproductversion];

			// Set GET response
			$httpBackend.expectGET('softwareproductversions').respond(sampleSoftwareproductversions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.softwareproductversions).toEqualData(sampleSoftwareproductversions);
		}));

		it('$scope.findOne() should create an array with one Softwareproductversion object fetched from XHR using a softwareproductversionId URL parameter', inject(function(Softwareproductversions) {
			// Define a sample Softwareproductversion object
			var sampleSoftwareproductversion = new Softwareproductversions({
				name: 'New Softwareproductversion'
			});

			// Set the URL parameter
			$stateParams.softwareproductversionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/softwareproductversions\/([0-9a-fA-F]{24})$/).respond(sampleSoftwareproductversion);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.softwareproductversion).toEqualData(sampleSoftwareproductversion);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Softwareproductversions) {
			// Create a sample Softwareproductversion object
			var sampleSoftwareproductversionPostData = new Softwareproductversions({
				name: 'New Softwareproductversion'
			});

			// Create a sample Softwareproductversion response
			var sampleSoftwareproductversionResponse = new Softwareproductversions({
				_id: '525cf20451979dea2c000001',
				name: 'New Softwareproductversion'
			});

			// Fixture mock form input values
			scope.name = 'New Softwareproductversion';

			// Set POST response
			$httpBackend.expectPOST('softwareproductversions', sampleSoftwareproductversionPostData).respond(sampleSoftwareproductversionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Softwareproductversion was created
			expect($location.path()).toBe('/softwareproductversions/' + sampleSoftwareproductversionResponse._id);
		}));

		it('$scope.update() should update a valid Softwareproductversion', inject(function(Softwareproductversions) {
			// Define a sample Softwareproductversion put data
			var sampleSoftwareproductversionPutData = new Softwareproductversions({
				_id: '525cf20451979dea2c000001',
				name: 'New Softwareproductversion'
			});

			// Mock Softwareproductversion in scope
			scope.softwareproductversion = sampleSoftwareproductversionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/softwareproductversions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/softwareproductversions/' + sampleSoftwareproductversionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid softwareproductversionId and remove the Softwareproductversion from the scope', inject(function(Softwareproductversions) {
			// Create new Softwareproductversion object
			var sampleSoftwareproductversion = new Softwareproductversions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Softwareproductversions array and include the Softwareproductversion
			scope.softwareproductversions = [sampleSoftwareproductversion];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/softwareproductversions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSoftwareproductversion);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.softwareproductversions.length).toBe(0);
		}));
	});
}());