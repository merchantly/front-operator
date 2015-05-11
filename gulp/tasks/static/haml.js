var gulp = require('gulp'),
    include = require('gulp-file-include'),
    haml = require('gulp-haml-coffee'),
    browserSync = require('browser-sync'),
    config = require('../../config').haml.static,
    reload = browserSync.reload;

gulp.task('[Static] Haml', function() {
  gulp.src(config.src)
    .pipe(include({prefix: '@@', basepath: '@file'}))
    .pipe(haml())
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});