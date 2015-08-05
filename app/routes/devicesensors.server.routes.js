'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var devicesensors = require('../../app/controllers/devicesensors.server.controller');

	// Devicesensors Routes
	app.route('/devicesensors')
		.get(devicesensors.list)
		.post(users.requiresLogin, devicesensors.create);

	app.route('/devicesensors/:devicesensorId')
		.get(devicesensors.read)
		.put(users.requiresLogin, devicesensors.hasAuthorization, devicesensors.update)
		.delete(users.requiresLogin, devicesensors.hasAuthorization, devicesensors.delete);

	// Finish by binding the Devicesensor middleware
	app.param('devicesensorId', devicesensors.devicesensorByID);
};
