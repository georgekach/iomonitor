'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var softwareproducts = require('../../app/controllers/softwareproducts.server.controller');

	// Softwareproducts Routes
	app.route('/softwareproducts')
		.get(softwareproducts.list)
		.post(users.requiresLogin, softwareproducts.create);

	app.route('/softwareproducts/:softwareproductId')
		.get(softwareproducts.read)
		.put(users.requiresLogin, softwareproducts.hasAuthorization, softwareproducts.update)
		.delete(users.requiresLogin, softwareproducts.hasAuthorization, softwareproducts.delete);

	// Finish by binding the Softwareproduct middleware
	app.param('softwareproductId', softwareproducts.softwareproductByID);
};
