var gulp = require('gulp'),
    sass = require('gulp-sass'),
    addSrc = require('gulp-add-src'),
    concatCss = require('gulp-concat-css'),
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
    .pipe(addSrc(config.vendorSrc))
    .pipe(concatCss(config.outputName, {rebaseUrls: false}))
    .pipe(urlAdjuster({prepend: '/assets/operator/'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifyCss())
    .pipe(gulp.dest(config.dest));
});