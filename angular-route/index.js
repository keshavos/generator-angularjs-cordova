'use strict';
var util = require('util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');


var ViewGenerator = yeoman.generators.NamedBase.extend({
    askForModuleName: function() {
        var modulesFolder = process.cwd() + '/app/modules/';
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'moduleName',
            message: 'Which module does this route belongs to?',
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
            this.controllerName = props.controllerName;

            this.moduleName = props.moduleName;
            this.humanizedModuleName = this._.humanize(this.moduleName)
            this.slugifiedModuleName = this._.slugify(this.humanizedModuleName);
            
            this.humanizedName = this._.humanize(this.name);
            this.slugifiedName = this._.slugify(this.humanizedName);
            this.classifiedName = this._.classify(this.slugifiedName);

            done();
        }.bind(this));
    },

    askForRouteDetails: function() {
        var done = this.async();

        var prompts = [{
            name: 'routePath',
            message: 'What do you want your route path to be?',
            default: this.slugifiedName
        }, {
            name: 'viewName',
            message: 'What do you want to call your view?',
            default: this.slugifiedName
        }, {
            name: 'controllerName',
            message: 'What do you want to call your controller?',
            default: this.classifiedName
        }];

        this.prompt(prompts, function(props) {
            this.routePath = props.routePath;
            this.viewName = props.viewName;
            this.controllerName = props.controllerName;

            this.slugifiedRoutePath = this._.slugify(this.routePath);

            this.slugifiedViewName = this._.slugify(this.viewName);
            this.humanizedViewName = this._.humanize(this.viewName);

            this.slugifiedControllerName = this._.slugify(this._.humanize(this.controllerName));
            this.classifiedControllerName = this._.classify(this.slugifiedControllerName);

            done();
        }.bind(this));
    },

    renderRoute: function() {
        var routesFilePath = process.cwd() + '/app/modules/' + this.slugifiedModuleName + '/config/routes.js';

        // If routes file exists we add a new state otherwise we render a new one
        if (fs.existsSync(routesFilePath)) {
            // Read the source routes file content
            var routesFileContent = this.readFileAsString(routesFilePath);

            // Append the new state
            routesFileContent = routesFileContent.replace(/\$stateProvider[\s\n]*\./, this.engine(this.read('../../templates/javascript/_route.js'), this));

            // Save route file
            this.writeFileFromString(routesFileContent, routesFilePath);
        } else {
            this.template('../../templates/javascript/_routes.js', 'app/modules/' + this.slugifiedModuleName + '/config/routes.js')
        }
    },

    renderRouteViewController: function() {
        this.template('../../templates/javascript/_controller.js', 'app/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.js')
        this.template('../../templates/javascript/_view.html', 'app/modules/' + this.slugifiedModuleName + '/views/' + this.slugifiedViewName + '.html')
    },

    renderControllerUnitTestFile : function(){
        this.slugifiedName = this.slugifiedControllerName;
        this.template('../../templates/javascript/unit/_controller.spec.js', 'app/modules/' + this.slugifiedModuleName + '/tests/unit/' + this.slugifiedName + '-controller.spec.js');
    }
});

module.exports = ViewGenerator;
