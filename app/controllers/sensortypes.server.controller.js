'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Sensortype = mongoose.model('Sensortype'),
	_ = require('lodash');

/**
 * Create a Sensortype
 */
exports.create = function(req, res) {
	var sensortype = new Sensortype(req.body);
	sensortype.user = req.user;

	sensortype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sensortype);
		}
	});
};

/**
 * Show the current Sensortype
 */
exports.read = function(req, res) {
	res.jsonp(req.sensortype);
};

/**
 * Update a Sensortype
 */
exports.update = function(req, res) {
	var sensortype = req.sensortype ;

	sensortype = _.extend(sensortype , req.body);

	sensortype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sensortype);
		}
	});
};

/**
 * Delete an Sensortype
 */
exports.delete = function(req, res) {
	var sensortype = req.sensortype ;

	sensortype.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sensortype);
		}
	});
};

/**
 * List of Sensortypes
 */
exports.list = function(req, res) { 
	Sensortype.find().sort('-created').populate('user', 'displayName').exec(function(err, sensortypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sensortypes);
		}
	});
};

/**
 * Sensortype middleware
 */
exports.sensortypeByID = function(req, res, next, id) { 
	Sensortype.findById(id).populate('user', 'displayName').exec(function(err, sensortype) {
		if (err) return next(err);
		if (! sensortype) return next(new Error('Failed to load Sensortype ' + id));
		req.sensortype = sensortype ;
		next();
	});
};

/**
 * Sensortype authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.sensortype.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
