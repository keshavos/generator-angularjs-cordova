'use strict';


module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        yeoman: {
            app: 'app',
            temp: 'temp',
            dist: 'www'
        },

        watch: {

            bower: {
                files: ['bower.json'],
                tasks: ['injector']
            },

            js: {
                files: ['<%= yeoman.app %>/modules/*/*.js', '<%= yeoman.app %>/modules/*/config/*.js', '<%= yeoman.app %>/modules/*/controllers/*.js', '<%= yeoman.app %>/modules/*/services/*.js', '<%= yeoman.app %>/modules/*/directives/*.js', '<%= yeoman.app %>/modules/*/filters/*.js'],
                tasks: ['newer:jshint:all', 'ngdocs'],
                options: {
                    livereload: true
                }
            },

            jsUnitTest: {
                files: ['<%= yeoman.app %>/modules/*/tests/unit/*.js'],
                tasks: ['karma:unit']
            },

            styles: {
                files: ['<%= yeoman.app %>/css/**/*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },

            gruntfile: {
                files: ['Gruntfile.js']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
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
            },
            dist: {
                options: {
                    base: ['<%= yeoman.dist %>']
                }
            },
            docs: {
                options: {
                    base: ['docs/']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js'
            ],
            unitTest: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= yeoman.app %>/modules/*/tests/unit/*.js']
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            docs: {
                files: [{
                    dot: true,
                    src: [
                        'docs/'
                    ]
                }]
            },
            server: '.tmp'
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        /**
         * Generate AngularJs Documentation
        */
        ngdocs : {
            options: {
                dest: 'docs',
                scripts: [
                    'app/lib/jquery/dist/jquery.js',
                    'app/lib/bootstrap/dist/js/bootstrap.js',
                    'app/lib/angular/angular.js',
                    'app/lib/angular-resource/angular-resource.js',
                    'app/lib/angular-mocks/angular-mocks.js',
                    'app/lib/angular-cookies/angular-cookies.js',
                    'app/lib/angular-sanitize/angular-sanitize.js',
                    'app/lib/angular-animate/angular-animate.js',
                    'app/lib/angular-touch/angular-touch.js',
                    'app/lib/angular-bootstrap/ui-bootstrap.js',
                    'app/lib/angular-ui-utils/ui-utils.js',
                    'app/lib/angular-ui-router/release/angular-ui-router.js'
                ],
                html5Mode: false,
                startPage: '/api',
                title: 'App Documentation',
                titleLink: '/api',
                bestMatch: true
            },
            api: {
                src: ['app/js/*.js', 'app/modules/**/*.js'],
                title: 'App Documentation'
            }
        },

        /**
        * Strip comments from the distribution code
        */
        comments: {
            dist: {
                options: {
                    singleline: true,
                    multiline: true
                },
                src: [ 'www/scripts/custom.js']
            },
        },

        //Injects all the scripts into the index html file
        injector: {
            options: {
                addRootSlash: false,
                ignorePath: 'app/',
                bowerPrefix: 'bower',
            },
            localDependencies: {
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
            },
            bowerDependencies: {
                files: {
                    'app/index.html': ['bower.json'],
                }
            },
            karmaDependencies: {
                options: {
                    ignorePath: '',
                    transform: function(filepath) {
                        return '\'' + filepath + '\',';
                    }
                },
                files: {
                    'karma.conf.js': ['bower.json'],
                }
            }
        },
        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/app/js/*.js',
                        '<%= yeoman.dist %>/app/modules/*/*.js',
                        '<%= yeoman.dist %>/app/modules/*/config/*.js',
                        '<%= yeoman.dist %>/app/modules/*/services/*.js',
                        '<%= yeoman.dist %>/app/modules/*/directives/*.js',
                        '<%= yeoman.dist %>/app/modules/*/filters/*.js',
                        '<%= yeoman.dist %>/app/modules/*/controllers/*.js',
                        '<%= yeoman.dist %>/app/css/**/*.css',
                        '<%= yeoman.dist %>/app/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/css/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        cssmin: {
            options: {
                root: '<%= yeoman.app %>/css/**/*.css'
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/img'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/img'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', '<%= yeoman.app %>/modules/*/views/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/app/index.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'index.html',
                        'modules/*/views/*.html',
                        'img/{,*/}*.{webp}',
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/img',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/css',
                dest: '.tmp/css/',
                src: '**/*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            console.log('dist serve');
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'injector',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('docs', [
        'clean:docs',
        'ngdocs',
        'connect:docs:keepalive',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'injector',
        'ngdocs',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'rev',
        'usemin',
        'htmlmin',
        'comments:dist'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
