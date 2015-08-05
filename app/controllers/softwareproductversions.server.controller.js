'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Softwareproductversion = mongoose.model('SoftwareProductVersion'),
	_ = require('lodash');

/**
 * Create a Softwareproductversion
 */
exports.create = function(req, res) {
	var softwareproductversion = new Softwareproductversion(req.body);
	softwareproductversion.user = req.user;

	softwareproductversion.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproductversion);
		}
	});
};

/**
 * Show the current Softwareproductversion
 */
exports.read = function(req, res) {
	res.jsonp(req.softwareproductversion);
};

/**
 * Update a Softwareproductversion
 */
exports.update = function(req, res) {
	var softwareproductversion = req.softwareproductversion ;

	softwareproductversion = _.extend(softwareproductversion , req.body);

	softwareproductversion.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproductversion);
		}
	});
};

/**
 * Delete an Softwareproductversion
 */
exports.delete = function(req, res) {
	var softwareproductversion = req.softwareproductversion ;

	softwareproductversion.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproductversion);
		}
	});
};

/**
 * List of Softwareproductversions
 */
exports.list = function(req, res) { 
	Softwareproductversion.find().sort('-created').populate('user', 'displayName').exec(function(err, softwareproductversions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproductversions);
		}
	});
};

/**
 * Softwareproductversion middleware
 */
exports.softwareproductversionByID = function(req, res, next, id) { 
	Softwareproductversion.findById(id).populate('user', 'displayName').exec(function(err, softwareproductversion) {
		if (err) return next(err);
		if (! softwareproductversion) return next(new Error('Failed to load Softwareproductversion ' + id));
		req.softwareproductversion = softwareproductversion ;
		next();
	});
};

/**
 * Softwareproductversion authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.softwareproductversion.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
