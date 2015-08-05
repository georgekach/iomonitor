'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Devicesensoralert = mongoose.model('Devicesensoralert'),
	_ = require('lodash');

/**
 * Create a Devicesensoralert
 */
exports.create = function(req, res) {
	var devicesensoralert = new Devicesensoralert(req.body);
	devicesensoralert.user = req.user;

	devicesensoralert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensoralert);
		}
	});
};

/**
 * Show the current Devicesensoralert
 */
exports.read = function(req, res) {
	res.jsonp(req.devicesensoralert);
};

/**
 * Update a Devicesensoralert
 */
exports.update = function(req, res) {
	var devicesensoralert = req.devicesensoralert ;

	devicesensoralert = _.extend(devicesensoralert , req.body);

	devicesensoralert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensoralert);
		}
	});
};

/**
 * Delete an Devicesensoralert
 */
exports.delete = function(req, res) {
	var devicesensoralert = req.devicesensoralert ;

	devicesensoralert.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensoralert);
		}
	});
};

/**
 * List of Devicesensoralerts
 */
exports.list = function(req, res) { 
	Devicesensoralert.find().sort('-created').populate('user', 'displayName').exec(function(err, devicesensoralerts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensoralerts);
		}
	});
};

/**
 * Devicesensoralert middleware
 */
exports.devicesensoralertByID = function(req, res, next, id) { 
	Devicesensoralert.findById(id).populate('user', 'displayName').exec(function(err, devicesensoralert) {
		if (err) return next(err);
		if (! devicesensoralert) return next(new Error('Failed to load Devicesensoralert ' + id));
		req.devicesensoralert = devicesensoralert ;
		next();
	});
};

/**
 * Devicesensoralert authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.devicesensoralert.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
