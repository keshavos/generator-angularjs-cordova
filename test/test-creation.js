/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var fsextra = require('fs-extra');

describe('angularjs-cordova generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('angularjs-cordova:app', [
        '../../app'
      ]);

      done();
    }.bind(this));
  });


    /*it('creates expected files when creating basic cordova app', function (done) {
        this.timeout(15000);
        var expected = [
            // add files you expect to exist here.
           'www/index.html'
        ];

        helpers.mockPrompt(this.app, {
            'appname': 'HelloWorld',
            'packagename': 'com.angularjscordova.test',
            'platforms': ['Android'],
            'plugins': ['Splashscreen'],
            'angularApp': false
        });

        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });*/


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

    helpers.mockPrompt(this.app, {
      'appname': 'HelloWorld',
      'packagename': 'com.angularjscordova.test',
      'platforms': ['Android'],
      'plugins': ['Splashscreen'],
      'angularApp': true,
      'angularjsName': 'ngCordova',
      'appDescription': 'AppDescription',
      'appKeywords': 'Hello World',
      'appAuthor': 'Yeoman',
      'modules': true,
      'addArticleExample': true
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
        helpers.assertFile(expected);
        done();
    });
  });
});
