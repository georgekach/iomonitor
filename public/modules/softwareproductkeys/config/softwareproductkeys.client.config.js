'use strict';

// Configuring the Articles module
angular.module('softwareproductkeys').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Softwareproductkeys', 'softwareproductkeys', 'dropdown', '/softwareproductkeys(/create)?');
		Menus.addSubMenuItem('topbar', 'softwareproductkeys', 'List Softwareproductkeys', 'softwareproductkeys');
		Menus.addSubMenuItem('topbar', 'softwareproductkeys', 'New Softwareproductkey', 'softwareproductkeys/create');
	}
]);