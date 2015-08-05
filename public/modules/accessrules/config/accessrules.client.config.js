'use strict';

// Configuring the Articles module
angular.module('accessrules').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Accessrules', 'accessrules', 'dropdown', '/accessrules(/create)?');
		Menus.addSubMenuItem('topbar', 'accessrules', 'List Accessrules', 'accessrules');
		Menus.addSubMenuItem('topbar', 'accessrules', 'New Accessrule', 'accessrules/create');
	}
]);