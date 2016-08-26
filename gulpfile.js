var gulp = require('gulp');
var gutil = require('gulp-util');
var jsArray = [
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/flexslider/jquery.flexslider-min.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    './bower_components/fancyBox/source/jquery.fancybox.js',
    './bower_components/peity/jquery.peity.min.js',
    './bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
    './bower_components/tinymce-dist/tinymce.js',

    './bower_components/angular/angular.min.js',
    './bower_components/angular-animate/angular-animate.min.js',
    './bower_components/angular-flexslider/angular-flexslider.js',
    './bower_components/angular-ui-select/dist/select.min.js',
    './bower_components/angular-sanitize/angular-sanitize.min.js',
    './bower_components/ui-router/release/angular-ui-router.min.js',
    './bower_components/angular-bootstrap/ui-bootstrap.min.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    './bower_components/angular-flexslider/angular-flexslider.js',
    './bower_components/angular-translate/angular-translate.js',
    './bower_components/lodash/lodash.js',
    './bower_components/angulartics/dist/angulartics.min.js',
    './bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
    './bower_components/angular-ui-tinymce/src/tinymce.js',
    './bower_components/angularjs-imageupload-directive/public/javascripts/imageupload.js',
    './bower_components/ngmap/build/scripts/ng-map.min.js',
    "./bower_components/angular-bootstrap-toggle-switch/angular-toggle-switch.min.js",
    "./bower_components/angular-toastr/dist/angular-toastr.js",
    "./bower_components/angular-toastr/dist/angular-toastr.tpls.js",

    './frontend/js/app.js',
    './frontend/js/language.js',
    './frontend/js/controllers.js',
    './frontend/js/navigation.js',
    './frontend/js/templateservice.js',

];

gulp.task('sass:development', function() {
    var sass = require('gulp-sass');
    var sourcemaps = require('gulp-sourcemaps');
    gulp.src('./assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:production', function() {
    var sass = require('gulp-sass');
    gulp.src('./sass/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'));
});





gulp.task('minify:css', function() {
    var replace = require('gulp-replace');
    var minifyCss = require('gulp-minify-css');
    var concat = require('gulp-concat');
    return gulp.src('./w/main.css')

        .pipe(minifyCss({
            keepSpecialComments: 0,
            rebase: false
        }))
        .pipe(rename('w.css'))
        .pipe(replace('url(../', 'url('))
        .pipe(replace("url('../", "url('"))
        .pipe(replace('url("../', 'url("'))
        .pipe(gulp.dest('./w/'));
});

gulp.task('concat:js', function() {
    var concat = require('gulp-concat');
    return gulp.src(jsArray)
        .pipe(concat('w.js'))
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('default', ["sass:development",'concat:js']);
