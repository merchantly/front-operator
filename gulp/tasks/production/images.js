var gulp = require('gulp'),
    handleErrors = require('../../util/handleErrors'),
    config = require('../../config').images.production;

gulp.task('[Production] Images', function() {
  gulp.src(config.src)
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
});