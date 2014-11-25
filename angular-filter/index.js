'use strict';

var util = require('util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');


var FilterGenerator = yeoman.generators.NamedBase.extend({
    askForModuleName: function() {
        var modulesFolder = process.cwd() + '/app/modules/';
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'moduleName',
            message: 'Which module does this filter belongs to?',
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
            this.humanizedModuleName = this._.humanize(this.moduleName)
            this.slugifiedModuleName = this._.slugify(this.humanizedModuleName);

            this.humanizedName = this._.humanize(this.name);
            this.slugifiedName = this._.slugify(this.humanizedName);
            this.camelizedName = this._.camelize(this.slugifiedName);
            this.classifiedName = this._.classify(this.slugifiedName);

            done();
        }.bind(this));
    },

    renderFilterFile: function() {
        this.template('../../templates/javascript/_filter.js', 'app/modules/' + this.slugifiedModuleName + '/filters/' + this.slugifiedName + '.js')
    },

    renderFilterUnitTestFile : function(){
        this.template('../../templates/javascript/unit/_filter.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/unit/' + this.slugifiedName + '-filter.spec.js');
    }
});

module.exports = FilterGenerator;
