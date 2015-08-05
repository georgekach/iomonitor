'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var softwareproductversions = require('../../app/controllers/softwareproductversions.server.controller');

	// Softwareproductversions Routes
	app.route('/softwareproductversions')
		.get(softwareproductversions.list)
		.post(users.requiresLogin, softwareproductversions.create);

	app.route('/softwareproductversions/:softwareproductversionId')
		.get(softwareproductversions.read)
		.put(users.requiresLogin, softwareproductversions.hasAuthorization, softwareproductversions.update)
		.delete(users.requiresLogin, softwareproductversions.hasAuthorization, softwareproductversions.delete);

	// Finish by binding the Softwareproductversion middleware
	app.param('softwareproductversionId', softwareproductversions.softwareproductversionByID);
};
