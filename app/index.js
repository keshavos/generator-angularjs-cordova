'use strict';
var fs = require('fs'); //This could be replaced with the fs-extra module as it has helper methods over the fs methods
var fsextra = require('fs-extra');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var cordova = require('cordova');



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

    var prompts = [
           {
               name: 'appname',
               message: 'What is the name of your app? (Spaces aren\'t allowed)',
               default: 'HelloCordova'
           },
           {
               name: 'packagename',
               message: 'What would you like the package to be?',
               default: 'io.cordova.hellocordova'
           },
           {
               type: 'checkbox',
               name: 'platforms',
               message: 'What platforms would you like to add support for?',
               choices: [
                   {
                       name: 'Android',
                       value: 'android',
                       checked: true
                   },
                   {
                       name: 'iOS',
                       value: 'ios',
                       checked: false
                   },
                   {
                       name: 'Blackberry 10',
                       value: 'blackberry10',
                       checked: false
                   },
                   {
                       name: 'Windows Phone 7',
                       value: 'wp7',
                       checked: false
                   },
                   {
                       name: 'Windows Phone 8',
                       value: 'wp7',
                       checked: false
                   }
               ]
           },
           {
               type: 'checkbox',
               name: 'plugins',
               message: 'What plugins would you like to include by default? (X is selected. Press space to toggle)',
               
               choices: [
                   {
                       name: 'Splashscreen',
                       value: 'org.apache.cordova.splashscreen',
                       checked: true
                   }, {
                       name: 'Device Info',
                       value: 'org.apache.cordova.device',
                       checked: false
                   }, {
                       name: 'Dialogs',
                       value: 'org.apache.cordova.dialogs',
                       checked: false
                   }, {
                       name: 'Network Information',
                       value: 'org.apache.cordova.network-information',
                       checked: false
                   }, {
                       name: 'Vibration',
                       value: 'org.apache.cordova.vibration',
                       checked: false
                   }, {
                       name: 'Battery Events',
                       value: 'org.apache.cordova.battery-status',
                       checked: false
                   }, {
                       name: 'Accelerometer (Device motion)',
                       value: 'org.apache.cordova.device-motion',
                       checked: false
                   }, {
                       name: 'Accelerometer (Device orientation)',
                       value: 'org.apache.cordova.device-orientation',
                       checked: false
                   }, {
                       name: 'Camera',
                       value: 'org.apache.cordova.camera',
                       checked: false
                   }, {
                       name: 'Contacts',
                       value: 'org.apache.cordova.contacts',
                       checked: false
                   }, {
                       name: 'Geolocation',
                       value: 'org.apache.cordova.geolocation',
                       checked: false
                   }, {
                       name: 'In App Browser',
                       value: 'org.apache.cordova.inappbrowser',
                       checked: false
                   }, {
                       name: 'Media',
                       value: 'org.apache.cordova.media',
                       checked: false
                   }, {
                       name: 'Media Capture',
                       value: 'org.apache.cordova.media-capture',
                       checked: false
                   }, {
                       name: 'Access files on device',
                       value: 'org.apache.cordova.file',
                       checked: false
                   }, {
                       name: 'Access files on network/ File transfer (File API)',
                       value: 'org.apache.cordova.file-transfer',
                       checked: false
                   }, {
                       name: 'Globalization',
                       value: 'org.apache.cordova.globalization',
                       checked: false
                   }
               ]
           }
    ];
    
    
    this.prompt(prompts, function(props) {
        //Cordova setup responses
        for (var key in props) {
            this[key] = props[key];
        }

        this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
        this.scriptAppName = this.appname;

        if (typeof this.env.options.appPath === 'undefined') {
            try {
                this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
            } catch (e) {}
            this.env.options.appPath = this.env.options.appPath || 'www';
        }

        this.appPath = this.env.options.appPath;
        
        
        //AngularJs setup responses
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
  
  /**
   * Creates a cordova project with options obtained from the user
   */
  setupCordovaProject : function(){
      var done = this.async();
      
      console.log("Creating cordova app: " + this.appname);
      
      try {
          cordova.create(process.cwd(), this.packagename, this.appname, function () {
              var cwd = process.cwd();
              console.log('*****************************************');
              console.log('Successfully created Empty Cordova project');
              console.log('*****************************************');
              done();
          });
      } catch (err) {
          console.error('Failed to create cordova proect: ' + err);
          process.exit(1);
      }
  }, 
  
  /**
   * Adds platforms as selected by the user
   */
  addPlatforms : function(){
      var next = this.async();
      
      if (typeof this.platforms === 'undefined') {
          return;
      }
      console.log('*****************************************');
      console.log('Installing the selected Cordova platforms');
      console.log('*****************************************');
      
      addPlatformsToCordova(0, this.platforms, next);
  },
  
  
  /**
   * Adds the cordova plugins
   */
  addPlugins : function addPlugins() {
      console.log('*****************************************');
      console.log('Installing the selected Cordova plugins...');
      console.log('*****************************************')
      
      var next = this.async();
      if (this.plugins.length) {
          addPluginsToCordova(0, this.plugins, next);
      } else {
          console.log(chalk.gray('no plugin selected'));
          next();
      }
  },
  
  
  /**
   * Prompts to choose an sample cordova project or an AngularJs project
   */
  chooseSampleApplication : function(){
      var done = this.async();

      this.prompt([
         {
              type: 'confirm',
              name: 'angularApp',
              message: 'Would you like to add a sample AngularJs app?',
              default: true
         }
      ], function(props){
          this.angularApp = props.angularApp
          done();
      }.bind(this));
      
  }, 
  
  /**
   * Gets and sets configuration params for the AngularJs app
   */
  setAngularJsOptions : function(){
      var next = this.async();
      
      if(this.angularApp){
              console.log('*****************************************');
              console.log('Generating a sample AngularJs app');
              console.log('*****************************************');
              
              this.prompt([
                {
                    name: 'angularjsName',
                    message: 'What would you like to call your AngularJs application?',
                    default: 'AngularJsApp'
                }, {
                      name: 'appDescription',
                      message: 'How would you describe your application?',
                      default: 'Cordova app built with AngularJs'
                }, {
                      name: 'appKeywords',
                      message: 'How would you describe your application in comma seperated key words?',
                      default: 'Cordova, AngularJS'
                }, {
                      name: 'appAuthor',
                      message: 'What is your company/author name?',
                      default: 'numero webteam'
                }, {
                    type: 'checkbox',
                    name: 'modules',
                    message: 'Which AngularJS modules would you like to include?',
                    choices: [
                        {
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
                        } 
                    ]
                   }, {
                       type: 'confirm',
                       name: 'addArticleExample',
                       message: 'Would you like to generate the article example CRUD module?',
                       default: true
                   }
              ], function(props){
                  //AngularJs setup responses
                  this.appName = props.angularjsName;
                  this.appDescription = props.appDescription;
                  this.appKeywords = props.appKeywords;
                  this.appAuthor = props.appAuthor;
                  this.addArticleExample = props.addArticleExample;
                  
                  this.slugifiedAppName = this._.slugify(this.appName);
                  this.humanizedAppName = this._.humanize(this.appName);
                  this.capitalizedAppAuthor = this._.capitalize(this.appAuthor);
                  
                  this.angularCookies = this._.contains(props.modules, 'angularCookies');
                  this.angularAnimate = this._.contains(props.modules, 'angularAnimate');
                  this.angularTouch = this._.contains(props.modules, 'angularTouch');
                  this.angularSanitize = this._.contains(props.modules, 'angularSanitize');
                  next();
              }.bind(this));
          } else {
              console.log('Adding a sample cordova project instead');
              next();
          }
  }, //setAngularJsOptions

    /**
     * Removes the basic app that is initialized on cordova app creation
     */
  cleanupCordovaApp : function(){
      var next = this.async();
      if(this.angularApp){
          //TODO Remove the initial corodva css/js/img/index.html which is generated
          fsextra.remove('www/css', function(err){
              if(err){
                  return console.error(err);
              }
          });
          fsextra.remove('www/img', function(err){
              if(err){
                  return console.error(err);
              }
          });
          fsextra.remove('www/js', function(err){
              if(err){
                  return console.error(err);
              }
          });
          fsextra.remove('www/index.html', function(err){
              if(err){
                  return console.error(err);
              }
          });
      next();
      console.log('*****************************************');
      console.log('Removing the cordova app');
      console.log('*****************************************');
      }
  },

  /**
   * Sets up the AngularJs app within the www/ directory
   */
  setupAngularJsApp : function(){
      if(this.angularApp){
          //TODO Bulk copy everything and then process the templates in its own dedicated function?
          // Create angularjs app folder
          this.mkdir('www/app');
          this.mkdir('www/libraries');
          
          // Copy app folder modules
          this.directory('app/', 'www/app');
          this.directory('libraries/', 'www/libraries');
          this.copy('index.html', 'www/index.html');

          // Copy project files
          this.copy('gruntfile.js');
          this.copy('Procfile');
          this.copy('README.md');

          // Copy project hidden files
          this.copy('bowerrc', '.bowerrc');
          this.copy('jshintrc', '.jshintrc');
          this.copy('gitignore', '.gitignore');
          this.copy('slugignore', '.slugignore');
          this.copy('travis.yml', '.travis.yml');
      }
  },

    /**
     * Template files processed based on the config responses before copying across to the new project
     */
  renderCoreModuleFiles: function() {
      /*this.template('app/modules/core/views/_header.html', 'www/app/modules/core/views/header.html');
      this.template('app/modules/core/controllers/_header.js', 'www/app/modules/core/controllers/header.js');*/
  },

    /**
     * Copies across the package and bower package dependency files
     */
  renderApplicationDependenciesFiles: function() {
      //this.template('app/js/_config.js', 'www/app/js/config.js');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
  },

    /**
     * Copies across the karma test configuration files
     */
  renderApplicationKarmaFile: function() {
      this.template('_karma.conf.js', 'karma.conf.js');
  }
  
  
});

function addPlatformsToCordova(index, platforms, next) {
    if (!(index < platforms.length)) {
        next();
        return;
    }

    try {
        cordova.platform('add', platforms[index], function () {
            console.log(chalk.green('✔ ') + ' added ' + chalk.gray(platforms[index]));
            addPlatformsToCordova(index + 1, platforms, next);
        });
    } catch (err) {
        console.error('Failed to add platform ' + platforms['index'] + ': ' + err);
        process.exit(1);
    }
}

function addPluginsToCordova(index, plugins, next) {
    if (!(index < plugins.length)) {
        next();
        return;
    }

    cordova.plugin('add', plugins[index], function () {
        console.log(chalk.green('✔ ') + ' added ' + chalk.gray(plugins[index]));
        addPluginsToCordova(index + 1, plugins, next);
    });
}

module.exports = AngularjsCordovaGenerator;