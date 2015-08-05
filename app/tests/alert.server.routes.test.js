'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Alert = mongoose.model('Alert'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, sysalert;

/**
 * Alert routes tests
 */
describe('Alert CRUD tests', function() {
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

		// Save a user to the test db and create new Alert
		user.save(function() {
			sysalert = {
				name: 'Alert Name'
			};

			done();
		});
	});

	it('should be able to save Alert instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Alert
				agent.post('/alerts')
					.send(sysalert)
					.expect(200)
					.end(function(alertSaveErr, alertSaveRes) {
						// Handle Alert save error
						if (alertSaveErr) done(alertSaveErr);

						// Get a list of Alerts
						agent.get('/alerts')
							.end(function(alertsGetErr, alertsGetRes) {
								// Handle Alert save error
								if (alertsGetErr) done(alertsGetErr);

								// Get Alerts list
								var alerts = alertsGetRes.body;

								// Set assertions
								(alerts[0].user._id).should.equal(userId);
								(alerts[0].name).should.match('Alert Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Alert instance if not logged in', function(done) {
		agent.post('/alerts')
			.send(sysalert)
			.expect(401)
			.end(function(alertSaveErr, alertSaveRes) {
				// Call the assertion callback
				done(alertSaveErr);
			});
	});

	it('should not be able to save Alert instance if no name is provided', function(done) {
		// Invalidate name field
		sysalert.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Alert
				agent.post('/alerts')
					.send(sysalert)
					.expect(400)
					.end(function(alertSaveErr, alertSaveRes) {
						// Set message assertion
						(alertSaveRes.body.message).should.match('Please fill Alert name');
						
						// Handle Alert save error
						done(alertSaveErr);
					});
			});
	});

	it('should be able to update Alert instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Alert
				agent.post('/alerts')
					.send(sysalert)
					.expect(200)
					.end(function(alertSaveErr, alertSaveRes) {
						// Handle Alert save error
						if (alertSaveErr) done(alertSaveErr);

						// Update Alert name
						sysalert.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Alert
						agent.put('/alerts/' + alertSaveRes.body._id)
							.send(sysalert)
							.expect(200)
							.end(function(alertUpdateErr, alertUpdateRes) {
								// Handle Alert update error
								if (alertUpdateErr) done(alertUpdateErr);

								// Set assertions
								(alertUpdateRes.body._id).should.equal(alertSaveRes.body._id);
								(alertUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Alerts if not signed in', function(done) {
		// Create new Alert model instance
		var alertObj = new Alert(sysalert);

		// Save the Alert
		alertObj.save(function() {
			// Request Alerts
			request(app).get('/alerts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Alert if not signed in', function(done) {
		// Create new Alert model instance
		var alertObj = new Alert(sysalert);

		// Save the Alert
		alertObj.save(function() {
			request(app).get('/alerts/' + alertObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', sysalert.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Alert instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Alert
				agent.post('/alerts')
					.send(sysalert)
					.expect(200)
					.end(function(alertSaveErr, alertSaveRes) {
						// Handle Alert save error
						if (alertSaveErr) done(alertSaveErr);

						// Delete existing Alert
						agent.delete('/alerts/' + alertSaveRes.body._id)
							.send(alert)
							.expect(200)
							.end(function(alertDeleteErr, alertDeleteRes) {
								// Handle Alert error error
								if (alertDeleteErr) done(alertDeleteErr);

								// Set assertions
								(alertDeleteRes.body._id).should.equal(alertSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Alert instance if not signed in', function(done) {
		// Set Alert user 
		sysalert.user = user;

		// Create new Alert model instance
		var alertObj = new Alert(sysalert);

		// Save the Alert
		alertObj.save(function() {
			// Try deleting Alert
			request(app).delete('/alerts/' + alertObj._id)
			.expect(401)
			.end(function(alertDeleteErr, alertDeleteRes) {
				// Set message assertion
				(alertDeleteRes.body.message).should.match('User is not logged in');

				// Handle Alert error error
				done(alertDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Alert.remove().exec();
		done();
	});
});
