# AngularJS Cordova generator
[![Build Status](https://travis-ci.org/keshavos/generator-angularjs-cordova.svg)](https://travis-ci.org/keshavos/generator-angularjs-cordova)


[![NPM](https://nodei.co/npm/generator-angularjs-cordova.png?downloads=true)](https://nodei.co/npm/generator-angularjs-cordova/)


## [Changelog](https://github.com/keshavos/generator-angularjs-cordova/blob/master/docs/CHANGELOG.md)

## Overview

A yeoman generator which combines the best features and practices to initialise and scaffold an AngularJs based cordova mobile app using a [module based approach](http://meanjs.org/docs.html#angularjs-modules). Extended from the already available yeoman generators such as [angular generator](https://github.com/yeoman/generator-angular) and [MEAN](https://github.com/meanjs/generator-meanjs).

### Technologies

- [Cordova](http://phonegap.com)
- [AngularJS](http://angularjs.org)
- [AngularUI](http://angular-ui.github.io/)

### Features

* [Vertical Module approach](http://meanjs.org/docs.html#angularjs-modules) for initializing and scaffolding the AngularJS application.
* CLI user-prompt based [sub-generators](#available-sub-generators), which generate angular templates
* Templates generated based on industry standard best-practices<sup>*</sup>


## Installation/ Quick start

```
$> npm install -g yo

$> npm install -g generator-angularjs-cordova

$> mkdir testapp && cd testapp

$> yo angularjs-cordova

```
This presents you with a series of options to initialize and customize your application.

##Grunt tasks

- `grunt serve` - run the app from within the `app/`, on a browser and trigger grunt tasks up on changes in the fileset

- `grunt serve --dist` - run the app from within the `www/`, on a browser

- `grunt build` - perform various build related tasks and copies processed source to `www/` (clean, minify, inject dependencies etc.,)

- `grunt docs `- generate documentation from the dockblocks of the AngularJS source code

- `grunt test` - run karma unit tests

##Cordova tasks
`grunt build` task is run as a cordova pre-build hook.

```
e.g. $> cordova build android
```
will trigger a `grunt build` task before performing any cordova's android build related tasks.

For a list of all available cordova commands, use:

`$> cordova --help`


###e2e tests

To run the e2e protractor tests which come shipped with the sample app, run the following commands in parallel

```
$> webdriver-manager update        ###update webdriver
$> webdriver-manager start         ###start the webdriver
$> grunt serve                     ###serves the app on http://127.0.0.1:9000/
$> protractor protractor-desktop-config.js   ###run the protractor tests
```

###Available sub-generators

Use any of the following sub-generators for extending the AngularJS application

* [angularjs-cordova](#application-generator)
* [angularjs-cordova:angular-config](#angularjs-config-sub-generator)
* [angularjs-cordova:angular-controller](#angularjs-controller-sub-generator)
* [angularjs-cordova:angular-directive](#angularjs-directive-sub-generator)
* [angularjs-cordova:angular-filter](#angularjs-filter-sub-generator)
* [angularjs-cordova:angular-module](#angularjs-module-sub-generator)
* [angularjs-cordova:angular-route](#angularjs-route-sub-generator)
* [angularjs-cordova:angular-service](#angularjs-service-sub-generator)
* [angularjs-cordova:angular-test](#angularjs-test-sub-generator)
* [angularjs-cordova:angular-view](#angularjs-view-sub-generator)


## Application Generator

Generates an AngularJs application within `app/`.

```
$> yo angularjs-cordova
```

The generator will ask you a few questions about your new application and will generate it for you.

**NOTE:** This sub-generator should be used only once to initialise the application. Once generated, use specific sub-generators to further extend the application.

## AngularJS Module Sub-Generator

Creates and initialises a module within the `modules/`.

```
$> yo angularjs-cordova:angular-module <module-name>
```

Example scenario/ usage of modules:
- login (contain all login related features)
- register (contain  all registration related features)
- core (contain shared features which can be used by all other modules

## AngularJS Route Sub-Generator

The sub-generator will prompt for information about the required controller, view and routing path and generates the required files, inserts routing logic in the modules' **config/routes.js** file.

```
$> yo angularjs-cordova:angular-route <route-name>
```

## AngularJS Controller Sub-Generator

Generates an new AngularJS controller in the specified module's **controllers/**.

```
$> yo angularjs-cordova:angular-controller <controller-name>
```

## AngularJS View Sub-Generator

Generates an new AngularJS view file in the specified modules' **views/** and adds routing config in **config/routes.js**.

```
$> yo angularjs-cordova:angular-view <view-name>
```

## AngularJS Service Sub-Generator

Prompts user for type of AngularJS service file required (provider, service, factory) and generates the required file within the modules' **services** folder.

```
$> yo angularjs-cordova:angular-service <service-name>
```

## AngularJS Directive Sub-Generator

Generates an AngularJS directive in the specified modules' **directives/**.
```
$> yo angularjs-cordova:angular-directive <directive-name>
```

## AngularJS Filter Sub-Generator

Generates an AngularJS filter in a specified module's **filters/**.

```
$> yo angularjs-cordova:angular-filter <filter-name>
```

## AngularJS Config Sub-Generator

Generates an AngularJS config file within the modules' **config/**

```
$> yo angularjs-cordova:angular-config <config-name>
```

## AngularJS Test Sub-Generator

Prompts user for type of test file requried (unit/ e2e) and generates a template test file within the modules' **tests/unit** or **tests/e2e** accordingly.

```
$> yo angularjs-cordova:angular-test <name>
```

##Contributors

For a list of all contributors, please see the [contributions graph](https://github.com/keshavos/generator-angularjs-cordova/graphs/contributors), as this would be updated based on any accepted PR's.

##Contributions

A contributing guideline document will be updated soon. Please do report any issues/ bugs/ feature requests as issues and mark them with appropriate labels to be picked up on by interested devs.


## LICENSE

The MIT License (MIT)

Copyright (c) 2015 Keshav OS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

