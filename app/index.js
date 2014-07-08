'use strict';
var fs = require('fs');
var fsextra = require('fs-extra');
var path = require('path');
var util = require('util');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var wiredep = require('wiredep');
var chalk = require('chalk');
var cordova = require('cordova');


var Generator = module.exports = function Generator(args, options) {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
    this.scriptAppName = this.appname + angularUtils.appName(this);

    args = ['main'];

    if (typeof this.env.options.appPath === 'undefined') {
        try {
            this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
        } catch (e) {}
        this.env.options.appPath = this.env.options.appPath || 'app';
    }

    this.appPath = this.env.options.appPath;

    //AngularJs setup responses
    this.appName;
    this.appDescription;
    this.appKeywords;
    this.appAuthor;

    this.slugifiedAppName;
    this.humanizedAppName;
    this.capitalizedAppAuthor;

    this.on('end', function () {
        this.installDependencies({
            skipInstall: this.options['skip-install'],
            callback: this._injectDependencies.bind(this)
        });
    });

    this.pkg = require('../package.json');
};

function addPlatformsToCordova(index, platforms, next) {
    if (!(index < platforms.length)) {
        next();
        return;
    }

    try {
        cordova.platform('add', platforms[index], function () {
            console.log(chalk.green('? ') + ' added ' + chalk.gray(platforms[index]));
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
        console.log(chalk.green('? ') + ' added ' + chalk.gray(plugins[index]));
        addPluginsToCordova(index + 1, plugins, next);
    });
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
    if (!this.options['skip-welcome-message']) {
        this.log(this.yeoman);
        this.log(chalk.magenta('You\'re using the AngularjsCordova generator.'));
    }
};

Generator.prototype.askCordovaDetails = function askCordovaDetails(){
    var done = this.async();
    var prompts = [
        {
            name: 'cordovaappname',
            message: 'What is the name of your app? (Spaces aren\'t allowed)',
            default: 'HelloCordova'
        },
        {
            name: 'cordovapackagename',
            message: 'App Id? (Reverse domain style. e.g com.package.name)',
            default: 'io.cordova.hellocordova'
        },
        {
            type: 'checkbox',
            name: 'platforms',
            message: 'What platforms would you like to add support for? (Please ensure you have the correctly installed the platform requirements)',
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

        this.cordovaappname = this._.camelize(this._.slugify(this._.humanize(this.cordovaappname)));
        this.packagename    = props.cordovapackagename;
        this.platforms      = props.platforms;
        done();
    }.bind(this));
};

/**
 * Creates a cordova project with options obtained from the user
 */
Generator.prototype.setupCordovaProject = function(){
    var done = this.async();

    console.log("Creating cordova app: " + this.cordovaappname);

    try {
        cordova.create(process.cwd(), this.packagename, this.cordovaappname, function () {
            var cwd = process.cwd();
            console.log('*****************************************');
            console.log('Successfully created Empty Cordova project');
            console.log('*****************************************');
            done();
        });
    } catch (err) {
        console.error('Failed to create cordova project: ' + err);
        process.exit(1);
    }
};

/**
 * Adds platforms as selected by the user
 */
Generator.prototype.addPlatforms = function(){
    var next = this.async();

    if (typeof this.platforms === 'undefined') {
        return;
    }
    console.log('*****************************************');
    console.log('Installing the selected Cordova platforms');
    console.log('*****************************************');

    addPlatformsToCordova(0, this.platforms, next);
};

/**
 * Adds the cordova plugins
 */
Generator.prototype.addPlugins = function addPlugins() {
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
};

Generator.prototype.copyProjectFiles = function copyProjectFiles(){
    this.copy('Procfile');
    this.copy('README.md');

    // Copy project hidden files
    this.copy('bowerrc', '.bowerrc');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('slugignore', '.slugignore');
    this.copy('travis.yml', '.travis.yml');

    this.config.save(); //http://yeoman.io/blog/cleanup.html
};

/**
 * Prompts to choose an sample cordova project or an AngularJs project
 */
Generator.prototype.promptApplication = function promptApplication(){
    var done = this.async();
    console.log('*****************************************');
    this.prompt([
        {
            type: 'confirm',
            name: 'angularApp',
            message: 'Include a sample AngularJs built with bootstrap?',
            default: true
        }
    ], function(props){
        this.angularApp = props.angularApp
        done();
    }.bind(this));
};

Generator.prototype.setAngularJsOptions = function setAngularJsOptions(){
    var next = this.async();

    if(this.angularApp){
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
                default: 'Author Name'
            }, {
                type: 'checkbox',
                name: 'modules',
                message: 'Which additional AngularJS modules would you like to include?',
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
            }
        ], function(props){
            //AngularJs setup responses
            this.appName = props.angularjsName;
            this.appDescription = props.appDescription;
            this.appKeywords = props.appKeywords;
            this.appAuthor = props.appAuthor;

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
};

/**
 * Removes the basic app that is initialized on cordova app creation
 */
Generator.prototype.cleanupCordovaApp = function cleanupCordovaApp(){
    var next = this.async();
    if(this.angularApp){

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

        console.log('*****************************************');
        console.log('Removing the cordova app');
        console.log('*****************************************');
        next();
    }
};

/**
 * Sets up the AngularJs app within the app/ directory
 */
Generator.prototype.setupAngularJsApp = function setupAngularJsApp(){
    var done = this.async();

    console.log('*****************************************');
    console.log('Generating a sample AngularJs app');
    console.log('*****************************************');

    if(this.angularApp) {
        // Create angularjs app folder
        this.mkdir('app/app');

        // Copy app folder modules
        this.directory('app/', 'app/app');

        this.template('_karma.conf.js', 'karma.conf.js');
        done();
    }
};

Generator.prototype.parseTemplates = function parseTemplates(){
	
    this.template('../../templates/common/_package.json', 'package.json');
    this.template('../../templates/common/_bower.json', 'bower.json');
    this.template('../../templates/common/Gruntfile.js', 'Gruntfile.js');
    this.template('../../templates/common/index.html', 'app/index.html');
	
};

Generator.prototype._injectDependencies = function _injectDependencies() {
    if (this.options['skip-install']) {
        console.log(
                '\nAfter running `npm install & bower install`, inject your front end dependencies into' +
                '\nyour HTML by running:' +
                '\n' +
                '\n  grunt bowerInstall'
        );
    } else {
        wiredep({
            directory: 'app/app/lib',
            bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
            ignorePath: 'app/app/',
            src: 'app/index.html',
            fileTypes: {
                html: {
                    replace: {
                        css: '<link rel="stylesheet" href="{{filePath}}">'
                    }
                }
            }
        });
    }
};