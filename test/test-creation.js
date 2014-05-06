'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var temp = require('temp');
var assert = require('assert');
var exec = require('child_process').exec;
var async = require('async');

/**
 * Should create a basic cordova angularjs app with the set default options
 */
describe('Cordova-AngularJs app', function(){

    after(function(){
        temp.cleanup();
        console.log('temp.cleanup()', temp.dir);
    });

    /**
     * yo angularjs-cordova:angular-config
     * Config sub-generator
     */
    describe('Cordova-AngularJs - Config sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-config',
                'testconfig',
                this,{
                    'moduleName': 'core'
                }, done);
        });

        /**
         * Check if the config file was successfully created
         */
        it('should create the partial file', function(){
            var expected = [
                'www/app/modules/core/config/testconfig.js'
            ];
            helpers.assertFiles(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-controller
     * Controller sub-generator
     */
    describe('Cordova-AngularJs - Controller sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-controller',
                'foo',
                this,{
                    'moduleName':'core'
                }, done);
        });

        /**
         * Test the controller and the test file were created successfully
         */
        it('should create controller and test files', function(){
            var expected = [
                'www/app/modules/core/controllers/foo.js',
                'www/app/modules/core/tests/foo.spec.js'
            ];

            helpers.assertFiles(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-directive
     * Directive sub-generator
     */
    describe('Cordova-AngularJs - Directive sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-directive',
                'testdirective',
                this,{
                    'moduleName': 'core'
                }, done);
        });

        /**
         * Check if the directive file was successfully created
         */
        it('should create the directive js file', function(){
            var expected = [
                'www/app/modules/core/directives/testdirective.js'
            ];
            helpers.assertFiles(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-filter
     * Filter sub-generator
     */
    describe('Cordova-AngularJs - Filter sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-filter',
                'testfilter',
                this,{
                    'moduleName': 'core'
                }, done);
        });

        /**
         * Check if the filter js file was successfully created
         */
        it('should create the partial file', function(){
            var expected = [
                'www/app/modules/core/filters/testfilter.js'
            ];
            helpers.assertFiles(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-module
     * Module sub-generator
     */
    describe('Cordova-AngularJs - Module sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-module',
                'testmodule',
                this,{
                    'name': 'testmodule',
                    'controllers': true,
                    'css': true,
                    'directives':true,
                    'filters':true,
                    'img':true,
                    'services':true,
                    'tests':true,
                    'views':true
                }, done);
        });

        /**
         * Check if the folders were successfully created
         */
        it('should create main module file', function(){
            var expected = [
                'www/app/modules/testmodule/testmodule.js'
            ];
            helpers.assertFile(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-route
     * Route sub-generator
     */
    describe('Cordova-AngularJs - Route sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-route',
                'route',
                this,{
                    'moduleName': 'core',
                    'routePath': 'route',
                    'viewName':'route',
                    'controllerName':'route'
                }, done);
        });

        /**
         * Check if the .js and the partial was successfully created
         */
        it('should create the partial file', function(){
            var expected = [
                'www/app/modules/core/controllers/route.js',
                'www/app/modules/core/views/route.html'
            ];
            helpers.assertFiles(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-service
     * Service sub-generator
     */
    describe('Cordova-AngularJs - Service sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-service',
                'testservice',
                this,{
                    'moduleName': 'core'
                }, done);
        });

        /**
         * Check if the .js and the partial was successfully created
         */
        it('should create the service js file', function(){
            var expected = [
                'www/app/modules/core/services/testservice.js'
            ];
            helpers.assertFiles(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-test
     * Test sub-generator
     */
    describe('Cordova-AngularJs - Test sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-test',
                'testtest',
                this,{
                    'moduleName': 'core'
                }, done);
        });

        /**
         * Check if the .js and the partial was successfully created
         */
        it('should create the test and controller js file', function(){
            var expected = [
                'www/app/modules/core/controllers/testtest.js',
                'www/app/modules/core/tests/testtest.spec.js'
            ];
            helpers.assertFiles(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-view
     * View sub-generator
     */
    describe('Cordova-AngularJs - View sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-view',
                'testview',
                this,{
                    'moduleName': 'core'
                }, done);
        });

        /**
         * Check if the partial was successfully created
         */
        it('should create the test and controller js file', function(){
            var expected = [
                'www/app/modules/core/views/testview.html'
            ];
            helpers.assertFiles(expected);
        });
    });

    /**
     * yo angularjs-cordova
     * Create a basic cordova angularjs app
     */
    describe('Cordova-AngularJs default app', function(){
        /**
         * Run the main generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('app',
                '',
                this, {
                'cordovaappname': 'HelloWorld',
                'cordovapackagename': 'com.angularjscordova.test',
                'platforms': ['Android'],
                'plugins': ['Splashscreen'],
                'angularApp': true,
                'angularjsName': 'ngCordova',
                'appDescription': 'AppDescription',
                'appKeywords': 'Hello World',
                'appAuthor': 'Yeoman',
                'modules': ['ngCookies']
            }, done);
        });

        it('should create all the default files', function(){
            var expected = [
                // add files you expect to exist here.
                'config.xml',
                'www/app/css/demo.css',
                'www/app/css/rainbow.css',
                'www/app/img/brand/favicon.ico',
                'www/app/img/brand/logo.png',
                'www/app/img/loaders/loader.gif',
                'www/app/js/application.js',
                'www/app/js/config.js',
                'www/app/modules/core/config/routes.js',
                'www/app/modules/core/controllers/home.js',
                'www/app/modules/core/core.js',
                'www/app/modules/core/tests/header.spec.js',
                'www/app/modules/core/tests/home.spec.js',
                'www/app/modules/core/views/home.html',
                'www/index.html',
                'gruntfile.js',
                'Procfile',
                'README.md',
                '.bowerrc',
                '.jshintrc',
                '.gitignore',
                '.slugignore',
                '.travis.yml',
                'package.json',
                'bower.json',
                'karma.conf.js'
            ];

            helpers.assertFiles(expected);
        });

    });

});

//Extending the yeoman helper method
function runGenerator(generatorType, name, context, promptAnswers, done) {

    var workspace = context.workspace = temp.mkdirSync();
    helpers.testDirectory(workspace, function (err) {

        if (err) {
            return done(err);
        }

        this.app = helpers.createGenerator('angularjs-cordova:'+generatorType, [
            path.resolve(__dirname, '../'+generatorType)
        ], [name]);

        helpers.mockPrompt(this.app, promptAnswers);

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            done();
        });

    }.bind(context));
}