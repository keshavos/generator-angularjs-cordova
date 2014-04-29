// Generated on 2014-04-29 using generator-angularjs-cordova 0.0.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: 'www/app'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%= yeoman.app %>/js/{,*/}*.js', '<%= yeoman.app %>/modules/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
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
                    'www/index.html'
                ],
                js: {
                    src: ['www/app/js/{,*/}*.{js}', 'www/app/modules/{,*/}*.{js}']
                },
                css:{
                    src: ['www/app/css/{,*/}*.{css}']
                }
            }
        },

        injector: {
            options: {},
            local_dependencies: {
                files: {
                    'www/index.html': ['www/app/js/**/*.js', 'www/app/modules/**/*.js', 'www/app/css/**/*.css']
                }
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }

});


grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    grunt.task.run([
        'bowerInstall',
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

grunt.registerTask('default', [
    'newer:jshint',
    'build'
]);
};
