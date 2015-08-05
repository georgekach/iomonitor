'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var sensortypes = require('../../app/controllers/sensortypes.server.controller');

	// Sensortypes Routes
	app.route('/sensortypes')
		.get(sensortypes.list)
		.post(users.requiresLogin, sensortypes.create);

	app.route('/sensortypes/:sensortypeId')
		.get(sensortypes.read)
		.put(users.requiresLogin, sensortypes.hasAuthorization, sensortypes.update)
		.delete(users.requiresLogin, sensortypes.hasAuthorization, sensortypes.delete);

	// Finish by binding the Sensortype middleware
	app.param('sensortypeId', sensortypes.sensortypeByID);
};
