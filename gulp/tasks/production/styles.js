var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    autoprefixer = require('gulp-autoprefixer'),
    handleErrors = require('../../util/handleErrors'),
    config = require('../../config').styles.production;

gulp.task('[Production] Styles', function() {
  gulp.src(config.src)
    .on('error', handleErrors)
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'normal',
      includePaths: [
        './app/stylesheets/',
        './app/bower_components/',
        './app/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap'
      ]
    }))
    .pipe(urlAdjuster({prepend: '../assets/'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifyCss())
    .pipe(gulp.dest(config.dest));
});