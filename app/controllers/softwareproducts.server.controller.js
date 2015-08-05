'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Softwareproduct = mongoose.model('SoftwareProduct'),
	_ = require('lodash');

/**
 * Create a Softwareproduct
 */
exports.create = function(req, res) {
	var softwareproduct = new Softwareproduct(req.body);
	softwareproduct.user = req.user;

	softwareproduct.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproduct);
		}
	});
};

/**
 * Show the current Softwareproduct
 */
exports.read = function(req, res) {
	res.jsonp(req.softwareproduct);
};

/**
 * Update a Softwareproduct
 */
exports.update = function(req, res) {
	var softwareproduct = req.softwareproduct ;

	softwareproduct = _.extend(softwareproduct , req.body);

	softwareproduct.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproduct);
		}
	});
};

/**
 * Delete an Softwareproduct
 */
exports.delete = function(req, res) {
	var softwareproduct = req.softwareproduct ;

	softwareproduct.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproduct);
		}
	});
};

/**
 * List of Softwareproducts
 */
exports.list = function(req, res) { 
	Softwareproduct.find().sort('-created').populate('user', 'displayName').exec(function(err, softwareproducts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproducts);
		}
	});
};

/**
 * Softwareproduct middleware
 */
exports.softwareproductByID = function(req, res, next, id) { 
	Softwareproduct.findById(id).populate('user', 'displayName').exec(function(err, softwareproduct) {
		if (err) return next(err);
		if (! softwareproduct) return next(new Error('Failed to load Softwareproduct ' + id));
		req.softwareproduct = softwareproduct ;
		next();
	});
};

/**
 * Softwareproduct authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.softwareproduct.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
