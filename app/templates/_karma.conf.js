'use strict';

/**
 * Module dependencies.
 */
var utilities = require('./config/utilities');

// Grabbing module files using the walk function
var modulesJSFiles = utilities.walk('./public/modules', /(.*)\.js$/);

// Karma configuration
module.exports = function(config) {
	config.set({
		// Frameworks to use
		frameworks: ['jasmine'],

		// List of files / patterns to load in the browser
		files: [
			'app/lib/angular/angular.js',
			'app/lib/angular-resource/angular-resource.js',
			'app/lib/angular-mocks/angular-mocks.js', <% if (angularCookies) { %>
			'app/lib/angular-cookies/angular-cookies.js', <% } if (angularAnimate) { %>
			'app/lib/angular-animate/angular-animate.js', <% } if (angularTouch) { %>
			'app/lib/angular-touch/angular-touch.js', <% } if (angularSanitize) { %>
			'app/lib/angular-sanitize/angular-sanitize.js', <% } %>
			'app/lib/angular-bootstrap/ui-bootstrap.js',
			'app/lib/angular-ui-utils/ui-utils.js',
			'app/lib/angular-ui-router/release/angular-ui-router.js',
			'app/js/config.js',
			'app/js/application.js',
		].concat(modulesJSFiles),

		// Test results reporter to use
		// Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		//reporters: ['progress'],
		reporters: ['progress'],

		// Web server port
		port: 9876,

		// Enable / disable colors in the output (reporters and logs)
		colors: true,

		// Level of logging
		// Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// Enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// If true, it capture browsers, run tests and exit
		singleRun: true
	});
};