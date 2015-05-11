var gulp = require('gulp'),
    handleErrors = require('../../util/handleErrors'),
    config = require('../../config').images.static;

gulp.task('[Static] Images', function() {
  gulp.src(config.src)
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
});