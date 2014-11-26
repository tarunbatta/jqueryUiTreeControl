module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'Scripts/jquery.battatech.jqueryui.tree.js',
                dest: 'Scripts/jquery.battatech.jqueryui.tree.min.js'
            },
            dist: {
                src: 'Scripts/jquery.battatech.jqueryui.tree.js',
                dest: '../dist/jquery.battatech.jqueryui.tree.min.js'
            }
        }
        , copy: {
            main: {
                src: 'Scripts/jquery.battatech.jqueryui.tree.js',
                dest: '../dist/jquery.battatech.jqueryui.tree.js'
            }
        }
        , watch: {
            files: 'Scripts/jquery.battatech.jqueryui.tree.js'
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