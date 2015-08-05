'use strict';

// Configuring the Articles module
angular.module('alerts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Alerts', 'alerts', 'dropdown', '/alerts(/create)?');
		Menus.addSubMenuItem('topbar', 'alerts', 'List Alerts', 'alerts');
		Menus.addSubMenuItem('topbar', 'alerts', 'New Alert', 'alerts/create');
	}
]);