# AngularJS Cordova generator [![Build Status] (https://api.travis-ci.org/keshavos/generator-angularjs-cordova.svg?branch=master)](https://travis-ci.org/keshavos/generator-angularjs-cordova)

[![NPM](https://nodei.co/npm/generator-angularjs-cordova.png?downloads=true)](https://nodei.co/npm/generator-angularjs-cordova/)


## Changelog

* 0.1.0
    * Uprade to cordova 3.5
    * Better dependency declarations.
    * More tests
    * Refined documentation/ README

* 0.0.2
    * Fixes travis file to include bower required for passing tests

* 0.0.1
    * Minimal Viable Product which works as expected


## Installation

```
npm install -g generator-angularjs-cordova
```

## Overview

A yeoman generator which combines the best features and practices for cordova based mobile app development  extended from the already available yeoman generators such as [yeoman-angular framework](https://github.com/yeoman/generator-angular) and the [angularjs-cordova](http://angularjs-cordova.org/) generators.

### Technologies:

* [Cordova](http://phonegap.com) - for packaging your HTML, CSS and Javascript into deployable mobile apps.
This generator currently has not been tested for its compatibility with phonegap. It might be added in the future.

* [AngularJS](http://angularjs.org) - One of the most popular Javascript MVC/MV** frameworks that is available out there

* [AngularUI](http://angular-ui.github.io/) - Includes Twitter bootstrap 3 and allows for developing responsive pages. It ships with various pre-defined templates.

### Features

* Uses the [Vertical Module approach](http://meanjs.org/docs.html#angularjs-modules) for initializing and extending the angularjs application.
The project structure suggested by the Angular team with the [angular-seed](https://github.com/angular/angular-seed) works well but can get quite difficult to maintain and extend as the project grows. The vertical approach when used along the generator removes the hassle involved in manually including and injecting new services, defining routes and binding the views. It also allows for developers to work on individual modules which can then be combined seamlessly into the project.


## Getting Started

Before you begin make sure you have the [yo scaffolding tool](http://yeoman.io/generators.html) installed(As it is part of the Yeoman tool set you might have installed it before). To globally install *yo* you will need to use npm:

**Note:** Your user might not have the permissions to install package globally, so use a super user or **sudo**.

```
$ npm install -g yo
```

Once ready, you should be able to use this with

```
npm install -g generator-angularjs-cordova
```

Create and navigate into a new directory and run the yo command to initialize a new project

```
mkdir testapp && cd testapp
yo angularjs-cordova
```

This presents you with a series of options to initialize and customize your application

### Available generators

Once setup, you can use any of the following sub-generators for extending your AngularJs application

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

The generators does not provide sub-generators for the cordova side of the application. This is with the intention that the onus of using cordova commands should be on the developer as this can make for remembering the command list an overhead.

All the available cordova commands can be listed by typing the following in the command line:

`cordova help`

As per **cordova v3.5.0-0.2.4**, these are the available options

Synopsis

    cordova command [options]

Global Commands

    create <PATH> [ID [NAME [CONFIG]]] ....... creates a Cordova project in the specified PATH, with
                                               ID reverse-domain-style package name - used in <widget id>
                                               NAME is a human readable field
                                               CONFIG is a json string whose key/values will be included
                                               in [PATH]/.cordova/config.json
                  [--copy-from|src=<PATH>] ... use custom www assets instead of the stock Cordova hello-world.
                  [--link-to=<PATH>] ......... symlink to custom www assets without creating a copy.

    help ..................................... shows this syntax summary

    info ..................................... print out useful information helpful for submitting bug
                                               reports and getting help.  Creates an info.txt file at the
                                               base of your project

Project-Level Commands

    platform(s) [{add|remove|rm} <PLATFORM>] .. add or remove a specified PLATFORM, OR
                [{list|ls}] ................... list all installed and available platforms
                [{update|up} <PLATFORM>] ...... update the version of Cordova used for a specific
                                                PLATFORM; use after updating the CLI.
                [check] ....................... list platforms which can be updated by `platform update`

    plugin add <SPEC1> [<SPEC2> ...] .......... SPEC can be a plugin ID, a local path, or a git URL.
               [--searchpath <directory>] ..... When looking up plugins by ID, look in this directory and
                                                each of its subdirectories for the plugin before hitting the registry.
                                                Multiple search paths can be used by either specifying the flag multiple
                                                times, or by separating paths with a delimiter (: on 'nix, ; on Windows).

    plugin(s) rm <plugin_id1> [<plugin_id2>] .. remove a plugin with the given IDs.

              [{ls|list}] ..................... list all currently installed plugins
              [search <keyword1 keyword2...>] . search the plugin registry for plugins matching the keywords

    prepare [PLATFORM..] ...................... copies files for specified platforms, or all platforms,
                                                so that the project is ready to build in each SDK

    compile [PLATFORM..] ...................... builds the app for specified platforms, or all platforms

    build [PLATFORM...] ....................... shortcut for prepare, then compile

    run [--debug|--release]
        [--device|--emulator|--target=FOO]
        [PLATFORM] ............................ deploys app on specified platform devices / emulators

    emulate [PLATFORM...] ..................... alias for "run --emulator"

    serve [PORT] .............................. runs a local web server for www/ assets. Port defaults to 8000.
                                                Access projects at: http://HOST_IP:PORT/PLATFORM/www

Command-line Flags/Options

    -v, --version ............................. prints out this utility's version
    -d, --verbose ............................. debug mode produces verbose log output for all activity,
                                                including output of sub-commands cordova invokes

## Application Generator

The application generator will help you create a fresh copy of a AngularJs application in your working Cordova folder.


```
$ yo angularjs-cordova
```

The generator will ask you a few questions about your new application and will generate it for you.



Now, the application generator does a great job scaffolding a whole application, but daily work requires us to repeat a lot of structured code. For this purpose we provided you with some sub-generators to help you speed up your development.


## AngularJS Module Sub-Generator

Another redundant task is creating a new AngularJS module structure. For this purpose you can use the Angular module sub-generator. It will create the proper folder structure for you and the module initialization file. Creating a new AngularJS module is simple:


```
$ yo angularjs-cordova:angular-module <module-name>
```

The sub-generator will ask for more information about your folder structure, and will create the empty new AngularJS module. Now, to fill that new module with your business logic, we provided you with several AngularJS entities sub-generators.



## AngularJS Route Sub-Generator

To construct your module you will often need to create a new route. The AngularJS route sub-generator will help you create a view, controller and a proper route in your module **routes.js** file. If it can't find the module routes file the sub-generator will create one for you. Creating a new AngularJS route will involve executing this command:



```
$ yo angularjs-cordova:angular-route <route-name>
```

The sub-generator will ask for more information about your controller, view and routing URL, and will generate the appropriate files for you.



## AngularJS Controller Sub-Generator

The AngularJS Controller sub-generator will create a new AngularJS controller in the specified module's **controllers** folder. To create a new AngularJS controller run *yo* again by using this command:


```
$ yo angularjs-cordova:angular-controller <controller-name>
```

The sub-generator will ask you for the module name under which you would like to create your new controller, and will create a new AngularJS controller file in that module **controllers** folder and a test file in the **tests** folder.


**Don't forget!** This time you pass the controller name as an argument.



## AngularJS View Sub-Generator

Once you have your controller file ready, you may want to add a view that makes use of this controller. The AngularJS view sub-generator will create a new AngularJS view in thr specified module's **views** folder, and will allow you to add a route definition for it. To create a new AngularJS view you will need to execute this command:


```
$ yo angularjs-cordova:angular-view <view-name>
```

The sub-generator will ask you for the module name under which you would like to create your new view, and some additional routing information. It will then create a new view file in that module's **views** folder and add a routing state to the module **routes.js** file. If it can't find the module routes file it will create one for you.



## AngularJS Service Sub-Generator

The AngularJS service sub-generator will create a new AngularJS service in the specified module's **services** folder. To create a new AngularJS service you will need to execute this command:


```
$ yo angularjs-cordova:angular-service <service-name>
```

The sub-generator will ask you for the module name under which you would like to create your new service, and will create a new AngularJS service file in that module's **services** folder.



## AngularJS Directive Sub-Generator

The AngularJS directive sub-generator will create a new AngularJS directive in the specified module's **directives** folder. Creating a new AngularJS directive should already look familiar:


```
$ yo angularjs-cordova:angular-directive <directive-name>
```

The sub-generator will ask you for the module name under which you would like to create your new directive, and will create a new AngularJS directive file in that module's **directives** folder.



## AngularJS Filter Sub-Generator

The AngularJS filter sub-generator will create a new AngularJS filter in a specified module's **filters** folder. To create a new AngularJS filter you need to call yo again:


```
$ yo angularjs-cordova:angular-filter <filter-name>
```

The sub-generator will ask you for the module name under which you would like to create your new filter, and will create a new AngularJS filter file in that module **filters** folder.



## AngularJS Config Sub-Generator

The AngularJS config sub-generator will create a new AngularJS config section in a specified module's **config** folder. To create a new AngularJS config file just call yo:


```
$ yo angularjs-cordova:angular-config <config-name>
```

The sub-generator will ask you for the module name under which you would like to create your new config, and will create a new AngularJS config file in that module's **config** folder.



## AngularJS Test Sub-Generator

Your MEAN application comes pre-bundled with the Karma test runner and Jasmine testing framework. To test your AngularJS controllers you'll need to create a test file, which Karma will later use to run the tests. For this purpose we provided you with the AngularJS test sub-generator. Creating a new AngularJS test is effortless, just execute this command:


```
$ yo angularjs-cordova:angular-test <controller-name>
```

This will create a test file for your controller, and if the sub-generator doesn't find the specified controller file, it will create one for you.


**Don't forget!** You are supposed to pass the controller name as an argument.

###
## License

MIT
