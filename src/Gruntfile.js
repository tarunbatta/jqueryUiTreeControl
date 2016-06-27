module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'Scripts/jquery.techbytarun.jqueryuitreecontrol.js',
                dest: 'Scripts/jquery.techbytarun.jqueryuitreecontrol.min.js'
            },
            dist: {
                src: 'Scripts/jquery.techbytarun.jqueryuitreecontrol.js',
                dest: '../dist/jquery.techbytarun.jqueryuitreecontrol.min.js'
            }
        }
        , copy: {
            main: {
                src: 'Scripts/jquery.techbytarun.jqueryuitreecontrol.js',
                dest: '../dist/jquery.techbytarun.jqueryuitreecontrol.js'
            }
        }
        , watch: {
            files: 'Scripts/jquery.techbytarun.jqueryuitreecontrol.js'
            , tasks: ['uglify', 'copy']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "copy" task.
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);
};