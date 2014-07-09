'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    grunt.initConfig({

        yeoman: {
            app: 'app',
            dist: 'www'
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%%= yeoman.app %>/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['<%%= yeoman.app %>/modules/**/tests/unit/*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%%= yeoman.app %>/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        'app/',
                        ''
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        ''
                    ]
                }
            },
            dist: {
                options: {
                  base: '<%%= yeoman.dist %>'
                }
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: ['copy:styles'],
            test: ['copy:styles'],
            dist: ['copy:styles', 'imagemin', 'svgmin']
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: ['Gruntfile.js']
            }
        },

        // Automatically inject Bower components into the app
        bowerInstall: {
            target: {
                src: [
                    'app/index.html'
                ]
            }
        },

        //Injects all the scripts into the index html file
        //TODO a bit messy atm. Could be improved !
        injector: {
            options: {
                addRootSlash : false,
                transform : function(filepath, index, length){
                    filepath = filepath.substr(4,filepath.length);
                    switch(filepath.substr((~-filepath.lastIndexOf(".") >>> 0) + 2)){
                        case 'js' : return filepath = '<script src="'+filepath+'"></script>'
                            break;
                        case 'css': return filepath = '<link rel="stylesheet" href="'+filepath+'" />';
                            break;
                        default: console.log('File extension not supported');
                            break;
                    }
                }
            },
            local_dependencies: {
                files: {
                    'app/index.html': [
                        'app/js/config.js',
                        'app/js/application.js',
                        'app/modules/*/*.js',
                        'app/modules/*/config/*.js',
                        'app/modules/*/services/*.js',
                        'app/modules/*/directives/*.js',
                        'app/modules/*/filters/*.js',
                        'app/modules/*/controllers/*.js',
                        'app/css/**/*.css'
                    ]
                }
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'app/tests/unit/karma.conf.js',
                singleRun: true
            }
        }

    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        grunt.task.run([
            'bowerInstall',
            'injector',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('build', [
        'bowerInstall',
        'injector'
    ]);

    /**
     * Unit tests with karma or e2e tests with protractor
     */
    grunt.registerTask('test', [

    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};
