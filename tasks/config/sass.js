module.exports = function(grunt) {

    grunt.config.set('sass', {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                "frontend/sass/main.css": "frontend/sass/main.scss"
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
};
