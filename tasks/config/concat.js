/**
 * `concat`
 *
 * ---------------------------------------------------------------
 *
 * Concatenates the contents of multiple JavaScript and/or CSS files
 * into two new files, each located at `concat/production.js` and
 * `concat/production.css` respectively in `.tmp/public/concat`.
 *
 * This is used as an intermediate step to generate monolithic files
 * that can then be passed in to `uglify` and/or `cssmin` for minification.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-concat
 *
 */
var abc = require('../../frontend/files.js');
console.log(abc);

module.exports = function(grunt) {

  grunt.config.set('concat', {
    js: {
      src: require('../../frontend/files.js'),
      dest: 'frontend/js/production.js'
      // dest: '.tmp/public/concat/production.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
