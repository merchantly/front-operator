var gulp = require('gulp'),
    sass = require('gulp-sass'),
    addSrc = require('gulp-add-src'),
    concatCss = require('gulp-concat-css'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    autoprefixer = require('gulp-autoprefixer'),
    handleErrors = require('../../util/handleErrors'),
    config = require('../../config').styles.static;

gulp.task('[Static] Styles', function() {
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
    .pipe(addSrc(config.vendorSrc))
    .pipe(concatCss(config.outputName, {rebaseUrls: false}))
    .pipe(urlAdjuster({prepend: '../assets/'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(config.dest));
});