'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Sensortype = mongoose.model('Sensortype'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, sensortype;

/**
 * Sensortype routes tests
 */
describe('Sensortype CRUD tests', function() {
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

		// Save a user to the test db and create new Sensortype
		user.save(function() {
			sensortype = {
				name: 'Sensortype Name'
			};

			done();
		});
	});

	it('should be able to save Sensortype instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sensortype
				agent.post('/sensortypes')
					.send(sensortype)
					.expect(200)
					.end(function(sensortypeSaveErr, sensortypeSaveRes) {
						// Handle Sensortype save error
						if (sensortypeSaveErr) done(sensortypeSaveErr);

						// Get a list of Sensortypes
						agent.get('/sensortypes')
							.end(function(sensortypesGetErr, sensortypesGetRes) {
								// Handle Sensortype save error
								if (sensortypesGetErr) done(sensortypesGetErr);

								// Get Sensortypes list
								var sensortypes = sensortypesGetRes.body;

								// Set assertions
								(sensortypes[0].user._id).should.equal(userId);
								(sensortypes[0].name).should.match('Sensortype Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Sensortype instance if not logged in', function(done) {
		agent.post('/sensortypes')
			.send(sensortype)
			.expect(401)
			.end(function(sensortypeSaveErr, sensortypeSaveRes) {
				// Call the assertion callback
				done(sensortypeSaveErr);
			});
	});

	it('should not be able to save Sensortype instance if no name is provided', function(done) {
		// Invalidate name field
		sensortype.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sensortype
				agent.post('/sensortypes')
					.send(sensortype)
					.expect(400)
					.end(function(sensortypeSaveErr, sensortypeSaveRes) {
						// Set message assertion
						(sensortypeSaveRes.body.message).should.match('Please fill Sensortype name');
						
						// Handle Sensortype save error
						done(sensortypeSaveErr);
					});
			});
	});

	it('should be able to update Sensortype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sensortype
				agent.post('/sensortypes')
					.send(sensortype)
					.expect(200)
					.end(function(sensortypeSaveErr, sensortypeSaveRes) {
						// Handle Sensortype save error
						if (sensortypeSaveErr) done(sensortypeSaveErr);

						// Update Sensortype name
						sensortype.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Sensortype
						agent.put('/sensortypes/' + sensortypeSaveRes.body._id)
							.send(sensortype)
							.expect(200)
							.end(function(sensortypeUpdateErr, sensortypeUpdateRes) {
								// Handle Sensortype update error
								if (sensortypeUpdateErr) done(sensortypeUpdateErr);

								// Set assertions
								(sensortypeUpdateRes.body._id).should.equal(sensortypeSaveRes.body._id);
								(sensortypeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Sensortypes if not signed in', function(done) {
		// Create new Sensortype model instance
		var sensortypeObj = new Sensortype(sensortype);

		// Save the Sensortype
		sensortypeObj.save(function() {
			// Request Sensortypes
			request(app).get('/sensortypes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Sensortype if not signed in', function(done) {
		// Create new Sensortype model instance
		var sensortypeObj = new Sensortype(sensortype);

		// Save the Sensortype
		sensortypeObj.save(function() {
			request(app).get('/sensortypes/' + sensortypeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', sensortype.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Sensortype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sensortype
				agent.post('/sensortypes')
					.send(sensortype)
					.expect(200)
					.end(function(sensortypeSaveErr, sensortypeSaveRes) {
						// Handle Sensortype save error
						if (sensortypeSaveErr) done(sensortypeSaveErr);

						// Delete existing Sensortype
						agent.delete('/sensortypes/' + sensortypeSaveRes.body._id)
							.send(sensortype)
							.expect(200)
							.end(function(sensortypeDeleteErr, sensortypeDeleteRes) {
								// Handle Sensortype error error
								if (sensortypeDeleteErr) done(sensortypeDeleteErr);

								// Set assertions
								(sensortypeDeleteRes.body._id).should.equal(sensortypeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Sensortype instance if not signed in', function(done) {
		// Set Sensortype user 
		sensortype.user = user;

		// Create new Sensortype model instance
		var sensortypeObj = new Sensortype(sensortype);

		// Save the Sensortype
		sensortypeObj.save(function() {
			// Try deleting Sensortype
			request(app).delete('/sensortypes/' + sensortypeObj._id)
			.expect(401)
			.end(function(sensortypeDeleteErr, sensortypeDeleteRes) {
				// Set message assertion
				(sensortypeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Sensortype error error
				done(sensortypeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Sensortype.remove().exec();
		done();
	});
});