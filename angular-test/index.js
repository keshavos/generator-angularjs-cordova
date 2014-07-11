'use strict';

var util = require('util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({

    /**
     * Assign all app variables required to generate test files
     */
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
        }, {
            when: function(props) {
                if (props.testType == 'e2eTest') {
                    return props;
                }
            },
            name: 'e2eTestName',
            value: 'e2eTestName',
            message: 'What is the name of the PageObject & test file you would like to generate?',
            default: 'default'
        }], function(props) {

            this.slugifiedTestFileName = this._.slugify(this._.humanize(this.name));

            if (props.testType == 'unitTest') {

                this.template('../../templates/javascript/unit/_' + props.unitTestType + '.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/unit/' + this.slugifiedTestFileName + props.unitTestType + '.spec.js');

            } else if (props.testType == 'e2eTest') {

                this.slugifiedE2eFolder = this._.slugify(this._.humanize(props.e2eTestName));

                this.mkdir('app/modules/' + this.slugifiedModuleName + '/tests/e2e/' + this.slugifiedE2eFolder);
                this.template('../../templates/javascript/e2e/pageObject.po.js', 'app/modules/' + this.slugifiedModuleName + '/tests/e2e/' + this.slugifiedE2eFolder + '/'+this.slugifiedE2eFolder+'.po.js');
                this.template('../../templates/javascript/e2e/pageSpec.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/e2e/' + this.slugifiedE2eFolder + '/'+this.slugifiedE2eFolder+'.spec.js');
            }

            done();
        }.bind(this));
    }

});

module.exports = TestGenerator;
