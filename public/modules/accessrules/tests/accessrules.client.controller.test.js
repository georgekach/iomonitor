'use strict';

(function() {
	// Accessrules Controller Spec
	describe('Accessrules Controller Tests', function() {
		// Initialize global variables
		var AccessrulesController,
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

			// Initialize the Accessrules controller.
			AccessrulesController = $controller('AccessrulesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Accessrule object fetched from XHR', inject(function(Accessrules) {
			// Create sample Accessrule using the Accessrules service
			var sampleAccessrule = new Accessrules({
				name: 'New Accessrule'
			});

			// Create a sample Accessrules array that includes the new Accessrule
			var sampleAccessrules = [sampleAccessrule];

			// Set GET response
			$httpBackend.expectGET('accessrules').respond(sampleAccessrules);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.accessrules).toEqualData(sampleAccessrules);
		}));

		it('$scope.findOne() should create an array with one Accessrule object fetched from XHR using a accessruleId URL parameter', inject(function(Accessrules) {
			// Define a sample Accessrule object
			var sampleAccessrule = new Accessrules({
				name: 'New Accessrule'
			});

			// Set the URL parameter
			$stateParams.accessruleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/accessrules\/([0-9a-fA-F]{24})$/).respond(sampleAccessrule);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.accessrule).toEqualData(sampleAccessrule);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Accessrules) {
			// Create a sample Accessrule object
			var sampleAccessrulePostData = new Accessrules({
				name: 'New Accessrule'
			});

			// Create a sample Accessrule response
			var sampleAccessruleResponse = new Accessrules({
				_id: '525cf20451979dea2c000001',
				name: 'New Accessrule'
			});

			// Fixture mock form input values
			scope.name = 'New Accessrule';

			// Set POST response
			$httpBackend.expectPOST('accessrules', sampleAccessrulePostData).respond(sampleAccessruleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Accessrule was created
			expect($location.path()).toBe('/accessrules/' + sampleAccessruleResponse._id);
		}));

		it('$scope.update() should update a valid Accessrule', inject(function(Accessrules) {
			// Define a sample Accessrule put data
			var sampleAccessrulePutData = new Accessrules({
				_id: '525cf20451979dea2c000001',
				name: 'New Accessrule'
			});

			// Mock Accessrule in scope
			scope.accessrule = sampleAccessrulePutData;

			// Set PUT response
			$httpBackend.expectPUT(/accessrules\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/accessrules/' + sampleAccessrulePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid accessruleId and remove the Accessrule from the scope', inject(function(Accessrules) {
			// Create new Accessrule object
			var sampleAccessrule = new Accessrules({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Accessrules array and include the Accessrule
			scope.accessrules = [sampleAccessrule];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/accessrules\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAccessrule);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.accessrules.length).toBe(0);
		}));
	});
}());