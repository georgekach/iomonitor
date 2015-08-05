'use strict';

(function() {
	// Userroles Controller Spec
	describe('Userroles Controller Tests', function() {
		// Initialize global variables
		var UserrolesController,
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

			// Initialize the Userroles controller.
			UserrolesController = $controller('UserrolesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Userrole object fetched from XHR', inject(function(Userroles) {
			// Create sample Userrole using the Userroles service
			var sampleUserrole = new Userroles({
				name: 'New Userrole'
			});

			// Create a sample Userroles array that includes the new Userrole
			var sampleUserroles = [sampleUserrole];

			// Set GET response
			$httpBackend.expectGET('userroles').respond(sampleUserroles);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.userroles).toEqualData(sampleUserroles);
		}));

		it('$scope.findOne() should create an array with one Userrole object fetched from XHR using a userroleId URL parameter', inject(function(Userroles) {
			// Define a sample Userrole object
			var sampleUserrole = new Userroles({
				name: 'New Userrole'
			});

			// Set the URL parameter
			$stateParams.userroleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/userroles\/([0-9a-fA-F]{24})$/).respond(sampleUserrole);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.userrole).toEqualData(sampleUserrole);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Userroles) {
			// Create a sample Userrole object
			var sampleUserrolePostData = new Userroles({
				name: 'New Userrole'
			});

			// Create a sample Userrole response
			var sampleUserroleResponse = new Userroles({
				_id: '525cf20451979dea2c000001',
				name: 'New Userrole'
			});

			// Fixture mock form input values
			scope.name = 'New Userrole';

			// Set POST response
			$httpBackend.expectPOST('userroles', sampleUserrolePostData).respond(sampleUserroleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Userrole was created
			expect($location.path()).toBe('/userroles/' + sampleUserroleResponse._id);
		}));

		it('$scope.update() should update a valid Userrole', inject(function(Userroles) {
			// Define a sample Userrole put data
			var sampleUserrolePutData = new Userroles({
				_id: '525cf20451979dea2c000001',
				name: 'New Userrole'
			});

			// Mock Userrole in scope
			scope.userrole = sampleUserrolePutData;

			// Set PUT response
			$httpBackend.expectPUT(/userroles\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/userroles/' + sampleUserrolePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid userroleId and remove the Userrole from the scope', inject(function(Userroles) {
			// Create new Userrole object
			var sampleUserrole = new Userroles({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Userroles array and include the Userrole
			scope.userroles = [sampleUserrole];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/userroles\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUserrole);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.userroles.length).toBe(0);
		}));
	});
}());