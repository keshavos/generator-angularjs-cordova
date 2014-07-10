'use strict';

var util = require('util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({



    /**
     * Assign all app variables required to generate test files
     */
    promptTestTypes: function() {
        var done = this.async();

        this.prompt([{
          type: 'list',
          name: 'testType',
          message: 'Select the type of test file required',
          choices: [{
                name: 'unit',
                value: 'unit',
                checked: true
            }, {
                name: 'e2e',
                value: 'e2e',
                checked: false
          }]
        }], function(props){
                if(props.testType=='unit'){
                    this.renderUnitTestFile();
                }
                if(props.testType=='e2e'){
                    this.renderE2eTestFile();
                }
        }.bind(this));
    },

    /**
     * Render Unit test file based on type and name of the file - provided by the user
    */
    renderUnitTestFile: function() {

        this.prompt([{
            name: 'moduleName',
            message: 'Which module does this unit test belong to?',
            default: 'core'
        }, {
            type: 'list',
            name: 'unitTestType',
            message: 'What should this unit test target?',
            choices: [{
                    name:'Controller',
                    value: 'controller',
                    checked: true,
                }, {
                    name:'Service',
                    value: 'service',
                    checked: false,
                }, {
                    name:'Directive',
                    value: 'directive',
                    checked: false,
                }, {
                    name:'Filter',
                    value: 'filter',
                    checked: false,
                }
            ]
        }, {
            name: 'unitTestName',
            value: 'unitTestName',
            message : 'What do you want to call this unit test file?',
            default: 'hey'
        }], function(props){

            this.moduleName = props.moduleName;
            this.slugifiedModuleName = this._.slugify(this.moduleName);
            this.slugifiedTestFileName = this._.slugify(this._.humanize(props.unitTestName));

            /*console.log('this.moduleName', this.moduleName);
            console.log('this.slugifiedModuleName', this.slugifiedModuleName);
            console.log('this.slugifiedTestFileName', this.slugifiedTestFileName);*/

            var templateFileName = '_'+props.unitTestType+'.spec.js';
            var newFileName = this.slugifiedTestFileName +props.unitTestType+'.spec.js'

            console.log('../../templates/javascript/unit/'+templateFileName, 'app/modules/'+this.slugifiedModuleName+'/tests/unit/'+newFileName);

        }.bind(this));

    },

    /**
     * Render e2e test file
    */
    renderE2eTestFile: function() {

        /*this.template('_tests.spec.js', '/app/modules/' + this.slugifiedModuleName + '/tests/e2e/' + this.slugifiedControllerName + '.spec.js');*/
        console.log('renderE2eTestFile called');
    }

});

module.exports = TestGenerator;
