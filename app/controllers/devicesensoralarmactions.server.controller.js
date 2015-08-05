'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Devicesensoralarmaction = mongoose.model('Devicesensoralarmaction'),
	_ = require('lodash');

/**
 * Create a Devicesensoralarmaction
 */
exports.create = function(req, res) {
	var devicesensoralarmaction = new Devicesensoralarmaction(req.body);
	devicesensoralarmaction.user = req.user;

	devicesensoralarmaction.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensoralarmaction);
		}
	});
};

/**
 * Show the current Devicesensoralarmaction
 */
exports.read = function(req, res) {
	res.jsonp(req.devicesensoralarmaction);
};

/**
 * Update a Devicesensoralarmaction
 */
exports.update = function(req, res) {
	var devicesensoralarmaction = req.devicesensoralarmaction ;

	devicesensoralarmaction = _.extend(devicesensoralarmaction , req.body);

	devicesensoralarmaction.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensoralarmaction);
		}
	});
};

/**
 * Delete an Devicesensoralarmaction
 */
exports.delete = function(req, res) {
	var devicesensoralarmaction = req.devicesensoralarmaction ;

	devicesensoralarmaction.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensoralarmaction);
		}
	});
};

/**
 * List of Devicesensoralarmactions
 */
exports.list = function(req, res) { 
	Devicesensoralarmaction.find().sort('-created').populate('user', 'displayName').exec(function(err, devicesensoralarmactions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devicesensoralarmactions);
		}
	});
};

/**
 * Devicesensoralarmaction middleware
 */
exports.devicesensoralarmactionByID = function(req, res, next, id) { 
	Devicesensoralarmaction.findById(id).populate('user', 'displayName').exec(function(err, devicesensoralarmaction) {
		if (err) return next(err);
		if (! devicesensoralarmaction) return next(new Error('Failed to load Devicesensoralarmaction ' + id));
		req.devicesensoralarmaction = devicesensoralarmaction ;
		next();
	});
};

/**
 * Devicesensoralarmaction authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.devicesensoralarmaction.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
