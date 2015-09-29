'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Alert = mongoose.model('Alert'),
	_ = require('lodash');

/**
 * Create a Alert
 */
exports.create = function(req, res) {
	var alert = new Alert(req.body);
	alert.user = req.user;

	alert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alert);
		}
	});
};

/**
 * Show the current Alert
 */
exports.read = function(req, res) {
	res.jsonp(req.alert);
};

/**
 * Update a Alert
 */
exports.update = function(req, res) {
	var alert = req.alert ;

	alert = _.extend(alert , req.body);

	alert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alert);
		}
	});
};

/**
 * Delete an Alert
 */
exports.delete = function(req, res) {
	var alert = req.alert ;

	alert.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alert);
		}
	});
};

/**
 * List of Alerts
 */
exports.list = function(req, res) { 
	Alert.find().sort('-created').populate('user', 'displayName').exec(function(err, alerts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alerts);
		}
	});
};

/**
 * Alert middleware
 */
exports.alertByID = function(req, res, next, id) { 
	Alert.findById(id).populate('user', 'displayName').exec(function(err, alert) {
		if (err) return next(err);
		if (! alert) return next(new Error('Failed to load Alert ' + id));
		req.alert = alert ;
		next();
	});
};

/*
Alerts aimed at a user
 */
exports.alertByUser = function(req,res,next,id){
	Alert.find({belongsto:req.params.userId}).exec(function(err,alerts){

		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alerts);
		}

	});
};

/**
 * Alert authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.alert.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
