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

    renderServiceFile: function() {
        this.template('../../templates/javascript/service/_service.js', 'app/modules/' + this.slugifiedModuleName + '/services/' + this.slugifiedName + '.js');
    }
});

module.exports = ServiceGenerator;
