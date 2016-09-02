module.exports = function(grunt) {

    grunt.config.set('htmlmin', {
      
        production: { // Another target
            files: {
                'dist/index.html': 'src/index.html',
                'dist/contact.html': 'src/contact.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
};
