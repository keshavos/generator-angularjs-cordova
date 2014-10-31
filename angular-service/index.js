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
            this.humanizedModuleName = this._.humanize(this.moduleName);
            this.slugifiedModuleName = this._.slugify(this.humanizedModuleName);

            this.humanizedName = this._.humanize(this.name);
            this.slugifiedName = this._.slugify(this.humanizedName);
            this.classifiedName = this._.classify(this.slugifiedName);


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
                value: 'service',
                message: 'service'
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
            },
            {
                name: 'constant',
                value: 'constant',
                message: 'constant'
            }]
        }], function(props){
            switch(props.serviceType){
                case 'service':
                    this.template('../../templates/javascript/service/_service.js', 'app/modules/'+this.slugifiedModuleName+'/services/'+ this.slugifiedName+'.js');
                    break;

                case 'provider':
                    this.template('../../templates/javascript/service/_provider.js', 'app/modules/'+this.slugifiedModuleName+'/services/'+ this.slugifiedName+'.js');
                    break;

                case 'factory':
                    this.template('../../templates/javascript/service/_factory.js', 'app/modules/'+this.slugifiedModuleName+'/services/'+ this.slugifiedName+'.js');
                    break;

                case 'value':
                    this.template('../../templates/javascript/service/_value.js', 'app/modules/'+this.slugifiedModuleName+'/services/'+ this.slugifiedName+'.js');
                    break;

                case 'constant':
                    this.template('../../templates/javascript/service/_constant.js', 'app/modules/'+this.slugifiedModuleName+'/services/'+ this.slugifiedName+'.js');
                    break;

                default:

                    break;
            }
            done();
        }.bind(this));
    }
});

module.exports = ServiceGenerator;
