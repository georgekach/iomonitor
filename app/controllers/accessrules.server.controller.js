'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Accessrule = mongoose.model('Accessrule'),
	_ = require('lodash');

/**
 * Create a Accessrule
 */
exports.create = function(req, res) {
	var accessrule = new Accessrule(req.body);
	accessrule.user = req.user;

	accessrule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(accessrule);
		}
	});
};

/**
 * Show the current Accessrule
 */
exports.read = function(req, res) {
	res.jsonp(req.accessrule);
};

/**
 * Update a Accessrule
 */
exports.update = function(req, res) {
	var accessrule = req.accessrule ;

	accessrule = _.extend(accessrule , req.body);

	accessrule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(accessrule);
		}
	});
};

/**
 * Delete an Accessrule
 */
exports.delete = function(req, res) {
	var accessrule = req.accessrule ;

	accessrule.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(accessrule);
		}
	});
};

/**
 * List of Accessrules
 */
exports.list = function(req, res) { 
	Accessrule.find().sort('-created').populate('user', 'displayName').exec(function(err, accessrules) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(accessrules);
		}
	});
};

/**
 * Accessrule middleware
 */
exports.accessruleByID = function(req, res, next, id) { 
	Accessrule.findById(id).populate('user', 'displayName').exec(function(err, accessrule) {
		if (err) return next(err);
		if (! accessrule) return next(new Error('Failed to load Accessrule ' + id));
		req.accessrule = accessrule ;
		next();
	});
};

/**
 * Accessrule authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.accessrule.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
