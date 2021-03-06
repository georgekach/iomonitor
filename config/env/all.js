'use strict';

module.exports = {
	app: {
		title: 'Intellisense',
		description: 'my first mean application',
		keywords: 'rtu, device mean app'
	},
	port: process.env.PORT || 3002,
	readingsport: 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'https://fonts.googleapis.com/css?family=Lato:700',
				'public/lib/bootstrap/dist/css/bootstrap.css',
				 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-material/angular-material.css',
				'public/lib/metisMenu/dist/metisMenu.css',
				//'https://cdnjs.cloudflare.com/ajax/libs/metisMenu/2.2.0/metisMenu.css',
				//'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
				'public/lib/font-awesome-4.3.0/css/font-awesome.css',
				//'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
				'public/lib/openlayers3/build/ol.css',
				'public/lib/weather-icons/css/weather-icons.css',
				'public/lib/c3/c3.css',
				'public/lib/ng-mobile-menu/dist/ng-mobile-menu.min.css'
			],
			js: [
				'public/lib/angular/angular.js',


				'public/lib/angular-aria/angular-aria.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-material/angular-material.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				//'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',

				//'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.14.3/ui-bootstrap.min.js',
				'public/lib/highcharts-release/adapters/standalone-framework.js',
				'public/lib/highcharts-release/highcharts.js',
				//'https://code.highcharts.com/highcharts.js',
				'public/lib/highcharts-ng/dist/highcharts-ng.js',
				
				'public/lib/socket-io/socket.io.js',
				//'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.7/socket.io.min.js',
				'public/lib/angular-socket-io/socket.min.js',
				'public/lib/jquery/dist/jquery.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular-ui/0.4.0/angular-ui.js',
				'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.14.3/ui-bootstrap-tpls.min.js',
				'public/lib/bootstrap/dist/js/bootstrap.min.js',
				//'https://cdnjs.cloudflare.com/ajax/libs/metisMenu/2.2.0/metisMenu.js',
				'public/lib/metisMenu/dist/metisMenu.js',
				'public/lib/sb-admin/sb-admin-2.js',
				'public/lib/angular-smart-table/smart-table.js',
				'public/lib/raphael/raphael.js',
				'public/lib/justgage-toorshia/justgage.js',
				'public/lib/angular-justgage/ng-justgage.js',
				'public/lib/openlayers3/build/ol.js',
				'public/lib/angular-openlayers-directive/dist/angular-openlayers-directive.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/d3/d3.js',
				'public/lib/c3/c3.js',
				'public/lib/angular-chart/angular-chart.js',
				'public/lib/angular-scroll/angular-scroll.min.js',
				//'https://cdnjs.cloudflare.com/ajax/libs/angular-scroll/0.7.3/angular-scroll.min.js',
				'public/lib/ng-mobile-menu/dist/ng-mobile-menu.min.js',
				'public/lib/ngMorph/dist/angular-morph.js',
				'public/lib/angular-intro.js/src/angular-intro.js',
				'public/lib/moment/moment.js',
				'public/lib/angular-moment/angular-moment.min.js',
				'public/lib/ng-pageslide/dist/angular-pageslide-directive.js',
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
