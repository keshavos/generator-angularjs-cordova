'use strict';

var util = require('util'),
    yeoman = require('yeoman-generator');


var FilterGenerator = yeoman.generators.NamedBase.extend({
    askForModuleName: function() {
        var done = this.async();

        var prompts = [{
            name: 'moduleName',
            message: 'Which module does this filter belongs to?',
            default: 'core'
        }];

        this.prompt(prompts, function(props) {
            this.moduleName = props.moduleName;
            this.slugifiedModuleName = this._.slugify(this.moduleName);

            this.slugifiedName = this._.slugify(this._.humanize(this.name));
            this.camelizedName = this._.camelize(this.slugifiedName);
            this.humanizedName = this._.humanize(this.slugifiedName);

            done();
        }.bind(this));
    },

    renderFilterFile: function() {
        this.template('../../templates/javascript/_filter.js', 'app/modules/' + this.slugifiedModuleName + '/filters/' + this.slugifiedName + '.js')
    },

    renderFilterUnitTestFile : function(){
        this.slugifiedTestFileName = this.slugifiedName;
        this.template('../../templates/javascript/unit/_directive.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/unit/' + this.slugifiedName + 'filter.spec.js');
    }
});

module.exports = FilterGenerator;
