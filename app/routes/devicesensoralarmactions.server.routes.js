'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var devicesensoralarmactions = require('../../app/controllers/devicesensoralarmactions.server.controller');

	// Devicesensoralarmactions Routes
	app.route('/devicesensoralarmactions')
		.get(devicesensoralarmactions.list)
		.post(users.requiresLogin, devicesensoralarmactions.create);

	app.route('/devicesensoralarmactions/:devicesensoralarmactionId')
		.get(devicesensoralarmactions.read)
		.put(users.requiresLogin, devicesensoralarmactions.hasAuthorization, devicesensoralarmactions.update)
		.delete(users.requiresLogin, devicesensoralarmactions.hasAuthorization, devicesensoralarmactions.delete);

	// Finish by binding the Devicesensoralarmaction middleware
	app.param('devicesensoralarmactionId', devicesensoralarmactions.devicesensoralarmactionByID);
};
