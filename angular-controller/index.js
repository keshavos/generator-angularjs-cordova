'use strict';

var util = require('util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
    askForModuleName: function() {
        var modulesFolder = process.cwd() + '/app/modules/';
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'moduleName',
            message: 'Which module does this controller belongs to?',
            default: 'core',
            choices: []
        }];

        if (fs.existsSync(modulesFolder)){
            fs.readdirSync(modulesFolder).forEach(function(folder) {
                var stat = fs.statSync(modulesFolder + '/' + folder);

                if (stat.isDirectory()) {
                    prompts[0].choices.push({
                        value: folder,
                        name: folder
                    });
                }
            });
        }

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

    renderControllerUnitTestFile : function(){
        this.slugifiedTestFileName = this.slugifiedControllerName;
        this.template('../../templates/javascript/unit/_controller.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/unit/' + this.slugifiedTestFileName + 'controller.spec.js');
    }

});

module.exports = ControllerGenerator;
