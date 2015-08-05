'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var accessrules = require('../../app/controllers/accessrules.server.controller');

	// Accessrules Routes
	app.route('/accessrules')
		.get(accessrules.list)
		.post(users.requiresLogin, accessrules.create);

	app.route('/accessrules/:accessruleId')
		.get(accessrules.read)
		.put(users.requiresLogin, accessrules.hasAuthorization, accessrules.update)
		.delete(users.requiresLogin, accessrules.hasAuthorization, accessrules.delete);

	// Finish by binding the Accessrule middleware
	app.param('accessruleId', accessrules.accessruleByID);
};
