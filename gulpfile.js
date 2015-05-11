var gulp = require('gulp'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', {recurse: true});

gulp.task('dist', ['[Shared] Clean'], function() {
  gulp.start('[Production] Scripts', '[Production] Styles','[Production] SystemStyles', '[Production] Images');
});

gulp.task('build', ['[Shared] Clean'], function(cb) {
  runSequence([
    '[Static] Scripts', '[Static] Html', '[Static] Haml', '[Static] Styles',
    '[Static] SystemStyles', '[Static] Fonts', '[Static] Images'
  ], cb);
});

gulp.task('deploy', ['build'], function() {
  gulp.start('[Shared] GithubPages');
});

gulp.task('server', ['[Shared] SetWatch', 'build'], function() {
  gulp.start('[Shared] Watch');
});