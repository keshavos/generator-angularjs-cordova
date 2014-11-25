'use strict';

var util = require('util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({

    /**
     * Assign all app variables required to generate test files
     */
    askForModuleName: function() {
        var modulesFolder = process.cwd() + '/app/modules/';
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'moduleName',
            message: 'Which module does this test belongs to?',
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
            this.humanizedModuleName = this._.humanize(this.moduleName);
            this.slugifiedModuleName = this._.slugify(this.humanizedModuleName);
            this.classifiedModuleName = this._.classify(this.slugifiedModuleName);
            done();
        }.bind(this));
    },

    /**
     * Prompt for either unit or e2e test
     */
    promptModuleType: function() {
        var done = this.async();

        this.prompt([{
            type: 'list',
            name: 'testType',
            message: 'Type of test file to generate',
            choices: [{
                name: 'unitTest',
                value: 'unitTest',
                message: 'Unit Test'
            }, {
                name: 'e2eTest',
                value: 'e2eTest',
                message: 'e2e Test'
            }]
        }, {
            when: function(props) {
                if (props.testType == 'unitTest') {
                    return props;
                }
            },
            type: 'list',
            name: 'unitTestType',
            message: 'What should this unit test target?',
            choices: [{
                name: 'Controller',
                value: 'controller',
                checked: true,
            }, {
                name: 'Service',
                value: 'service',
                checked: false,
            }, {
                name: 'Directive',
                value: 'directive',
                checked: false,
            }, {
                name: 'Filter',
                value: 'filter',
                checked: false,
            }]
        }], function(props) {

            this.slugifiedName = this._.slugify(this._.humanize(this.name));
            this.classifiedName = this._.classify(this.slugifiedName);
            this.camelizedName = this._.camelize(this.slugifiedName);

            if (props.testType == 'unitTest') {

                this.template('../../templates/javascript/unit/_' + props.unitTestType + '.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/unit/' + this.slugifiedName + '-' + props.unitTestType + '.spec.js');

            } else if (props.testType == 'e2eTest') {

                this.slugifiedE2eFolder = this._.slugify(this._.humanize(this.name));

                this.template('../../templates/javascript/e2e/pageObject.po.js', 'app/modules/' + this.slugifiedModuleName + '/tests/e2e/' + '/'+this.slugifiedE2eFolder+'.po.js');
                this.template('../../templates/javascript/e2e/pageSpec.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/e2e/' + '/'+this.slugifiedE2eFolder+'.spec.js');
            }

            done();
        }.bind(this));
    }

});

module.exports = TestGenerator;
