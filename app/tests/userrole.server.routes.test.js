'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Userrole = mongoose.model('Userrole'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, userrole;

/**
 * Userrole routes tests
 */
describe('Userrole CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Userrole
		user.save(function() {
			userrole = {
				name: 'Userrole Name'
			};

			done();
		});
	});

	it('should be able to save Userrole instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userrole
				agent.post('/userroles')
					.send(userrole)
					.expect(200)
					.end(function(userroleSaveErr, userroleSaveRes) {
						// Handle Userrole save error
						if (userroleSaveErr) done(userroleSaveErr);

						// Get a list of Userroles
						agent.get('/userroles')
							.end(function(userrolesGetErr, userrolesGetRes) {
								// Handle Userrole save error
								if (userrolesGetErr) done(userrolesGetErr);

								// Get Userroles list
								var userroles = userrolesGetRes.body;

								// Set assertions
								(userroles[0].user._id).should.equal(userId);
								(userroles[0].name).should.match('Userrole Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Userrole instance if not logged in', function(done) {
		agent.post('/userroles')
			.send(userrole)
			.expect(401)
			.end(function(userroleSaveErr, userroleSaveRes) {
				// Call the assertion callback
				done(userroleSaveErr);
			});
	});

	it('should not be able to save Userrole instance if no name is provided', function(done) {
		// Invalidate name field
		userrole.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userrole
				agent.post('/userroles')
					.send(userrole)
					.expect(400)
					.end(function(userroleSaveErr, userroleSaveRes) {
						// Set message assertion
						(userroleSaveRes.body.message).should.match('Please fill Userrole name');
						
						// Handle Userrole save error
						done(userroleSaveErr);
					});
			});
	});

	it('should be able to update Userrole instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userrole
				agent.post('/userroles')
					.send(userrole)
					.expect(200)
					.end(function(userroleSaveErr, userroleSaveRes) {
						// Handle Userrole save error
						if (userroleSaveErr) done(userroleSaveErr);

						// Update Userrole name
						userrole.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Userrole
						agent.put('/userroles/' + userroleSaveRes.body._id)
							.send(userrole)
							.expect(200)
							.end(function(userroleUpdateErr, userroleUpdateRes) {
								// Handle Userrole update error
								if (userroleUpdateErr) done(userroleUpdateErr);

								// Set assertions
								(userroleUpdateRes.body._id).should.equal(userroleSaveRes.body._id);
								(userroleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Userroles if not signed in', function(done) {
		// Create new Userrole model instance
		var userroleObj = new Userrole(userrole);

		// Save the Userrole
		userroleObj.save(function() {
			// Request Userroles
			request(app).get('/userroles')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Userrole if not signed in', function(done) {
		// Create new Userrole model instance
		var userroleObj = new Userrole(userrole);

		// Save the Userrole
		userroleObj.save(function() {
			request(app).get('/userroles/' + userroleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', userrole.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Userrole instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userrole
				agent.post('/userroles')
					.send(userrole)
					.expect(200)
					.end(function(userroleSaveErr, userroleSaveRes) {
						// Handle Userrole save error
						if (userroleSaveErr) done(userroleSaveErr);

						// Delete existing Userrole
						agent.delete('/userroles/' + userroleSaveRes.body._id)
							.send(userrole)
							.expect(200)
							.end(function(userroleDeleteErr, userroleDeleteRes) {
								// Handle Userrole error error
								if (userroleDeleteErr) done(userroleDeleteErr);

								// Set assertions
								(userroleDeleteRes.body._id).should.equal(userroleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Userrole instance if not signed in', function(done) {
		// Set Userrole user 
		userrole.user = user;

		// Create new Userrole model instance
		var userroleObj = new Userrole(userrole);

		// Save the Userrole
		userroleObj.save(function() {
			// Try deleting Userrole
			request(app).delete('/userroles/' + userroleObj._id)
			.expect(401)
			.end(function(userroleDeleteErr, userroleDeleteRes) {
				// Set message assertion
				(userroleDeleteRes.body.message).should.match('User is not logged in');

				// Handle Userrole error error
				done(userroleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Userrole.remove().exec();
		done();
	});
});