'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Softwareproductkey = mongoose.model('Softwareproductkey'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, softwareproductkey;

/**
 * Softwareproductkey routes tests
 */
describe('Softwareproductkey CRUD tests', function() {
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

		// Save a user to the test db and create new Softwareproductkey
		user.save(function() {
			softwareproductkey = {
				name: 'Softwareproductkey Name'
			};

			done();
		});
	});

	it('should be able to save Softwareproductkey instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproductkey
				agent.post('/softwareproductkeys')
					.send(softwareproductkey)
					.expect(200)
					.end(function(softwareproductkeySaveErr, softwareproductkeySaveRes) {
						// Handle Softwareproductkey save error
						if (softwareproductkeySaveErr) done(softwareproductkeySaveErr);

						// Get a list of Softwareproductkeys
						agent.get('/softwareproductkeys')
							.end(function(softwareproductkeysGetErr, softwareproductkeysGetRes) {
								// Handle Softwareproductkey save error
								if (softwareproductkeysGetErr) done(softwareproductkeysGetErr);

								// Get Softwareproductkeys list
								var softwareproductkeys = softwareproductkeysGetRes.body;

								// Set assertions
								(softwareproductkeys[0].user._id).should.equal(userId);
								(softwareproductkeys[0].name).should.match('Softwareproductkey Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Softwareproductkey instance if not logged in', function(done) {
		agent.post('/softwareproductkeys')
			.send(softwareproductkey)
			.expect(401)
			.end(function(softwareproductkeySaveErr, softwareproductkeySaveRes) {
				// Call the assertion callback
				done(softwareproductkeySaveErr);
			});
	});

	it('should not be able to save Softwareproductkey instance if no name is provided', function(done) {
		// Invalidate name field
		softwareproductkey.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproductkey
				agent.post('/softwareproductkeys')
					.send(softwareproductkey)
					.expect(400)
					.end(function(softwareproductkeySaveErr, softwareproductkeySaveRes) {
						// Set message assertion
						(softwareproductkeySaveRes.body.message).should.match('Please fill Softwareproductkey name');
						
						// Handle Softwareproductkey save error
						done(softwareproductkeySaveErr);
					});
			});
	});

	it('should be able to update Softwareproductkey instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproductkey
				agent.post('/softwareproductkeys')
					.send(softwareproductkey)
					.expect(200)
					.end(function(softwareproductkeySaveErr, softwareproductkeySaveRes) {
						// Handle Softwareproductkey save error
						if (softwareproductkeySaveErr) done(softwareproductkeySaveErr);

						// Update Softwareproductkey name
						softwareproductkey.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Softwareproductkey
						agent.put('/softwareproductkeys/' + softwareproductkeySaveRes.body._id)
							.send(softwareproductkey)
							.expect(200)
							.end(function(softwareproductkeyUpdateErr, softwareproductkeyUpdateRes) {
								// Handle Softwareproductkey update error
								if (softwareproductkeyUpdateErr) done(softwareproductkeyUpdateErr);

								// Set assertions
								(softwareproductkeyUpdateRes.body._id).should.equal(softwareproductkeySaveRes.body._id);
								(softwareproductkeyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Softwareproductkeys if not signed in', function(done) {
		// Create new Softwareproductkey model instance
		var softwareproductkeyObj = new Softwareproductkey(softwareproductkey);

		// Save the Softwareproductkey
		softwareproductkeyObj.save(function() {
			// Request Softwareproductkeys
			request(app).get('/softwareproductkeys')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Softwareproductkey if not signed in', function(done) {
		// Create new Softwareproductkey model instance
		var softwareproductkeyObj = new Softwareproductkey(softwareproductkey);

		// Save the Softwareproductkey
		softwareproductkeyObj.save(function() {
			request(app).get('/softwareproductkeys/' + softwareproductkeyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', softwareproductkey.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Softwareproductkey instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproductkey
				agent.post('/softwareproductkeys')
					.send(softwareproductkey)
					.expect(200)
					.end(function(softwareproductkeySaveErr, softwareproductkeySaveRes) {
						// Handle Softwareproductkey save error
						if (softwareproductkeySaveErr) done(softwareproductkeySaveErr);

						// Delete existing Softwareproductkey
						agent.delete('/softwareproductkeys/' + softwareproductkeySaveRes.body._id)
							.send(softwareproductkey)
							.expect(200)
							.end(function(softwareproductkeyDeleteErr, softwareproductkeyDeleteRes) {
								// Handle Softwareproductkey error error
								if (softwareproductkeyDeleteErr) done(softwareproductkeyDeleteErr);

								// Set assertions
								(softwareproductkeyDeleteRes.body._id).should.equal(softwareproductkeySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Softwareproductkey instance if not signed in', function(done) {
		// Set Softwareproductkey user 
		softwareproductkey.user = user;

		// Create new Softwareproductkey model instance
		var softwareproductkeyObj = new Softwareproductkey(softwareproductkey);

		// Save the Softwareproductkey
		softwareproductkeyObj.save(function() {
			// Try deleting Softwareproductkey
			request(app).delete('/softwareproductkeys/' + softwareproductkeyObj._id)
			.expect(401)
			.end(function(softwareproductkeyDeleteErr, softwareproductkeyDeleteRes) {
				// Set message assertion
				(softwareproductkeyDeleteRes.body.message).should.match('User is not logged in');

				// Handle Softwareproductkey error error
				done(softwareproductkeyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Softwareproductkey.remove().exec();
		done();
	});
});