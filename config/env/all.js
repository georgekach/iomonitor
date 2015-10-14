'use strict';

module.exports = {
	app: {
		title: 'Intellisense',
		description: 'my first mean application',
		keywords: 'rtu, device mean app'
	},
	port: process.env.PORT || 8080,
	readingsport: 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-material/angular-material.css',
				'public/lib/metisMenu/dist/metisMenu.css',
				
				'public/lib/font-awesome-4.3.0/css/font-awesome.css',
				//'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
				'public/lib/openlayers3/build/ol.css',
				'public/lib/weather-icons/css/weather-icons.css',
				'public/lib/c3/c3.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-aria/angular-aria.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-material/angular-material.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/highcharts-release/adapters/standalone-framework.js',
				'public/lib/highcharts-release/highcharts.js',
				'public/lib/highcharts-ng/src/highcharts-ng.js',
				'public/lib/socket-io/socket.io.js',
				'public/lib/angular-socket-io/socket.min.js',
				'public/lib/jquery/dist/jquery.js',
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
				'https://cdnjs.cloudflare.com/ajax/libs/angular-scroll/0.7.3/angular-scroll.min.js'
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
