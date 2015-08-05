'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Devicesensor = mongoose.model('Devicesensor'),
	_ = require('lodash');

/**
 * Create a Devicesensor
 */
exports.create = function(req, res) {
	var devicesensor = new Devicesensor(req.body);
	devicesensor.user = req.user;

	devicesensor.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensor);
		}
	});
};

/**
 * Show the current Devicesensor
 */
exports.read = function(req, res) {
	res.jsonp(req.devicesensor);
};

/**
 * Update a Devicesensor
 */
exports.update = function(req, res) {
	var devicesensor = req.devicesensor ;

	devicesensor = _.extend(devicesensor , req.body);

	devicesensor.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensor);
		}
	});
};

/**
 * Delete an Devicesensor
 */
exports.delete = function(req, res) {
	var devicesensor = req.devicesensor ;

	devicesensor.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensor);
		}
	});
};

/**
 * List of Devicesensors
 */
exports.list = function(req, res) { 
	Devicesensor.find().sort('-created').populate('user', 'displayName').exec(function(err, devicesensors) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensors);
		}
	});
};

/**
 * Devicesensor middleware
 */
exports.devicesensorByID = function(req, res, next, id) { 
	Devicesensor.findById(id).populate('user', 'displayName').exec(function(err, devicesensor) {
		if (err) return next(err);
		if (! devicesensor) return next(new Error('Failed to load Devicesensor ' + id));
		req.devicesensor = devicesensor ;
		next();
	});
};

/**
 * Devicesensor authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.devicesensor.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
