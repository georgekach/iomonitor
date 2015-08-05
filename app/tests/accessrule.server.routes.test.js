'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Accessrule = mongoose.model('Accessrule'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, accessrule;

/**
 * Accessrule routes tests
 */
describe('Accessrule CRUD tests', function() {
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

		// Save a user to the test db and create new Accessrule
		user.save(function() {
			accessrule = {
				name: 'Accessrule Name'
			};

			done();
		});
	});

	it('should be able to save Accessrule instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Accessrule
				agent.post('/accessrules')
					.send(accessrule)
					.expect(200)
					.end(function(accessruleSaveErr, accessruleSaveRes) {
						// Handle Accessrule save error
						if (accessruleSaveErr) done(accessruleSaveErr);

						// Get a list of Accessrules
						agent.get('/accessrules')
							.end(function(accessrulesGetErr, accessrulesGetRes) {
								// Handle Accessrule save error
								if (accessrulesGetErr) done(accessrulesGetErr);

								// Get Accessrules list
								var accessrules = accessrulesGetRes.body;

								// Set assertions
								(accessrules[0].user._id).should.equal(userId);
								(accessrules[0].name).should.match('Accessrule Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Accessrule instance if not logged in', function(done) {
		agent.post('/accessrules')
			.send(accessrule)
			.expect(401)
			.end(function(accessruleSaveErr, accessruleSaveRes) {
				// Call the assertion callback
				done(accessruleSaveErr);
			});
	});

	it('should not be able to save Accessrule instance if no name is provided', function(done) {
		// Invalidate name field
		accessrule.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Accessrule
				agent.post('/accessrules')
					.send(accessrule)
					.expect(400)
					.end(function(accessruleSaveErr, accessruleSaveRes) {
						// Set message assertion
						(accessruleSaveRes.body.message).should.match('Please fill Accessrule name');
						
						// Handle Accessrule save error
						done(accessruleSaveErr);
					});
			});
	});

	it('should be able to update Accessrule instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Accessrule
				agent.post('/accessrules')
					.send(accessrule)
					.expect(200)
					.end(function(accessruleSaveErr, accessruleSaveRes) {
						// Handle Accessrule save error
						if (accessruleSaveErr) done(accessruleSaveErr);

						// Update Accessrule name
						accessrule.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Accessrule
						agent.put('/accessrules/' + accessruleSaveRes.body._id)
							.send(accessrule)
							.expect(200)
							.end(function(accessruleUpdateErr, accessruleUpdateRes) {
								// Handle Accessrule update error
								if (accessruleUpdateErr) done(accessruleUpdateErr);

								// Set assertions
								(accessruleUpdateRes.body._id).should.equal(accessruleSaveRes.body._id);
								(accessruleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Accessrules if not signed in', function(done) {
		// Create new Accessrule model instance
		var accessruleObj = new Accessrule(accessrule);

		// Save the Accessrule
		accessruleObj.save(function() {
			// Request Accessrules
			request(app).get('/accessrules')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Accessrule if not signed in', function(done) {
		// Create new Accessrule model instance
		var accessruleObj = new Accessrule(accessrule);

		// Save the Accessrule
		accessruleObj.save(function() {
			request(app).get('/accessrules/' + accessruleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', accessrule.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Accessrule instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Accessrule
				agent.post('/accessrules')
					.send(accessrule)
					.expect(200)
					.end(function(accessruleSaveErr, accessruleSaveRes) {
						// Handle Accessrule save error
						if (accessruleSaveErr) done(accessruleSaveErr);

						// Delete existing Accessrule
						agent.delete('/accessrules/' + accessruleSaveRes.body._id)
							.send(accessrule)
							.expect(200)
							.end(function(accessruleDeleteErr, accessruleDeleteRes) {
								// Handle Accessrule error error
								if (accessruleDeleteErr) done(accessruleDeleteErr);

								// Set assertions
								(accessruleDeleteRes.body._id).should.equal(accessruleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Accessrule instance if not signed in', function(done) {
		// Set Accessrule user 
		accessrule.user = user;

		// Create new Accessrule model instance
		var accessruleObj = new Accessrule(accessrule);

		// Save the Accessrule
		accessruleObj.save(function() {
			// Try deleting Accessrule
			request(app).delete('/accessrules/' + accessruleObj._id)
			.expect(401)
			.end(function(accessruleDeleteErr, accessruleDeleteRes) {
				// Set message assertion
				(accessruleDeleteRes.body.message).should.match('User is not logged in');

				// Handle Accessrule error error
				done(accessruleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Accessrule.remove().exec();
		done();
	});
});