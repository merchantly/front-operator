var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../../config').html.static,
    reload = browserSync.reload;

gulp.task('[Static] Html', function() {
  gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});