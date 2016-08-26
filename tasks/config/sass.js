module.exports = function(grunt) {

    grunt.config.set('sass', {
        options: {
            sourceMap: true,
            output:"expanded"
        },
        dist: {
            files: {
                "frontend/main.css": "frontend/sass/main.scss"
            }
        }
    });
    console.log("Demo");
    grunt.loadNpmTasks('grunt-sass');
};
