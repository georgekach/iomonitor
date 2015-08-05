'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var devicesensoralerts = require('../../app/controllers/devicesensoralerts.server.controller');

	// Devicesensoralerts Routes
	app.route('/devicesensoralerts')
		.get(devicesensoralerts.list)
		.post(users.requiresLogin, devicesensoralerts.create);

	app.route('/devicesensoralerts/:devicesensoralertId')
		.get(devicesensoralerts.read)
		.put(users.requiresLogin, devicesensoralerts.hasAuthorization, devicesensoralerts.update)
		.delete(users.requiresLogin, devicesensoralerts.hasAuthorization, devicesensoralerts.delete);

	// Finish by binding the Devicesensoralert middleware
	app.param('devicesensoralertId', devicesensoralerts.devicesensoralertByID);
};
