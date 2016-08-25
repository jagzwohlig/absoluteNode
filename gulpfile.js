var gulp = require('gulp');
var gutil = require('gulp-util');
var jsArray = [
    './assets/lib/jquery/dist/jquery.min.js',
    './assets/lib/flexslider/jquery.flexslider-min.js',
    './assets/lib/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    './assets/lib/fancyBox/source/jquery.fancybox.js',
    './assets/lib/peity/jquery.peity.min.js',
    './assets/lib/jquery-slimscroll/jquery.slimscroll.min.js',
    './assets/lib/tinymce-dist/tinymce.js',

    './assets/lib/angular/angular.min.js',
    './assets/lib/angular-animate/angular-animate.min.js',
    './assets/lib/angular-flexslider/angular-flexslider.js',
    './assets/lib/angular-ui-select/dist/select.min.js',
    './assets/lib/angular-sanitize/angular-sanitize.min.js',
    './assets/lib/ui-router/release/angular-ui-router.min.js',
    './assets/lib/angular-bootstrap/ui-bootstrap.min.js',
    './assets/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
    './assets/lib/angular-flexslider/angular-flexslider.js',
    './assets/lib/angular-translate/angular-translate.js',
    './assets/lib/lodash/lodash.js',
    './assets/lib/angulartics/dist/angulartics.min.js',
    './assets/lib/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
    './assets/lib/angular-ui-tinymce/src/tinymce.js',
    './assets/lib/angularjs-imageupload-directive/public/javascripts/imageupload.js',
    './assets/lib/ngmap/build/scripts/ng-map.min.js',
    "./assets/lib/angular-bootstrap-toggle-switch/angular-toggle-switch.min.js",
    "./assets/lib/angular-toastr/dist/angular-toastr.js",
    "./assets/lib/angular-toastr/dist/angular-toastr.tpls.js",

    './assets/js/app.js',
    './assets/js/language.js',
    './assets/js/controllers.js',
    './assets/js/navigation.js',
    './assets/js/templateservice.js',

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


gulp.task('concat:js', function() {
    var concat = require('gulp-concat');
    return gulp.src(jsArray)
        .pipe(concat('w.js'))
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('default', ["sass:development",'concat:js']);
