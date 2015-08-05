'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Softwareproductversion = mongoose.model('Softwareproductversion'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, softwareproductversion;

/**
 * Softwareproductversion routes tests
 */
describe('Softwareproductversion CRUD tests', function() {
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

		// Save a user to the test db and create new Softwareproductversion
		user.save(function() {
			softwareproductversion = {
				name: 'Softwareproductversion Name'
			};

			done();
		});
	});

	it('should be able to save Softwareproductversion instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproductversion
				agent.post('/softwareproductversions')
					.send(softwareproductversion)
					.expect(200)
					.end(function(softwareproductversionSaveErr, softwareproductversionSaveRes) {
						// Handle Softwareproductversion save error
						if (softwareproductversionSaveErr) done(softwareproductversionSaveErr);

						// Get a list of Softwareproductversions
						agent.get('/softwareproductversions')
							.end(function(softwareproductversionsGetErr, softwareproductversionsGetRes) {
								// Handle Softwareproductversion save error
								if (softwareproductversionsGetErr) done(softwareproductversionsGetErr);

								// Get Softwareproductversions list
								var softwareproductversions = softwareproductversionsGetRes.body;

								// Set assertions
								(softwareproductversions[0].user._id).should.equal(userId);
								(softwareproductversions[0].name).should.match('Softwareproductversion Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Softwareproductversion instance if not logged in', function(done) {
		agent.post('/softwareproductversions')
			.send(softwareproductversion)
			.expect(401)
			.end(function(softwareproductversionSaveErr, softwareproductversionSaveRes) {
				// Call the assertion callback
				done(softwareproductversionSaveErr);
			});
	});

	it('should not be able to save Softwareproductversion instance if no name is provided', function(done) {
		// Invalidate name field
		softwareproductversion.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproductversion
				agent.post('/softwareproductversions')
					.send(softwareproductversion)
					.expect(400)
					.end(function(softwareproductversionSaveErr, softwareproductversionSaveRes) {
						// Set message assertion
						(softwareproductversionSaveRes.body.message).should.match('Please fill Softwareproductversion name');
						
						// Handle Softwareproductversion save error
						done(softwareproductversionSaveErr);
					});
			});
	});

	it('should be able to update Softwareproductversion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproductversion
				agent.post('/softwareproductversions')
					.send(softwareproductversion)
					.expect(200)
					.end(function(softwareproductversionSaveErr, softwareproductversionSaveRes) {
						// Handle Softwareproductversion save error
						if (softwareproductversionSaveErr) done(softwareproductversionSaveErr);

						// Update Softwareproductversion name
						softwareproductversion.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Softwareproductversion
						agent.put('/softwareproductversions/' + softwareproductversionSaveRes.body._id)
							.send(softwareproductversion)
							.expect(200)
							.end(function(softwareproductversionUpdateErr, softwareproductversionUpdateRes) {
								// Handle Softwareproductversion update error
								if (softwareproductversionUpdateErr) done(softwareproductversionUpdateErr);

								// Set assertions
								(softwareproductversionUpdateRes.body._id).should.equal(softwareproductversionSaveRes.body._id);
								(softwareproductversionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Softwareproductversions if not signed in', function(done) {
		// Create new Softwareproductversion model instance
		var softwareproductversionObj = new Softwareproductversion(softwareproductversion);

		// Save the Softwareproductversion
		softwareproductversionObj.save(function() {
			// Request Softwareproductversions
			request(app).get('/softwareproductversions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Softwareproductversion if not signed in', function(done) {
		// Create new Softwareproductversion model instance
		var softwareproductversionObj = new Softwareproductversion(softwareproductversion);

		// Save the Softwareproductversion
		softwareproductversionObj.save(function() {
			request(app).get('/softwareproductversions/' + softwareproductversionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', softwareproductversion.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Softwareproductversion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproductversion
				agent.post('/softwareproductversions')
					.send(softwareproductversion)
					.expect(200)
					.end(function(softwareproductversionSaveErr, softwareproductversionSaveRes) {
						// Handle Softwareproductversion save error
						if (softwareproductversionSaveErr) done(softwareproductversionSaveErr);

						// Delete existing Softwareproductversion
						agent.delete('/softwareproductversions/' + softwareproductversionSaveRes.body._id)
							.send(softwareproductversion)
							.expect(200)
							.end(function(softwareproductversionDeleteErr, softwareproductversionDeleteRes) {
								// Handle Softwareproductversion error error
								if (softwareproductversionDeleteErr) done(softwareproductversionDeleteErr);

								// Set assertions
								(softwareproductversionDeleteRes.body._id).should.equal(softwareproductversionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Softwareproductversion instance if not signed in', function(done) {
		// Set Softwareproductversion user 
		softwareproductversion.user = user;

		// Create new Softwareproductversion model instance
		var softwareproductversionObj = new Softwareproductversion(softwareproductversion);

		// Save the Softwareproductversion
		softwareproductversionObj.save(function() {
			// Try deleting Softwareproductversion
			request(app).delete('/softwareproductversions/' + softwareproductversionObj._id)
			.expect(401)
			.end(function(softwareproductversionDeleteErr, softwareproductversionDeleteRes) {
				// Set message assertion
				(softwareproductversionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Softwareproductversion error error
				done(softwareproductversionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Softwareproductversion.remove().exec();
		done();
	});
});