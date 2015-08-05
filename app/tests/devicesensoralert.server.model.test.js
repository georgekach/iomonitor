'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Devicesensoralert = mongoose.model('Devicesensoralert');

/**
 * Globals
 */
var user, devicesensoralert;

/**
 * Unit tests
 */
describe('Devicesensoralert Model Unit Tests:', function() {
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
			devicesensoralert = new Devicesensoralert({
				name: 'Devicesensoralert Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return devicesensoralert.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			devicesensoralert.name = '';

			return devicesensoralert.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Devicesensoralert.remove().exec();
		User.remove().exec();

		done();
	});
});