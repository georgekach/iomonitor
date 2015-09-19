'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Device = mongoose.model('Device'),
	_ = require('lodash');

/**
 * Create a Device
 */
exports.create = function(req, res) {
	var device = new Device(req.body);
	device.user = req.user;

	device.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(device);
		}
	});
};

/**
 * Show the current Device
 */
exports.read = function(req, res) {
	res.jsonp(req.device);
};

/**
 * Show the current Device
 */
exports.readsensor = function(req, res) {
	res.jsonp(req.currentSelectedSensor);
};
/**
 * Update a Device
 */
exports.update = function(req, res) {
	var device = req.device ;


	device = _.extend(device , req.body);

	device.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(device);
		}
	});
};

/**
 * Delete an Device
 */
exports.delete = function(req, res) {
	var device = req.device ;

	device.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(device);
		}
	});
};

/**
 * Delete a Devices Sensor
 */
exports.deletesensor = function(req, res) {
	var device = req.device ;

	device.sensors.id(req.params.sensId).remove();

	device.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(device);
		}
	});
};

/**
 * List of Devices
 */
exports.list = function(req, res) { 
	Device.find().sort('-created').populate('user', 'displayName').exec(function(err, devices) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devices);
		}
	});
};

/**
 * Device middleware
 */
exports.deviceByID = function(req, res, next, id) { 
	Device.findById(id).populate('user devicesensors').exec(function(err, device) {
		if (err) return next(err);
		if (! device) return next(new Error('Failed to load Device ' + id));
		Device.populate(device,{
			path: 'devicesensors.devicesensoralerts',
			model:'Devicesensoralert'
		},function(err, fulldevice) {
			if(err) return res.send(err);
			console.log(fulldevice); // This object should now be populated accordingly.
			req.device = fulldevice ;
			next();
		});
		//req.device = fulldevice ;
		//next();
	});
};

/**
 * Device authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.device.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
