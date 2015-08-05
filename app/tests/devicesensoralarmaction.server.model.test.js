'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Devicesensoralarmaction = mongoose.model('Devicesensoralarmaction');

/**
 * Globals
 */
var user, devicesensoralarmaction;

/**
 * Unit tests
 */
describe('Devicesensoralarmaction Model Unit Tests:', function() {
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
			devicesensoralarmaction = new Devicesensoralarmaction({
				name: 'Devicesensoralarmaction Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return devicesensoralarmaction.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			devicesensoralarmaction.name = '';

			return devicesensoralarmaction.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Devicesensoralarmaction.remove().exec();
		User.remove().exec();

		done();
	});
});