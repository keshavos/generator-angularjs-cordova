# AngularJS Cordova generator

##Overview

Combining the best features from the already available yeoman generators such as [yeoman-angular framework](https://github.com/yeoman/generator-angular) and the [angularjs-cordova](http://angularjs-cordova.org/) generators. 

The purpose of this generator is to allow the user to create and extend an AngularJS-phonegap application

* Uses a [Vertical Module](http://angularjs-cordova.org/docs.html#angularjs-modules) approach to extending AngularJs apps The pros and cons of the [angular-seed](https://github.com/angular/angular-seed) project and hence a modular approach to extending AngularJs apps is mentioned [here](http://angularjs-cordova.org/docs.html#angularjs-modules).


## Getting Started
Before you begin make sure you have the [yo scaffolding tool](http://yeoman.io/generators.html) installed(As it is part of the Yeoman tool set you might have installed it before). To globally install *yo* you will need to use npm:


```
$ npm install -g yo
```


**Note:** Your user might not have the permissions to install package globally, so use a super user or **sudo**.


Once ready, you should be able to use this with 


```
npm install -g generator-angularjs-cordova
```



### Proposed Yeoman Generators for AngularJS

* [angularjs-cordova](#application-generator)
* [angularjs-cordova:crud-module](#crud-module-sub-generator)
* [angularjs-cordova:angular-module](#angularjs-module-sub-generator)
* [angularjs-cordova:angular-route](#angularjs-route-sub-generator)
* [angularjs-cordova:angular-controller](#angularjs-controller-sub-generator)
* [angularjs-cordova:angular-view](#angularjs-view-sub-generator)
* [angularjs-cordova:angular-service](#angularjs-service-sub-generator)
* [angularjs-cordova:angular-directive](#angularjs-directive-sub-generator)
* [angularjs-cordova:angular-filter](#angularjs-filter-sub-generator)
* [angularjs-cordova:angular-config](#angularjs-config-sub-generator)
* [angularjs-cordova:angular-test](#angularjs-test-sub-generator)

### Proposed Yeoman Generators for Cordova 

* [angularjs-cordova](#application-generator)
* [angularjs-cordova:cordova-name](#cordova-app-name)
* [angularjs-cordova:cordova-id](#cordova-app-id)
* [angularjs-cordova:cordova-platform-add](#cordova-platform-installer)
* [angularjs-cordova:cordova-platform-remove](#cordova-platform-uninstaller)
* [angularjs-cordova:cordova-platform-build](#cordova-platform-build)
* [angularjs-cordova:cordova-platform-](#cordova-platform-build)
* [angularjs-cordova:cordova-plugin-list](#cordova-plugin-list)
* [angularjs-cordova:cordova-plugin-add](#cordova-plugin-installer)
* [angularjs-cordova:cordova-plugin-remove](#cordova-platform-uninstaller)

## Application Generator

The application generator will help you create a fresh copy of a AngularJs application in your working Cordova folder.


```
$ yo angularjs-cordova
```

The generator will ask you a few questions about your new application and will generate it for you.


```
$ grunt
```

Now, the application generator does a great job scaffolding a whole application, but daily work requires us to repeat a lot of structured code. For this purpose we provided you with some sub-generators to help you speed up your development.



## CRUD Module Sub-Generator

The CRUD module sub-generator will help you create a new CRUD module, similar to the article sample provided with the project. To create a new CRUD module you will need to use *yo* again:


```
$ yo angularjs-cordova:crud-module <module-name>
```

This will create both AngularJS and Express files supporting full CRUD functionality, and add the Karma and Mocha tests.


**Note:** Don’t forget to use your module name as an argument when calling the CRUD module sub-generator.



## AngularJS Module Sub-Generator

Another redundant task is creating a new AngularJS module structure. For this purpose you can use the Angular module sub-generator. It will create the proper folder structure for you and the module initialization file. Creating a new AngularJS module is simple:


```
$ yo angularjs-cordova:angular-module <module-name>
```

The sub-generator will ask for more information about your folder structure, and will create the empty new AngularJS module. Now, to fill that new module with your business logic, we provided you with several AngularJS entities sub-generators.



## AngularJS Route Sub-Generator

To construct your module you will often need to create a new route. The AngularJS route sub-generator will help you create a view, controller and a proper route in your module **routes.js** file. If it can’t find the module routes file the sub-generator will create one for you. Creating a new AngularJS route will involve executing this command:



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


**Don’t forget!** This time you pass the controller name as an argument. 



## AngularJS View Sub-Generator

Once you have your controller file ready, you may want to add a view that makes use of this controller. The AngularJS view sub-generator will create a new AngularJS view in thr specified module's **views** folder, and will allow you to add a route definition for it. To create a new AngularJS view you will need to execute this command:


```
$ yo angularjs-cordova:angular-view <view-name>
```

The sub-generator will ask you for the module name under which you would like to create your new view, and some additional routing information. It will then create a new view file in that module's **views** folder and add a routing state to the module **routes.js** file. If it can’t find the module routes file it will create one for you.



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

Your MEAN application comes pre-bundled with the Karma test runner and Jasmine testing framework. To test your AngularJS controllers you’ll need to create a test file, which Karma will later use to run the tests. For this purpose we provided you with the AngularJS test sub-generator. Creating a new AngularJS test is effortless, just execute this command:


```
$ yo angularjs-cordova:angular-test <controller-name> 
```

This will create a test file for your controller, and if the sub-generator doesn’t find the specified controller file, it will create one for you.


**Don’t forget!** You're suppose to pass the controller name as an argument. 

### 
## License

MIT
