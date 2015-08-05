'use strict';

// Configuring the Articles module
angular.module('softwareproductversions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Softwareproductversions', 'softwareproductversions', 'dropdown', '/softwareproductversions(/create)?');
		Menus.addSubMenuItem('topbar', 'softwareproductversions', 'List Softwareproductversions', 'softwareproductversions');
		Menus.addSubMenuItem('topbar', 'softwareproductversions', 'New Softwareproductversion', 'softwareproductversions/create');
	}
]);