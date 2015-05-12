var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../../config').browserSync;

gulp.task('[Shared] BrowserSync', function() {
  browserSync(config);
});