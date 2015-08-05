'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Userrole = mongoose.model('Userrole'),
	_ = require('lodash');

/**
 * Create a Userrole
 */
exports.create = function(req, res) {
	var userrole = new Userrole(req.body);
	userrole.user = req.user;

	userrole.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userrole);
		}
	});
};

/**
 * Show the current Userrole
 */
exports.read = function(req, res) {
	res.jsonp(req.userrole);
};

/**
 * Update a Userrole
 */
exports.update = function(req, res) {
	var userrole = req.userrole ;

	userrole = _.extend(userrole , req.body);

	userrole.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userrole);
		}
	});
};

/**
 * Delete an Userrole
 */
exports.delete = function(req, res) {
	var userrole = req.userrole ;

	userrole.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userrole);
		}
	});
};

/**
 * List of Userroles
 */
exports.list = function(req, res) { 
	Userrole.find().sort('-created').populate('user', 'displayName').exec(function(err, userroles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userroles);
		}
	});
};

/**
 * Userrole middleware
 */
exports.userroleByID = function(req, res, next, id) { 
	Userrole.findById(id).populate('user', 'displayName').exec(function(err, userrole) {
		if (err) return next(err);
		if (! userrole) return next(new Error('Failed to load Userrole ' + id));
		req.userrole = userrole ;
		next();
	});
};

/**
 * Userrole authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.userrole.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
