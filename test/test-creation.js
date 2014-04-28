/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var fsextra = require('fs-extra');
var _ = require('underscore.string');

describe('angularjs-cordova generator', function () {

    var angularjsCordova;

    beforeEach(function (done) {
        var deps = [
            '../../app'
        ];
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                done(err);
            }
            angularjsCordova = helpers.createGenerator('angularjs-cordova:app', deps);
            angularjsCordova.options['skip-install'] = true;
            done();
        });
    });

    it('creates expected files when creating AngularJs-Cordova route', function (done) {
    this.timeout(15000);
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



    helpers.mockPrompt(angularjsCordova, {
      'appname': 'HelloWorld',
      'packagename': 'com.angularjscordova.test',
      'platforms': ['Android'],
      'plugins': ['Splashscreen'],
      'angularApp': true,
      'angularjsName': 'ngCordova',
      'appDescription': 'AppDescription',
      'appKeywords': 'Hello World',
      'appAuthor': 'Yeoman',
      'modules': true
    });

    angularjsCordova.options['skip-install'] = true;
    angularjsCordova.run({}, function () {
        helpers.assertFile(expected);
        done();
    });
  });

    function generatorTest(generatorType, specType, targetDirectory, scriptNameFn, specNameFn, suffix, done) {
        var angularGenerator;
        var name = 'foo';
        var deps = [path.join('../..', generatorType)];
        angularGenerator = helpers.createGenerator('angularjs-cordova:' + generatorType, deps, [name]);

        helpers.mockPrompt(angularjsCordova, {
            'appname': 'HelloWorld',
            'packagename': 'com.angularjscordova.test',
            'platforms': ['Android'],
            'plugins': ['Splashscreen'],
            'angularApp': true,
            'angularjsName': 'ngCordova',
            'appDescription': 'AppDescription',
            'appKeywords': 'Hello World',
            'appAuthor': 'Yeoman',
            'modules': true
        });


        angularjsCordova.run([], function (){
            angularGenerator.run([], function () {
               helpers.mockPrompt('', {'moduleName' : 'core'});
                helpers.assertFiles([
                    [path.join('www/app/modules/core/', targetDirectory, name + '.js'), new RegExp(specType + '\\(\'' + scriptNameFn(name) + suffix + '\'', 'g')],
                    [path.join('www/app/modules/core/tests', name + '.spec.js'), new RegExp('describe\\(\'' + _.classify(specType) + ': ' + specNameFn(name) + suffix + '\'', 'g')]
                ]);
                done();
           });
        });
    }

    describe('Controller', function () {
        it('should generate a new controller', function (done) {
            this.timeout(15000);
            generatorTest('angular-controller', 'controller', 'controllers', _.classify, _.classify, 'Controller', done);
        });
    });

    /*describe('Directive', function () {
        it('should generate a new directive', function (done) {
            generatorTest('angular-directive', 'directive', 'directives', _.camelize, _.camelize, '', done);
        });
    });

    describe('Filter', function () {
        it('should generate a new filter', function (done) {
            generatorTest('angular-filter', 'filter', 'filters', _.camelize, _.camelize, '', done);
        });
    });*/

});
