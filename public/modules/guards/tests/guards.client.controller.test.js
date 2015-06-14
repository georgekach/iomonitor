'use strict';

(function() {
	// Guards Controller Spec
	describe('Guards Controller Tests', function() {
		// Initialize global variables
		var GuardsController,
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

			// Initialize the Guards controller.
			GuardsController = $controller('GuardsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Guard object fetched from XHR', inject(function(Guards) {
			// Create sample Guard using the Guards service
			var sampleGuard = new Guards({
				name: 'New Guard'
			});

			// Create a sample Guards array that includes the new Guard
			var sampleGuards = [sampleGuard];

			// Set GET response
			$httpBackend.expectGET('guards').respond(sampleGuards);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.guards).toEqualData(sampleGuards);
		}));

		it('$scope.findOne() should create an array with one Guard object fetched from XHR using a guardId URL parameter', inject(function(Guards) {
			// Define a sample Guard object
			var sampleGuard = new Guards({
				name: 'New Guard'
			});

			// Set the URL parameter
			$stateParams.guardId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/guards\/([0-9a-fA-F]{24})$/).respond(sampleGuard);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.guard).toEqualData(sampleGuard);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Guards) {
			// Create a sample Guard object
			var sampleGuardPostData = new Guards({
				name: 'New Guard'
			});

			// Create a sample Guard response
			var sampleGuardResponse = new Guards({
				_id: '525cf20451979dea2c000001',
				name: 'New Guard'
			});

			// Fixture mock form input values
			scope.name = 'New Guard';

			// Set POST response
			$httpBackend.expectPOST('guards', sampleGuardPostData).respond(sampleGuardResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Guard was created
			expect($location.path()).toBe('/guards/' + sampleGuardResponse._id);
		}));

		it('$scope.update() should update a valid Guard', inject(function(Guards) {
			// Define a sample Guard put data
			var sampleGuardPutData = new Guards({
				_id: '525cf20451979dea2c000001',
				name: 'New Guard'
			});

			// Mock Guard in scope
			scope.guard = sampleGuardPutData;

			// Set PUT response
			$httpBackend.expectPUT(/guards\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/guards/' + sampleGuardPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid guardId and remove the Guard from the scope', inject(function(Guards) {
			// Create new Guard object
			var sampleGuard = new Guards({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Guards array and include the Guard
			scope.guards = [sampleGuard];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/guards\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGuard);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.guards.length).toBe(0);
		}));
	});
}());