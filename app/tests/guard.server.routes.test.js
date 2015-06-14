'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Guard = mongoose.model('Guard'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, guard;

/**
 * Guard routes tests
 */
describe('Guard CRUD tests', function() {
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

		// Save a user to the test db and create new Guard
		user.save(function() {
			guard = {
				name: 'Guard Name'
			};

			done();
		});
	});

	it('should be able to save Guard instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Guard
				agent.post('/guards')
					.send(guard)
					.expect(200)
					.end(function(guardSaveErr, guardSaveRes) {
						// Handle Guard save error
						if (guardSaveErr) done(guardSaveErr);

						// Get a list of Guards
						agent.get('/guards')
							.end(function(guardsGetErr, guardsGetRes) {
								// Handle Guard save error
								if (guardsGetErr) done(guardsGetErr);

								// Get Guards list
								var guards = guardsGetRes.body;

								// Set assertions
								(guards[0].user._id).should.equal(userId);
								(guards[0].name).should.match('Guard Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Guard instance if not logged in', function(done) {
		agent.post('/guards')
			.send(guard)
			.expect(401)
			.end(function(guardSaveErr, guardSaveRes) {
				// Call the assertion callback
				done(guardSaveErr);
			});
	});

	it('should not be able to save Guard instance if no name is provided', function(done) {
		// Invalidate name field
		guard.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Guard
				agent.post('/guards')
					.send(guard)
					.expect(400)
					.end(function(guardSaveErr, guardSaveRes) {
						// Set message assertion
						(guardSaveRes.body.message).should.match('Please fill Guard name');
						
						// Handle Guard save error
						done(guardSaveErr);
					});
			});
	});

	it('should be able to update Guard instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Guard
				agent.post('/guards')
					.send(guard)
					.expect(200)
					.end(function(guardSaveErr, guardSaveRes) {
						// Handle Guard save error
						if (guardSaveErr) done(guardSaveErr);

						// Update Guard name
						guard.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Guard
						agent.put('/guards/' + guardSaveRes.body._id)
							.send(guard)
							.expect(200)
							.end(function(guardUpdateErr, guardUpdateRes) {
								// Handle Guard update error
								if (guardUpdateErr) done(guardUpdateErr);

								// Set assertions
								(guardUpdateRes.body._id).should.equal(guardSaveRes.body._id);
								(guardUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Guards if not signed in', function(done) {
		// Create new Guard model instance
		var guardObj = new Guard(guard);

		// Save the Guard
		guardObj.save(function() {
			// Request Guards
			request(app).get('/guards')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Guard if not signed in', function(done) {
		// Create new Guard model instance
		var guardObj = new Guard(guard);

		// Save the Guard
		guardObj.save(function() {
			request(app).get('/guards/' + guardObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', guard.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Guard instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Guard
				agent.post('/guards')
					.send(guard)
					.expect(200)
					.end(function(guardSaveErr, guardSaveRes) {
						// Handle Guard save error
						if (guardSaveErr) done(guardSaveErr);

						// Delete existing Guard
						agent.delete('/guards/' + guardSaveRes.body._id)
							.send(guard)
							.expect(200)
							.end(function(guardDeleteErr, guardDeleteRes) {
								// Handle Guard error error
								if (guardDeleteErr) done(guardDeleteErr);

								// Set assertions
								(guardDeleteRes.body._id).should.equal(guardSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Guard instance if not signed in', function(done) {
		// Set Guard user 
		guard.user = user;

		// Create new Guard model instance
		var guardObj = new Guard(guard);

		// Save the Guard
		guardObj.save(function() {
			// Try deleting Guard
			request(app).delete('/guards/' + guardObj._id)
			.expect(401)
			.end(function(guardDeleteErr, guardDeleteRes) {
				// Set message assertion
				(guardDeleteRes.body.message).should.match('User is not logged in');

				// Handle Guard error error
				done(guardDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Guard.remove().exec();
		done();
	});
});