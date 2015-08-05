'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var userroles = require('../../app/controllers/userroles.server.controller');

	// Userroles Routes
	app.route('/userroles')
		.get(userroles.list)
		.post(users.requiresLogin, userroles.create);

	app.route('/userroles/:userroleId')
		.get(userroles.read)
		.put(users.requiresLogin, userroles.hasAuthorization, userroles.update)
		.delete(users.requiresLogin, userroles.hasAuthorization, userroles.delete);

	// Finish by binding the Userrole middleware
	app.param('userroleId', userroles.userroleByID);
};
