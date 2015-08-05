'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Softwareproductkey = mongoose.model('Softwareproductkey');

/**
 * Globals
 */
var user, softwareproductkey;

/**
 * Unit tests
 */
describe('Softwareproductkey Model Unit Tests:', function() {
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
			softwareproductkey = new Softwareproductkey({
				name: 'Softwareproductkey Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return softwareproductkey.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			softwareproductkey.name = '';

			return softwareproductkey.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Softwareproductkey.remove().exec();
		User.remove().exec();

		done();
	});
});