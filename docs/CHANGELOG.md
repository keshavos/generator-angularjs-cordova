## Changelog

* [1.0.0](https://github.com/keshavos/generator-angularjs-cordova/milestones/1.0.0)

* [0.2.4](https://github.com/keshavos/generator-angularjs-cordova/milestones/0.2.4)

* [0.2.3](https://github.com/keshavos/generator-angularjs-cordova/issues?q=milestone%3A0.2.3)
    * Support for generating angular documentation [#2](https://github.com/keshavos/generator-angularjs-cordova/issues/2)
    * Add option to prompt user to add type of service [#3](https://github.com/keshavos/generator-angularjs-cordova/issues/3)
    * Code format of templates and sample app [#4](https://github.com/keshavos/generator-angularjs-cordova/issues/4)
    * Fix bug adding Windows 8 platform  [#5](https://github.com/keshavos/generator-angularjs-cordova/issues/5)

* 0.2.2
    * Replace module name input with list of available modules
    * With any of the sub-generators, the prompt which used to ask the user which module the file should be generated under, all available modules are listed for user to pick from
        * eg `yo angularjs-cordova:angular-filter foo` will now produce the following prompt:
        ```
        [?] Which module does this filter belongs to? (Use arrow keys)
        > core
          test1
          test2
          test3
        ```
* 0.2.1
    * Updated README
    * Development folder is now `app/` in the root folder. The source files are copied to `www/` with grunt tasks
    * Remove option to use the cordova template app
    * `angular-test` sub-generator prompts to generate test template for unit (targeting controller, service, directive or filter) or end-to-end test
    * Add grunt tasks to perform build tasks which copies only required source to `www/` for build
    * Add grunt tasks
        * `grunt serve` serves the development app on port 9000
        * `grunt build` performs build related tasks and moves required source to `www/`
        * `grunt karma` runs karma tests
        * `protractor protractor-desktop-config.js` runs protractor e2e tests
            * Requires webdriver to be started, app running
            * Requires app to be running on `http://127.0.0.1:9000/`
    * Pre-configured protractor config and working e2e example of default app

* 0.1.4
    * Upgrade to cordova 3.5
    * Better dependency declarations.
    * More tests
    * Refined documentation/ README

* 0.0.2
    * Fixes travis file to include bower required for passing tests

* 0.0.1
    * Minimal Viable Product which works as expected
