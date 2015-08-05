'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var softwareproductkeys = require('../../app/controllers/softwareproductkeys.server.controller');

	// Softwareproductkeys Routes
	app.route('/softwareproductkeys')
		.get(softwareproductkeys.list)
		.post(users.requiresLogin, softwareproductkeys.create);

	app.route('/softwareproductkeys/:softwareproductkeyId')
		.get(softwareproductkeys.read)
		.put(users.requiresLogin, softwareproductkeys.hasAuthorization, softwareproductkeys.update)
		.delete(users.requiresLogin, softwareproductkeys.hasAuthorization, softwareproductkeys.delete);

	// Finish by binding the Softwareproductkey middleware
	app.param('softwareproductkeyId', softwareproductkeys.softwareproductkeyByID);
};
