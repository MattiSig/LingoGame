module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({

        express: {
            options: {
              // Override defaults here 
            },
            dev: {
                options: {
                    livereload: 3000 ,
                    script: 'bin/www'
                }
            },
        },        
        watch: {
            options: { livereload: true },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile', 'express:dev'],
            },
            src: {
                files: ['public/javascripts/JS/*.js'],
                tasks: ['jshint:publ', 'express:dev'],
            },
        },

        jshint: {
            options: { node:true }
            gruntfile: ['Gruntfile.js'],
            publ: ['public/javascripts/JS/*.js'],
        }
    });

    grunt.registerTask('default', ['express', 'watch']);
};