module.exports = function(grunt) {

    grunt.config.set('browserSync', {
        bsFiles: {
            src: ['.tmp/public/frontend/css/*.css','.tmp/public/frontend/views/**']
        },
        options: {
            watchTask: true,
            proxy: "localhost:1337"
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');
};
