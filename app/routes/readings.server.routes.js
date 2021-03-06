'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var readings = require('../../app/controllers/readings.server.controller');

	// Readings Routes
	app.route('/readings')
		.get(readings.list)
		.post( readings.create);

	app.route('/readings/:readingId')
		.get(readings.read)
		.put( readings.update)
		.delete(readings.delete);

	app.route('/readingsbydevice/:myId')
		.get(readings.readingByDeviceID);
	app.route('/readingsbydeviceforperiod/:myId1/:startOfPeriod/:endOfPeriod')
		.get(readings.readingByDeviceIDForPeriod);
		
	
/*
	app.route('/readings/process')
		.get(readings.processReadings);*/
		
	// Finish by binding the Reading middleware
	app.param('readingId', readings.readingByID);
	app.param('myId', readings.readingByDeviceID);
	app.param('myId1', readings.readingByDeviceIDForPeriod);
	app.param('startOfPeriod', readings.readingByDeviceIDForPeriod);
	app.param('endOfPeriod', readings.readingByDeviceIDForPeriod);
};
