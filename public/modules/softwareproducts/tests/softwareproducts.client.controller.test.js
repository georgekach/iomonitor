'use strict';

(function() {
	// Softwareproducts Controller Spec
	describe('Softwareproducts Controller Tests', function() {
		// Initialize global variables
		var SoftwareproductsController,
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

			// Initialize the Softwareproducts controller.
			SoftwareproductsController = $controller('SoftwareproductsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Softwareproduct object fetched from XHR', inject(function(Softwareproducts) {
			// Create sample Softwareproduct using the Softwareproducts service
			var sampleSoftwareproduct = new Softwareproducts({
				name: 'New Softwareproduct'
			});

			// Create a sample Softwareproducts array that includes the new Softwareproduct
			var sampleSoftwareproducts = [sampleSoftwareproduct];

			// Set GET response
			$httpBackend.expectGET('softwareproducts').respond(sampleSoftwareproducts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.softwareproducts).toEqualData(sampleSoftwareproducts);
		}));

		it('$scope.findOne() should create an array with one Softwareproduct object fetched from XHR using a softwareproductId URL parameter', inject(function(Softwareproducts) {
			// Define a sample Softwareproduct object
			var sampleSoftwareproduct = new Softwareproducts({
				name: 'New Softwareproduct'
			});

			// Set the URL parameter
			$stateParams.softwareproductId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/softwareproducts\/([0-9a-fA-F]{24})$/).respond(sampleSoftwareproduct);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.softwareproduct).toEqualData(sampleSoftwareproduct);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Softwareproducts) {
			// Create a sample Softwareproduct object
			var sampleSoftwareproductPostData = new Softwareproducts({
				name: 'New Softwareproduct'
			});

			// Create a sample Softwareproduct response
			var sampleSoftwareproductResponse = new Softwareproducts({
				_id: '525cf20451979dea2c000001',
				name: 'New Softwareproduct'
			});

			// Fixture mock form input values
			scope.name = 'New Softwareproduct';

			// Set POST response
			$httpBackend.expectPOST('softwareproducts', sampleSoftwareproductPostData).respond(sampleSoftwareproductResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Softwareproduct was created
			expect($location.path()).toBe('/softwareproducts/' + sampleSoftwareproductResponse._id);
		}));

		it('$scope.update() should update a valid Softwareproduct', inject(function(Softwareproducts) {
			// Define a sample Softwareproduct put data
			var sampleSoftwareproductPutData = new Softwareproducts({
				_id: '525cf20451979dea2c000001',
				name: 'New Softwareproduct'
			});

			// Mock Softwareproduct in scope
			scope.softwareproduct = sampleSoftwareproductPutData;

			// Set PUT response
			$httpBackend.expectPUT(/softwareproducts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/softwareproducts/' + sampleSoftwareproductPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid softwareproductId and remove the Softwareproduct from the scope', inject(function(Softwareproducts) {
			// Create new Softwareproduct object
			var sampleSoftwareproduct = new Softwareproducts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Softwareproducts array and include the Softwareproduct
			scope.softwareproducts = [sampleSoftwareproduct];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/softwareproducts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSoftwareproduct);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.softwareproducts.length).toBe(0);
		}));
	});
}());