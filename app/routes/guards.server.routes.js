'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var guards = require('../../app/controllers/guards.server.controller');

	// Guards Routes
	app.route('/guards')
		.get(guards.list)
		.post(users.requiresLogin, guards.create);

	app.route('/guards/:guardId')
		.get(guards.read)
		.put(users.requiresLogin, guards.hasAuthorization, guards.update)
		.delete(users.requiresLogin, guards.hasAuthorization, guards.delete);

	// Finish by binding the Guard middleware
	app.param('guardId', guards.guardByID);
};
