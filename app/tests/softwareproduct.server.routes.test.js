'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Softwareproduct = mongoose.model('Softwareproduct'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, softwareproduct;

/**
 * Softwareproduct routes tests
 */
describe('Softwareproduct CRUD tests', function() {
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

		// Save a user to the test db and create new Softwareproduct
		user.save(function() {
			softwareproduct = {
				name: 'Softwareproduct Name'
			};

			done();
		});
	});

	it('should be able to save Softwareproduct instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproduct
				agent.post('/softwareproducts')
					.send(softwareproduct)
					.expect(200)
					.end(function(softwareproductSaveErr, softwareproductSaveRes) {
						// Handle Softwareproduct save error
						if (softwareproductSaveErr) done(softwareproductSaveErr);

						// Get a list of Softwareproducts
						agent.get('/softwareproducts')
							.end(function(softwareproductsGetErr, softwareproductsGetRes) {
								// Handle Softwareproduct save error
								if (softwareproductsGetErr) done(softwareproductsGetErr);

								// Get Softwareproducts list
								var softwareproducts = softwareproductsGetRes.body;

								// Set assertions
								(softwareproducts[0].user._id).should.equal(userId);
								(softwareproducts[0].name).should.match('Softwareproduct Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Softwareproduct instance if not logged in', function(done) {
		agent.post('/softwareproducts')
			.send(softwareproduct)
			.expect(401)
			.end(function(softwareproductSaveErr, softwareproductSaveRes) {
				// Call the assertion callback
				done(softwareproductSaveErr);
			});
	});

	it('should not be able to save Softwareproduct instance if no name is provided', function(done) {
		// Invalidate name field
		softwareproduct.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproduct
				agent.post('/softwareproducts')
					.send(softwareproduct)
					.expect(400)
					.end(function(softwareproductSaveErr, softwareproductSaveRes) {
						// Set message assertion
						(softwareproductSaveRes.body.message).should.match('Please fill Softwareproduct name');
						
						// Handle Softwareproduct save error
						done(softwareproductSaveErr);
					});
			});
	});

	it('should be able to update Softwareproduct instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproduct
				agent.post('/softwareproducts')
					.send(softwareproduct)
					.expect(200)
					.end(function(softwareproductSaveErr, softwareproductSaveRes) {
						// Handle Softwareproduct save error
						if (softwareproductSaveErr) done(softwareproductSaveErr);

						// Update Softwareproduct name
						softwareproduct.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Softwareproduct
						agent.put('/softwareproducts/' + softwareproductSaveRes.body._id)
							.send(softwareproduct)
							.expect(200)
							.end(function(softwareproductUpdateErr, softwareproductUpdateRes) {
								// Handle Softwareproduct update error
								if (softwareproductUpdateErr) done(softwareproductUpdateErr);

								// Set assertions
								(softwareproductUpdateRes.body._id).should.equal(softwareproductSaveRes.body._id);
								(softwareproductUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Softwareproducts if not signed in', function(done) {
		// Create new Softwareproduct model instance
		var softwareproductObj = new Softwareproduct(softwareproduct);

		// Save the Softwareproduct
		softwareproductObj.save(function() {
			// Request Softwareproducts
			request(app).get('/softwareproducts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Softwareproduct if not signed in', function(done) {
		// Create new Softwareproduct model instance
		var softwareproductObj = new Softwareproduct(softwareproduct);

		// Save the Softwareproduct
		softwareproductObj.save(function() {
			request(app).get('/softwareproducts/' + softwareproductObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', softwareproduct.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Softwareproduct instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Softwareproduct
				agent.post('/softwareproducts')
					.send(softwareproduct)
					.expect(200)
					.end(function(softwareproductSaveErr, softwareproductSaveRes) {
						// Handle Softwareproduct save error
						if (softwareproductSaveErr) done(softwareproductSaveErr);

						// Delete existing Softwareproduct
						agent.delete('/softwareproducts/' + softwareproductSaveRes.body._id)
							.send(softwareproduct)
							.expect(200)
							.end(function(softwareproductDeleteErr, softwareproductDeleteRes) {
								// Handle Softwareproduct error error
								if (softwareproductDeleteErr) done(softwareproductDeleteErr);

								// Set assertions
								(softwareproductDeleteRes.body._id).should.equal(softwareproductSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Softwareproduct instance if not signed in', function(done) {
		// Set Softwareproduct user 
		softwareproduct.user = user;

		// Create new Softwareproduct model instance
		var softwareproductObj = new Softwareproduct(softwareproduct);

		// Save the Softwareproduct
		softwareproductObj.save(function() {
			// Try deleting Softwareproduct
			request(app).delete('/softwareproducts/' + softwareproductObj._id)
			.expect(401)
			.end(function(softwareproductDeleteErr, softwareproductDeleteRes) {
				// Set message assertion
				(softwareproductDeleteRes.body.message).should.match('User is not logged in');

				// Handle Softwareproduct error error
				done(softwareproductDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Softwareproduct.remove().exec();
		done();
	});
});