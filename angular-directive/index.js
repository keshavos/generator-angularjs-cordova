'use strict';

var util = require('util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');


var DirectiveGenerator = yeoman.generators.NamedBase.extend({
    askForModuleName: function() {
        var modulesFolder = process.cwd() + '/app/modules/';
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'moduleName',
            message: 'Which module does this directive belongs to?',
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
            this.classifiedName = this._.classify(this.slugifiedName)

            done();
        }.bind(this));
    },

    renderDirectiveFile: function() {
        this.template('../../templates/javascript/_directive.js', 'app/modules/' + this.slugifiedModuleName + '/directives/' + this.slugifiedName + '.js')
    },

    renderDirectiveUnitTestFile : function(){
        this.template('../../templates/javascript/unit/_directive.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/unit/' + this.slugifiedName + '-directive.spec.js');
    }
});

module.exports = DirectiveGenerator;
