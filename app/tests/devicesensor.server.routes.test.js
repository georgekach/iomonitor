'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Devicesensor = mongoose.model('Devicesensor'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, devicesensor;

/**
 * Devicesensor routes tests
 */
describe('Devicesensor CRUD tests', function() {
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

		// Save a user to the test db and create new Devicesensor
		user.save(function() {
			devicesensor = {
				name: 'Devicesensor Name'
			};

			done();
		});
	});

	it('should be able to save Devicesensor instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensor
				agent.post('/devicesensors')
					.send(devicesensor)
					.expect(200)
					.end(function(devicesensorSaveErr, devicesensorSaveRes) {
						// Handle Devicesensor save error
						if (devicesensorSaveErr) done(devicesensorSaveErr);

						// Get a list of Devicesensors
						agent.get('/devicesensors')
							.end(function(devicesensorsGetErr, devicesensorsGetRes) {
								// Handle Devicesensor save error
								if (devicesensorsGetErr) done(devicesensorsGetErr);

								// Get Devicesensors list
								var devicesensors = devicesensorsGetRes.body;

								// Set assertions
								(devicesensors[0].user._id).should.equal(userId);
								(devicesensors[0].name).should.match('Devicesensor Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Devicesensor instance if not logged in', function(done) {
		agent.post('/devicesensors')
			.send(devicesensor)
			.expect(401)
			.end(function(devicesensorSaveErr, devicesensorSaveRes) {
				// Call the assertion callback
				done(devicesensorSaveErr);
			});
	});

	it('should not be able to save Devicesensor instance if no name is provided', function(done) {
		// Invalidate name field
		devicesensor.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensor
				agent.post('/devicesensors')
					.send(devicesensor)
					.expect(400)
					.end(function(devicesensorSaveErr, devicesensorSaveRes) {
						// Set message assertion
						(devicesensorSaveRes.body.message).should.match('Please fill Devicesensor name');
						
						// Handle Devicesensor save error
						done(devicesensorSaveErr);
					});
			});
	});

	it('should be able to update Devicesensor instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensor
				agent.post('/devicesensors')
					.send(devicesensor)
					.expect(200)
					.end(function(devicesensorSaveErr, devicesensorSaveRes) {
						// Handle Devicesensor save error
						if (devicesensorSaveErr) done(devicesensorSaveErr);

						// Update Devicesensor name
						devicesensor.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Devicesensor
						agent.put('/devicesensors/' + devicesensorSaveRes.body._id)
							.send(devicesensor)
							.expect(200)
							.end(function(devicesensorUpdateErr, devicesensorUpdateRes) {
								// Handle Devicesensor update error
								if (devicesensorUpdateErr) done(devicesensorUpdateErr);

								// Set assertions
								(devicesensorUpdateRes.body._id).should.equal(devicesensorSaveRes.body._id);
								(devicesensorUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Devicesensors if not signed in', function(done) {
		// Create new Devicesensor model instance
		var devicesensorObj = new Devicesensor(devicesensor);

		// Save the Devicesensor
		devicesensorObj.save(function() {
			// Request Devicesensors
			request(app).get('/devicesensors')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Devicesensor if not signed in', function(done) {
		// Create new Devicesensor model instance
		var devicesensorObj = new Devicesensor(devicesensor);

		// Save the Devicesensor
		devicesensorObj.save(function() {
			request(app).get('/devicesensors/' + devicesensorObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', devicesensor.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Devicesensor instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devicesensor
				agent.post('/devicesensors')
					.send(devicesensor)
					.expect(200)
					.end(function(devicesensorSaveErr, devicesensorSaveRes) {
						// Handle Devicesensor save error
						if (devicesensorSaveErr) done(devicesensorSaveErr);

						// Delete existing Devicesensor
						agent.delete('/devicesensors/' + devicesensorSaveRes.body._id)
							.send(devicesensor)
							.expect(200)
							.end(function(devicesensorDeleteErr, devicesensorDeleteRes) {
								// Handle Devicesensor error error
								if (devicesensorDeleteErr) done(devicesensorDeleteErr);

								// Set assertions
								(devicesensorDeleteRes.body._id).should.equal(devicesensorSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Devicesensor instance if not signed in', function(done) {
		// Set Devicesensor user 
		devicesensor.user = user;

		// Create new Devicesensor model instance
		var devicesensorObj = new Devicesensor(devicesensor);

		// Save the Devicesensor
		devicesensorObj.save(function() {
			// Try deleting Devicesensor
			request(app).delete('/devicesensors/' + devicesensorObj._id)
			.expect(401)
			.end(function(devicesensorDeleteErr, devicesensorDeleteRes) {
				// Set message assertion
				(devicesensorDeleteRes.body.message).should.match('User is not logged in');

				// Handle Devicesensor error error
				done(devicesensorDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Devicesensor.remove().exec();
		done();
	});
});