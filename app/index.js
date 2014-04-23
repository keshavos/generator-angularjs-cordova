'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var AngularjsCordovaGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(this.yeoman);

    this.log(chalk.magenta('You\'re using the AngularjsCordova generator.'));

    var prompts = [{
      name: 'angularjsName',
      message: 'What would you like to call your AngularJs application?',
      default: 'AngularApp'
    }, {
      name: 'cordovaName',
      message: 'What would you like to call your Cordova Application?',
      default: 'HelloCordova'
    }, {
        name: 'appDescription',
        message: 'How would you describe your application?',
        default: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js'
    }, {
        name: 'appKeywords',
        message: 'How would you describe your application in comma seperated key words?',
        default: 'MongoDB, Express, AngularJS, Node.js'
    }, {
        name: 'appAuthor',
        message: 'What is your company/author name?'
    }, {
        type: 'confirm',
        name: 'addArticleExample',
        message: 'Would you like to generate the article example CRUD module?',
        default: true
    }];

    this.prompt(prompts, function(props) {
        this.appName = props.angularjsName;
        this.appDescription = props.appDescription;
        this.appKeywords = props.appKeywords;
        this.appAuthor = props.appAuthor;
        this.addArticleExample = props.addArticleExample;
        
        this.slugifiedAppName = this._.slugify(this.appName);
        this.humanizedAppName = this._.humanize(this.appName);
        this.capitalizedAppAuthor = this._.capitalize(this.appAuthor);
        done();
    }.bind(this));
  },
  
  
  askForAngularApplicationModules: function() {
      var done = this.async();

      var prompts = [{
          type: 'checkbox',
          name: 'modules',
          message: 'Which AngularJS modules would you like to include?',
          choices: [{
              value: 'angularCookies',
              name: 'ngCookies',
              checked: true
          }, {
              value: 'angularAnimate',
              name: 'ngAnimate',
              checked: true
          }, {
              value: 'angularTouch',
              name: 'ngTouch',
              checked: true
          }, {
              value: 'angularSanitize',
              name: 'ngSanitize',
              checked: true
          }]
      }];

      this.prompt(prompts, function(props) {
          this.angularCookies = this._.contains(props.modules, 'angularCookies');
          this.angularAnimate = this._.contains(props.modules, 'angularAnimate');
          this.angularTouch = this._.contains(props.modules, 'angularTouch');
          this.angularSanitize = this._.contains(props.modules, 'angularSanitize');

          done();
      }.bind(this));
  },
  
  
  copyAngularJsApplicationFolder: function() {
      

      // Create angularjs app folders
      this.mkdir('app');
      this.mkdir('app/js');
      this.mkdir('app/modules');
      this.mkdir('scripts');

      // Copy app folder content
      this.directory('app/css');
      this.directory('app/img');
      this.copy('app/js/application.js');

      // Copy app folder modules
      this.directory('app/modules/users');

      // Copy core module files
      this.directory('app/modules/core/config');
      this.directory('app/modules/core/tests');
      this.copy('app/modules/core/controllers/home.js');
      this.copy('app/modules/core/views/home.html');
      this.copy('app/modules/core/core.js');

      // Copy project files
      this.copy('gruntfile.js');
      this.copy('server.js');
      this.copy('Procfile');
      this.copy('README.md');

      // Copy project hidden files
      this.copy('bowerrc', '.bowerrc');
      this.copy('jshintrc', '.jshintrc');
      this.copy('gitignore', '.gitignore');
      this.copy('slugignore', '.slugignore');
      this.copy('travis.yml', '.travis.yml');
      
      //Copy the node web-server and the batch file
      this.directory('scripts/webserver.js');
      this.copy('start-server.bat');
  },
  
  renderAngularApplicationConfigFile: function() {
      this.template('app/js/_config.js', 'app/js/config.js');
  },
  
  renderCoreModuleFiles: function() {
      this.template('app/modules/core/views/_header.html', 'app/modules/core/views/header.html');
      this.template('app/modules/core/controllers/_header.js', 'app/modules/core/controllers/header.js');
  },

  renderApplicationDependenciesFiles: function() {
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
  },

  renderApplicationKarmaFile: function() {
      this.template('_karma.conf.js', 'karma.conf.js');
  }

  
});

module.exports = AngularjsCordovaGenerator;