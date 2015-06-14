'use strict';

// Configuring the Articles module
angular.module('guards').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Guards', 'guards', 'dropdown', '/guards(/create)?');
		Menus.addSubMenuItem('topbar', 'guards', 'List Guards', 'guards');
		Menus.addSubMenuItem('topbar', 'guards', 'New Guard', 'guards/create');
	}
]);