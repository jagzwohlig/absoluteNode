module.exports = function(grunt) {

    grunt.config.set('css_import', {
        target: {
            options: {},
            files: {
                "frontend/css/complete.css": ["frontend/sass/main.css"]
            }
        }
    });
    console.log("Demo");
    grunt.loadNpmTasks('grunt-css-import');
};
