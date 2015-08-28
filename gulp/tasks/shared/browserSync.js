const gulp = require('gulp');
const browserSync = require('browser-sync');
const config = require('../../config').browserSync;

gulp.task('[Shared] BrowserSync', function() {
  browserSync(config);
});
