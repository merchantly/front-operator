var gulp = require('gulp');

gulp.task('[Shared] Watch', ['[Shared] BrowserSync'], function() {
  gulp.watch('app/*.html', ['[Static] Html']);
  gulp.watch('app/**/*.haml', ['[Static] Haml']);
  gulp.watch('app/stylesheets/**/*.s?ss', ['[Static] Styles', '[Static] SystemStyles']);
  gulp.watch('app/assets/**/*', ['[Static] Images']);
});