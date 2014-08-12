'use strict';

var util = require('util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');


var ServiceGenerator = yeoman.generators.NamedBase.extend({
    askForModuleName: function() {
        var modulesFolder = process.cwd() + '/app/modules/';
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'moduleName',
            message: 'Which module does this service belongs to?',
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
            this.slugifiedModuleName = this._.slugify(this._.humanize(this.moduleName));

            this.slugifiedName = this._.slugify(this.name);
            this.classifiedName = this._.classify(this.slugifiedName);
            this.humanizedName = this._.humanize(this.slugifiedName);

            done();
        }.bind(this));
    },

    //Prompt for the type of angular service to add
    promptServiceType : function(){
        var done = this.async();

        this.prompt([{
            type: 'list',
            name: 'serviceType',
            message: 'Type of service to add',
            choices: [{
                name: 'service',
                value: 'Service',
                message: 'Service'
            },
            {
                name: 'provider',
                value: 'provider',
                message: 'provider'
            },
            {
                name: 'factory',
                value: 'factory',
                message: 'factory'
            },
            {
                name: 'value',
                value: 'value',
                message: 'value'
            }]
        }], function(props){

        });
    }

    /*,renderServiceFile: function() {
        this.template('../../templates/javascript/service/_service.js', 'app/modules/' + this.slugifiedModuleName + '/services/' + this.slugifiedName + '.js');
    }*/
});



module.exports = ServiceGenerator;
