'use strict';

// Configuring the Articles module
angular.module('softwareproducts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Softwareproducts', 'softwareproducts', 'dropdown', '/softwareproducts(/create)?');
		Menus.addSubMenuItem('topbar', 'softwareproducts', 'List Softwareproducts', 'softwareproducts');
		Menus.addSubMenuItem('topbar', 'softwareproducts', 'New Softwareproduct', 'softwareproducts/create');
	}
]);