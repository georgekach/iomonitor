'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var alerts = require('../../app/controllers/alerts.server.controller');

	// Alerts Routes
	app.route('/alerts')
		.get(alerts.list)
		.post(users.requiresLogin, alerts.create);

	app.route('/alerts/:alertId')
		.get(alerts.read)
		.put(users.requiresLogin, alerts.hasAuthorization, alerts.update)
		.delete(users.requiresLogin, alerts.hasAuthorization, alerts.delete);

	// Finish by binding the Alert middleware
	app.param('alertId', alerts.alertByID);
};
