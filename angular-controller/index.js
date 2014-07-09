'use strict';

var util = require('util'),
    yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
    askForModuleName: function() {
        var done = this.async();

        var prompts = [{
            name: 'moduleName',
            message: 'Which module does this controller belongs to?',
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

    renderControllerFiles: function() {
        this.template('../../templates/javascript/_controller.js', 'app/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.js');
    },

    renderControllerUnitTestFiles : function(){
        this.template('../../templates/javascript/unit/_controller.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/unit/' + this.slugifiedControllerName + '.spec.js');
    }

});

module.exports = ControllerGenerator;
