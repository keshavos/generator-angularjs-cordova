// Generated on 2014-04-29 using generator-angularjs-cordova 0.0.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var config = {
            // configurable paths
            app: 'app',
			tmp: '.tmp',
			bwc : 'app/app/lib',
			dist : 'www'
        };

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,	
	   
		watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%%= config.app %>/app/js/{,*/}*.js', '<%%= config.app %>/app/modules/{,**/}*.js'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%%= config.app %>/app/css/{,*/}*.css'],
                tasks: ['autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
			livereload: {
                options: {
                    livereload: true,
                },
				tasks: ['processhtml:server'],
                files: [
					'<%%= config.app %>/{,**/}*.html',
                    '<%%= config.app %>/app/css/{,*/}*.css',
                    '<%%= config.app %>/app/img/{,*/}*'
                ]
            }
        },
		
		// Empties folders to start fresh
        clean: {
			options: { force: true },
            server: {
				src:[
					'<%%= config.tmp %>'
				]
			},
			dist: {
				src:[
					'<%%= config.tmp %>'
				]
			}
        },
	
		 // Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%%=config.app%>/app/css/',
					src: '{,*/}*.css',
					dest: '<%%=config.tmp%>/app/css/'
				}]
			}
		},
		
       // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.app %>',
                    dest: '<%%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',                       
                        'app/modules/{,**/}*.html',						
                    ]
                },
                {
                expand: true,
                dot: true,
                cwd: '<%%= config.app %>/app/lib/fontawesome/fonts/',
                src: ['*.*'],
                dest: '<%%= config.dist %>/app/fonts'
            }
                ]
            }
        },

        // Run some tasks in parallel to speed up build process
         concurrent: {
            dist: [
                'copy:dist'
            ]
        },		
		
		// Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: ['<%%= config.app %>/index.html'],
                //ignorePath: '/',
            }
        },
		
		// Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%%= config.dist %>'
            },
            html: '<%%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%%= config.dist %>', '/images']
            },
            html: ['<%%= config.dist %>/{,*/}*.html'],
            css: ['<%%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/app/img',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%%= config.dist %>/app/img'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/app/img/',
                    src: '{,*/}*.svg',
                    dest: '<%%= config.dist %>/app/img/'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= config.dist %>',
                    src: '{,**/}*.html',
                    dest: '<%%= config.dist %>'
                }]
            }
        },

		// Refer to http://stackoverflow.com/questions/21056767/angular-and-grunt
        uglify: {
			options: {
				report: 'min',
				mangle: false
			}
		},
        concat: {
             dist: {}
        },
		
		//Process html files with special comments:
		processhtml: {
			options:{
				commentMarker: 'process',
				strip: true
			},
			server: {
				files: {
				'<%%= config.tmp %>/index.html': ['<%%= config.app %>/index.html']
				}
			},
			dist: {
				files: {
				'<%%= config.tmp %>/index.html': ['<%%= config.app %>/index.html']
				}
			}
		},
		
		// The actual grunt server settings
        connect: {
            options: {
                port: 0,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
							connect().use('/app/css/', connect.static('./.tmp/css/')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '',
                    livereload: false
                }
            }
        }
		
		
	    });
	grunt.loadNpmTasks('grunt-processhtml');
	
	grunt.registerTask('serve', function (target) {
		grunt.task.run([
			'clean:server',
			'bowerInstall',
			'autoprefixer',
			'processhtml:server',
			'connect:livereload',
			'watch'
		]);
	});
	
	grunt.registerTask('build', [
        'clean:dist',
		'bowerInstall',
		'concurrent:dist',
        'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
        'usemin',		
		'imagemin',
		'svgmin',
		'htmlmin',
    ]);
};
