'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Softwareproductkey = mongoose.model('SoftwareProductKey'),
	_ = require('lodash');

/**
 * Create a Softwareproductkey
 */
exports.create = function(req, res) {
	var softwareproductkey = new Softwareproductkey(req.body);
	softwareproductkey.user = req.user;

	softwareproductkey.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproductkey);
		}
	});
};

/**
 * Show the current Softwareproductkey
 */
exports.read = function(req, res) {
	res.jsonp(req.softwareproductkey);
};

/**
 * Update a Softwareproductkey
 */
exports.update = function(req, res) {
	var softwareproductkey = req.softwareproductkey ;

	softwareproductkey = _.extend(softwareproductkey , req.body);

	softwareproductkey.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproductkey);
		}
	});
};

/**
 * Delete an Softwareproductkey
 */
exports.delete = function(req, res) {
	var softwareproductkey = req.softwareproductkey ;

	softwareproductkey.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproductkey);
		}
	});
};

/**
 * List of Softwareproductkeys
 */
exports.list = function(req, res) { 
	Softwareproductkey.find().sort('-created').populate('user', 'displayName').exec(function(err, softwareproductkeys) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(softwareproductkeys);
		}
	});
};

/**
 * Softwareproductkey middleware
 */
exports.softwareproductkeyByID = function(req, res, next, id) { 
	Softwareproductkey.findById(id).populate('user', 'displayName').exec(function(err, softwareproductkey) {
		if (err) return next(err);
		if (! softwareproductkey) return next(new Error('Failed to load Softwareproductkey ' + id));
		req.softwareproductkey = softwareproductkey ;
		next();
	});
};

/**
 * Softwareproductkey authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.softwareproductkey.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
