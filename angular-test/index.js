'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this test belongs to?',
			default: 'core'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.slugifiedModuleName = this._.slugify(this.moduleName);

			this.slugifiedControllerName = this._.slugify(this._.humanize(this.name));
			this.classifiedControllerName = this._.classify(this.slugifiedControllerName);
			this.humanizedControllerName = this._.humanize(this.slugifiedControllerName);

			done();
		}.bind(this));
	},

	renderTestFile: function() {
		var controllerFilePath = process.cwd() + '/app/app/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.js';
		
		// If controller file exists we create a test for it otherwise we will first create a controller
		if (!fs.existsSync(controllerFilePath)) {
			this.template('_controller.js', 'app/app/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.js')
		}

		this.template('_tests.spec.js', 'app/app/modules/' + this.slugifiedModuleName + '/tests/' + this.slugifiedControllerName + '.spec.js')
	}
});

module.exports = TestGenerator;