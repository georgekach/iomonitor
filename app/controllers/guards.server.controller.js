'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Guard = mongoose.model('Guard'),
	_ = require('lodash');

/**
 * Create a Guard
 */
exports.create = function(req, res) {
	var guard = new Guard(req.body);
	guard.user = req.user;

	guard.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guard);
		}
	});
};

/**
 * Show the current Guard
 */
exports.read = function(req, res) {
	res.jsonp(req.guard);
};

/**
 * Update a Guard
 */
exports.update = function(req, res) {
	var guard = req.guard ;

	guard = _.extend(guard , req.body);

	guard.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guard);
		}
	});
};

/**
 * Delete an Guard
 */
exports.delete = function(req, res) {
	var guard = req.guard ;

	guard.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guard);
		}
	});
};

/**
 * List of Guards
 */
exports.list = function(req, res) { 
	Guard.find().sort('-created').populate('user', 'displayName').exec(function(err, guards) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guards);
		}
	});
};

/**
 * Guard middleware
 */
exports.guardByID = function(req, res, next, id) { 
	Guard.findById(id).populate('user', 'displayName').exec(function(err, guard) {
		if (err) return next(err);
		if (! guard) return next(new Error('Failed to load Guard ' + id));
		req.guard = guard ;
		next();
	});
};

/**
 * Guard authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.guard.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
