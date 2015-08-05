'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Devicesensoralert = mongoose.model('Devicesensoralert'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, devicesensoralert;

/**
 * Devicesensoralert routes tests
 */
describe('Devicesensoralert CRUD tests', function() {
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

		// Save a user to the test db and create new Devicesensoralert
		user.save(function() {
			devicesensoralert = {
				name: 'Devicesensoralert Name'
			};

			done();
		});
	});

	it('should be able to save Devicesensoralert instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensoralert
				agent.post('/devicesensoralerts')
					.send(devicesensoralert)
					.expect(200)
					.end(function(devicesensoralertSaveErr, devicesensoralertSaveRes) {
						// Handle Devicesensoralert save error
						if (devicesensoralertSaveErr) done(devicesensoralertSaveErr);

						// Get a list of Devicesensoralerts
						agent.get('/devicesensoralerts')
							.end(function(devicesensoralertsGetErr, devicesensoralertsGetRes) {
								// Handle Devicesensoralert save error
								if (devicesensoralertsGetErr) done(devicesensoralertsGetErr);

								// Get Devicesensoralerts list
								var devicesensoralerts = devicesensoralertsGetRes.body;

								// Set assertions
								(devicesensoralerts[0].user._id).should.equal(userId);
								(devicesensoralerts[0].name).should.match('Devicesensoralert Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Devicesensoralert instance if not logged in', function(done) {
		agent.post('/devicesensoralerts')
			.send(devicesensoralert)
			.expect(401)
			.end(function(devicesensoralertSaveErr, devicesensoralertSaveRes) {
				// Call the assertion callback
				done(devicesensoralertSaveErr);
			});
	});

	it('should not be able to save Devicesensoralert instance if no name is provided', function(done) {
		// Invalidate name field
		devicesensoralert.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensoralert
				agent.post('/devicesensoralerts')
					.send(devicesensoralert)
					.expect(400)
					.end(function(devicesensoralertSaveErr, devicesensoralertSaveRes) {
						// Set message assertion
						(devicesensoralertSaveRes.body.message).should.match('Please fill Devicesensoralert name');
						
						// Handle Devicesensoralert save error
						done(devicesensoralertSaveErr);
					});
			});
	});

	it('should be able to update Devicesensoralert instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensoralert
				agent.post('/devicesensoralerts')
					.send(devicesensoralert)
					.expect(200)
					.end(function(devicesensoralertSaveErr, devicesensoralertSaveRes) {
						// Handle Devicesensoralert save error
						if (devicesensoralertSaveErr) done(devicesensoralertSaveErr);

						// Update Devicesensoralert name
						devicesensoralert.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Devicesensoralert
						agent.put('/devicesensoralerts/' + devicesensoralertSaveRes.body._id)
							.send(devicesensoralert)
							.expect(200)
							.end(function(devicesensoralertUpdateErr, devicesensoralertUpdateRes) {
								// Handle Devicesensoralert update error
								if (devicesensoralertUpdateErr) done(devicesensoralertUpdateErr);

								// Set assertions
								(devicesensoralertUpdateRes.body._id).should.equal(devicesensoralertSaveRes.body._id);
								(devicesensoralertUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Devicesensoralerts if not signed in', function(done) {
		// Create new Devicesensoralert model instance
		var devicesensoralertObj = new Devicesensoralert(devicesensoralert);

		// Save the Devicesensoralert
		devicesensoralertObj.save(function() {
			// Request Devicesensoralerts
			request(app).get('/devicesensoralerts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Devicesensoralert if not signed in', function(done) {
		// Create new Devicesensoralert model instance
		var devicesensoralertObj = new Devicesensoralert(devicesensoralert);

		// Save the Devicesensoralert
		devicesensoralertObj.save(function() {
			request(app).get('/devicesensoralerts/' + devicesensoralertObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', devicesensoralert.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Devicesensoralert instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensoralert
				agent.post('/devicesensoralerts')
					.send(devicesensoralert)
					.expect(200)
					.end(function(devicesensoralertSaveErr, devicesensoralertSaveRes) {
						// Handle Devicesensoralert save error
						if (devicesensoralertSaveErr) done(devicesensoralertSaveErr);

						// Delete existing Devicesensoralert
						agent.delete('/devicesensoralerts/' + devicesensoralertSaveRes.body._id)
							.send(devicesensoralert)
							.expect(200)
							.end(function(devicesensoralertDeleteErr, devicesensoralertDeleteRes) {
								// Handle Devicesensoralert error error
								if (devicesensoralertDeleteErr) done(devicesensoralertDeleteErr);

								// Set assertions
								(devicesensoralertDeleteRes.body._id).should.equal(devicesensoralertSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Devicesensoralert instance if not signed in', function(done) {
		// Set Devicesensoralert user 
		devicesensoralert.user = user;

		// Create new Devicesensoralert model instance
		var devicesensoralertObj = new Devicesensoralert(devicesensoralert);

		// Save the Devicesensoralert
		devicesensoralertObj.save(function() {
			// Try deleting Devicesensoralert
			request(app).delete('/devicesensoralerts/' + devicesensoralertObj._id)
			.expect(401)
			.end(function(devicesensoralertDeleteErr, devicesensoralertDeleteRes) {
				// Set message assertion
				(devicesensoralertDeleteRes.body.message).should.match('User is not logged in');

				// Handle Devicesensoralert error error
				done(devicesensoralertDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Devicesensoralert.remove().exec();
		done();
	});
});