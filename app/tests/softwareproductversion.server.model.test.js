'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Softwareproductversion = mongoose.model('Softwareproductversion');

/**
 * Globals
 */
var user, softwareproductversion;

/**
 * Unit tests
 */
describe('Softwareproductversion Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			softwareproductversion = new Softwareproductversion({
				name: 'Softwareproductversion Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return softwareproductversion.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			softwareproductversion.name = '';

			return softwareproductversion.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Softwareproductversion.remove().exec();
		User.remove().exec();

		done();
	});
});