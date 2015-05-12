var gulp = require('gulp'),
    flatten = require('gulp-flatten'),
    handleErrors = require('../../util/handleErrors'),
    config = require('../../config').fonts.static;

gulp.task('[Static] Fonts', function() {
  gulp.src(config.src)
    .on('error', handleErrors)
    .pipe(flatten())
    .pipe(gulp.dest(config.dest));
});