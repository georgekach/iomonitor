'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Devicesensoralarmaction = mongoose.model('Devicesensoralarmaction'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, devicesensoralarmaction;

/**
 * Devicesensoralarmaction routes tests
 */
describe('Devicesensoralarmaction CRUD tests', function() {
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

		// Save a user to the test db and create new Devicesensoralarmaction
		user.save(function() {
			devicesensoralarmaction = {
				name: 'Devicesensoralarmaction Name'
			};

			done();
		});
	});

	it('should be able to save Devicesensoralarmaction instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensoralarmaction
				agent.post('/devicesensoralarmactions')
					.send(devicesensoralarmaction)
					.expect(200)
					.end(function(devicesensoralarmactionSaveErr, devicesensoralarmactionSaveRes) {
						// Handle Devicesensoralarmaction save error
						if (devicesensoralarmactionSaveErr) done(devicesensoralarmactionSaveErr);

						// Get a list of Devicesensoralarmactions
						agent.get('/devicesensoralarmactions')
							.end(function(devicesensoralarmactionsGetErr, devicesensoralarmactionsGetRes) {
								// Handle Devicesensoralarmaction save error
								if (devicesensoralarmactionsGetErr) done(devicesensoralarmactionsGetErr);

								// Get Devicesensoralarmactions list
								var devicesensoralarmactions = devicesensoralarmactionsGetRes.body;

								// Set assertions
								(devicesensoralarmactions[0].user._id).should.equal(userId);
								(devicesensoralarmactions[0].name).should.match('Devicesensoralarmaction Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Devicesensoralarmaction instance if not logged in', function(done) {
		agent.post('/devicesensoralarmactions')
			.send(devicesensoralarmaction)
			.expect(401)
			.end(function(devicesensoralarmactionSaveErr, devicesensoralarmactionSaveRes) {
				// Call the assertion callback
				done(devicesensoralarmactionSaveErr);
			});
	});

	it('should not be able to save Devicesensoralarmaction instance if no name is provided', function(done) {
		// Invalidate name field
		devicesensoralarmaction.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensoralarmaction
				agent.post('/devicesensoralarmactions')
					.send(devicesensoralarmaction)
					.expect(400)
					.end(function(devicesensoralarmactionSaveErr, devicesensoralarmactionSaveRes) {
						// Set message assertion
						(devicesensoralarmactionSaveRes.body.message).should.match('Please fill Devicesensoralarmaction name');
						
						// Handle Devicesensoralarmaction save error
						done(devicesensoralarmactionSaveErr);
					});
			});
	});

	it('should be able to update Devicesensoralarmaction instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensoralarmaction
				agent.post('/devicesensoralarmactions')
					.send(devicesensoralarmaction)
					.expect(200)
					.end(function(devicesensoralarmactionSaveErr, devicesensoralarmactionSaveRes) {
						// Handle Devicesensoralarmaction save error
						if (devicesensoralarmactionSaveErr) done(devicesensoralarmactionSaveErr);

						// Update Devicesensoralarmaction name
						devicesensoralarmaction.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Devicesensoralarmaction
						agent.put('/devicesensoralarmactions/' + devicesensoralarmactionSaveRes.body._id)
							.send(devicesensoralarmaction)
							.expect(200)
							.end(function(devicesensoralarmactionUpdateErr, devicesensoralarmactionUpdateRes) {
								// Handle Devicesensoralarmaction update error
								if (devicesensoralarmactionUpdateErr) done(devicesensoralarmactionUpdateErr);

								// Set assertions
								(devicesensoralarmactionUpdateRes.body._id).should.equal(devicesensoralarmactionSaveRes.body._id);
								(devicesensoralarmactionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Devicesensoralarmactions if not signed in', function(done) {
		// Create new Devicesensoralarmaction model instance
		var devicesensoralarmactionObj = new Devicesensoralarmaction(devicesensoralarmaction);

		// Save the Devicesensoralarmaction
		devicesensoralarmactionObj.save(function() {
			// Request Devicesensoralarmactions
			request(app).get('/devicesensoralarmactions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Devicesensoralarmaction if not signed in', function(done) {
		// Create new Devicesensoralarmaction model instance
		var devicesensoralarmactionObj = new Devicesensoralarmaction(devicesensoralarmaction);

		// Save the Devicesensoralarmaction
		devicesensoralarmactionObj.save(function() {
			request(app).get('/devicesensoralarmactions/' + devicesensoralarmactionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', devicesensoralarmaction.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Devicesensoralarmaction instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensoralarmaction
				agent.post('/devicesensoralarmactions')
					.send(devicesensoralarmaction)
					.expect(200)
					.end(function(devicesensoralarmactionSaveErr, devicesensoralarmactionSaveRes) {
						// Handle Devicesensoralarmaction save error
						if (devicesensoralarmactionSaveErr) done(devicesensoralarmactionSaveErr);

						// Delete existing Devicesensoralarmaction
						agent.delete('/devicesensoralarmactions/' + devicesensoralarmactionSaveRes.body._id)
							.send(devicesensoralarmaction)
							.expect(200)
							.end(function(devicesensoralarmactionDeleteErr, devicesensoralarmactionDeleteRes) {
								// Handle Devicesensoralarmaction error error
								if (devicesensoralarmactionDeleteErr) done(devicesensoralarmactionDeleteErr);

								// Set assertions
								(devicesensoralarmactionDeleteRes.body._id).should.equal(devicesensoralarmactionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Devicesensoralarmaction instance if not signed in', function(done) {
		// Set Devicesensoralarmaction user 
		devicesensoralarmaction.user = user;

		// Create new Devicesensoralarmaction model instance
		var devicesensoralarmactionObj = new Devicesensoralarmaction(devicesensoralarmaction);

		// Save the Devicesensoralarmaction
		devicesensoralarmactionObj.save(function() {
			// Try deleting Devicesensoralarmaction
			request(app).delete('/devicesensoralarmactions/' + devicesensoralarmactionObj._id)
			.expect(401)
			.end(function(devicesensoralarmactionDeleteErr, devicesensoralarmactionDeleteRes) {
				// Set message assertion
				(devicesensoralarmactionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Devicesensoralarmaction error error
				done(devicesensoralarmactionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Devicesensoralarmaction.remove().exec();
		done();
	});
});