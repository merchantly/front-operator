var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    handleErrors = require('../../util/handleErrors'),
    config = require('../../config').systemStyles.static;

gulp.task('[Static] SystemStyles', function() {
  gulp.src(config.src)
    .on('error', handleErrors)
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'normal',
      includePaths: [
        './app/stylesheets/',
        './app/bower_components/',
        './app/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap',
        './app/bower_components/compass-mixins/lib/compass/typography/links/link-colors'
      ]
    }))
    .pipe(rename(config.outputName))
    .pipe(gulp.dest(config.dest));
});