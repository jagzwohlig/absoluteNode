/**
 * `clean`
 *
 * ---------------------------------------------------------------
 *
 * Remove the files and folders in your Sails app's web root
 * (conventionally a hidden directory called `.tmp/public`).
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-clean
 *
 */
module.exports = function(grunt) {

  grunt.config.set('clean', {
    development: ['.tmp/public/frontend/css','.tmp/public/frontend/js','.tmp/public/frontend/fonts','.tmp/public/frontend/views','.tmp/public/frontend/img'],
    production: ['.tmp/public/frontend']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
