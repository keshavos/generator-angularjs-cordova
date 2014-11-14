'use strict';

var util = require('util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');

var ConfigGenerator = yeoman.generators.NamedBase.extend({
    askForModuleName: function() {
        var modulesFolder = process.cwd() + '/app/modules/';
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'moduleName',
            message: 'Which module does this configuration file belongs to?',
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


            this.slugifiedName = this._.slugify(this.name);

            done();
        }.bind(this));
    },

    renderConfigFile: function() {
        this.template('../../templates/javascript/_config.js', 'app/modules/' + this.slugifiedModuleName + '/config/' + this.slugifiedName + '.js')
    }
});

module.exports = ConfigGenerator;
