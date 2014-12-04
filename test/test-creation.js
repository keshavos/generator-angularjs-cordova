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
describe('generator-angularjs: ', function(){
    this.timeout(30000);
    after(function(){
        temp.cleanup();
    });

    /**
     * yo angularjs-cordova
     * Creates a basic cordova angularjs app
     * Adds Android platform
     * Adds Splashscreen plugin
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
                'platforms': ['android'],
                'plugins': ['Splashscreen'],
                'angularjsName': 'AngularJsApplication',
                'appDescription': 'AppDescription',
                'appKeywords': 'Hello World',
                'appAuthor': 'Yeoman',
                'modules': ['ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize']
            }, done);
        });

        it('should create all the default files', function(){
            var expected = [
                '.jshintrc',
                '.bowerrc',
                '.editorconfig',
                '.gitignore',
                'README.md',
                '.travis.yml',
                'Gruntfile.js',
                'bower.json',
                'karma.conf.js',
                'package.json',
                'protractor-desktop-config.js.js',
                'app/css/customcordova.css',
                'app/css/demo.css',
                'app/img/loaders/loader.gif',
                'app/index.html',
                'app/js/application.js',
                'app/js/config.js',
                'app/modules/core/config/routes.js',
                'app/modules/core/controllers/home.js',
                'app/modules/core/core.js',
                'app/modules/core/tests/e2e/home/home.po.js',
                'app/modules/core/tests/e2e/home/home.spec.js',
                'app/modules/core/tests/unit/home.spec.js',
                'app/modules/core/views/home.html',
                'www/.gitignore'
            ];

            assert.file(expected);
        });

    });

    /**
     * yo angularjs-cordova:angular-module
     * Module sub-generator
     */
    describe('angular-module sub-generator', function(){
        /**
         Run the sub-generator to generate the necessary files before executing any tests on it
        */
        before(function(done){
            runGenerator('angular-module',
                'foo',
                this,{
                    'config': true,
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
                'app/modules/foo/foo.js'
            ];
            helpers.assertFile(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-config
     * Config sub-generator
     */
    describe('angular-config sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-config',
                'foo',
                this,{
                    'moduleName': 'core'
                }, done);
        });

        /**
         * Check if the config file was successfully created
         */
        it('should create the partial file', function(){
            var expected = [
                'app/modules/core/config/foo.js'
            ];
            assert.file(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-controller
     * Controller sub-generator
     */
    describe('angular-controller sub-generator', function(){
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
         * Test the controller and unit test file were successfully created
         */
        it('should create controller and test files', function(){
            var expected = [
                'app/modules/core/controllers/foo.js',
                'app/modules/core/tests/unit/foo-controller.spec.js'
            ];

            assert.file(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-directive
     * Directive sub-generator
     */
    describe('angular-directive sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-directive',
                'foo',
                this,{
                    'moduleName': 'core'
                }, done);
        });

        /**
         * Check if the directive and unit test file were successfully created
         */
        it('should create the directive and unit test files', function(){
            var expected = [
                'app/modules/core/directives/foo.js',
                'app/modules/core/tests/unit/foo-directive.spec.js'
            ];
            assert.file(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-filter
     * Filter sub-generator
     */
    describe('angular-filter sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-filter',
                'foo',
                this,{
                    'moduleName': 'core'
                }, done);
        });

        /**
         * Check if the filter and unit test file were successfully created
         */
        it('should create the filter and unit test files', function(){
            var expected = [
                'app/modules/core/filters/foo.js',
                'app/modules/core/tests/unit/foo-filter.spec.js'
            ];
            assert.file(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-route
     * Route sub-generator
     */
    describe('angular-route sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-route',
                'foo',
                this,{
                    'moduleName': 'core',
                    'routePath': 'foo',
                    'viewName':'foo',
                    'controllerName':'foo'
                }, done);
        });

        /**
         * Check if the partial, controller and controller unit test files were successfully created
         */
        it('should create the partial, controller and controller unit test files', function(){
            var expected = [
                'app/modules/core/controllers/foo.js',
                'app/modules/core/tests/unit/foo-controller.spec.js',
                'app/modules/core/views/foo.html',
            ];
            assert.file(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-service
     * Service sub-generator
     */
    describe('angular-service sub-generator', function(){

        describe('angular-service: service', function(){
            before(function(done) {
                runGenerator('angular-service',
                    'serv',
                    this, {
                        'moduleName': 'core',
                        'serviceType' : 'service'
                    }, done);
            });

            //Check if the service was successfully created
            it('should create the service Service js file', function() {
                var expected = [
                    'app/modules/core/services/serv.js'
                ];
                assert.file(expected);
            });
        });

        describe('angular-service: provider', function(){
            before(function(done) {
                runGenerator('angular-service',
                    'prov',
                    this, {
                        'moduleName': 'core',
                        'serviceType' : 'provider'
                    }, done);
            });

            //Check if the service was successfully created
            it('should create the service Provider js file', function() {
                var expected = [
                    'app/modules/core/services/prov.js'
                ];
                assert.file(expected);
            });
        });

        describe('angular-service: factory', function(){
            before(function(done) {
                runGenerator('angular-service',
                    'fact',
                    this, {
                        'moduleName': 'core',
                        'serviceType' : 'factory'
                    }, done);
            });

            //Check if the service was successfully created
            it('should create the service Factory js file', function() {
                var expected = [
                    'app/modules/core/services/fact.js'
                ];
                assert.file(expected);
            });
        });

        describe('angular-service: value', function(){
            before(function(done) {
                runGenerator('angular-service',
                    'valu',
                    this, {
                        'moduleName': 'core',
                        'serviceType' : 'value'
                    }, done);
            });

            //Check if the service was successfully created
            it('should create the service Value js file', function() {
                var expected = [
                    'app/modules/core/services/valu.js'
                ];
                assert.file(expected);
            });
        });

        describe('angular-service: constant', function(){
            before(function(done) {
                runGenerator('angular-service',
                    'cons',
                    this, {
                        'moduleName': 'core',
                        'serviceType' : 'constant'
                    }, done);
            });

            //Check if the service was successfully created
            it('should create the service constant js file', function() {
                var expected = [
                    'app/modules/core/services/cons.js'
                ];
                assert.file(expected);
            });
        });
    });

    /**
     * yo angularjs-cordova:angular-view
     * View sub-generator
     */
    describe('angular-view sub-generator', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-view',
                'foo',
                this,{
                    'moduleName': 'core',
                    'controllerName': true,
                    'addRoute' : true,
                    'routePath': 'foo'
                }, done);
        });

        /**
         * Check if the partial was successfully created
         */
        it('should create the test and controller js file', function(){
            var expected = [
                'app/modules/core/views/foo.html'
            ];
            assert.file(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-test
     * Test sub-generator
     */
    describe('angular-test: (unitTest - controller)', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-test',
                    'foounit',
                    this,{
                        'moduleName': 'core',
                        'testType': 'unitTest',
                        'unitTestType' : 'controller'
                    }, done);
        });

        it('should generate a unit test file for a controller', function(){
            var expected = [
                'app/modules/core/tests/unit/foounit-controller.spec.js'
            ];
            assert.file(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-test
     * Test generation of service unit test file from the angular-test sub-generator
     */
    describe('angular-test: (unitTest - services)', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-test',
                    'foounit',
                    this,{
                        'moduleName': 'core',
                        'testType': 'unitTest',
                        'unitTestType' : 'service'
                    }, done);
        });

        it('should generate a unit test file for a service', function(){
            var expected = [
                'app/modules/core/tests/unit/foounit-service.spec.js'
            ];
            assert.file(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-test
     * Test generation of directive unit test file from the angular-test sub-generator
     */
    describe('angular-test: (unitTest - directives)', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-test',
                    'foounit',
                    this,{
                        'moduleName': 'core',
                        'testType': 'unitTest',
                        'unitTestType' : 'directive'
                    }, done);
        });

        it('should generate a unit test file for a directive', function(){
            var expected = [
                'app/modules/core/tests/unit/foounit-directive.spec.js'
            ];
            assert.file(expected);
        });
    });

    /**
     * yo angularjs-cordova:angular-test
     * Test generation of filter unit test file from the angular-test sub-generator
     */
    describe('angular-test: (unitTest - filters)', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        before(function(done){
            runGenerator('angular-test',
                    'foounit',
                    this,{
                        'moduleName': 'core',
                        'testType': 'unitTest',
                        'unitTestType' : 'filter'
                    }, done);
        });

        it('should generate a unit test file for a filter', function(){
            var expected = [
                'app/modules/core/tests/unit/foounit-filter.spec.js'
            ];
            assert.file(expected);
        });
    });

    /**
     * angularjs-cordova: angular-test (e2e test option)
     */
    describe('angular-test: (e2e test option)', function(){
        /**
         * Run the sub-generator to generate the necessary files before executing any tests on it
         */
        beforeEach(function(done){
            runGenerator('angular-test',
                'foo',
                this,{
                    'moduleName': 'core',
                    'testType': 'e2eTest'
                }, done);
        });

        it('should generate e2e test folder which contains page object and test file', function(){
            var expected = [
                'app/modules/core/tests/e2e/foo.po.js',
                'app/modules/core/tests/e2e/foo.spec.js'
            ];
            assert.file(expected);
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
