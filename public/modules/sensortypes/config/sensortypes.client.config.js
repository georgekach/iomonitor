'use strict';

// Configuring the Articles module
angular.module('sensortypes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Sensortypes', 'sensortypes', 'dropdown', '/sensortypes(/create)?');
		Menus.addSubMenuItem('topbar', 'sensortypes', 'List Sensortypes', 'sensortypes');
		Menus.addSubMenuItem('topbar', 'sensortypes', 'New Sensortype', 'sensortypes/create');
	}
]);