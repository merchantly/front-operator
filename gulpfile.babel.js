import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

gulp.task('dist', ['[Shared] Test with build'], (cb) => {
  runSequence(
    ['[Shared] Clean'],
    ['[Production] Scripts', '[Production] Styles', '[Production] SystemStyles', '[Production] Images'],
    '[Production] Test',
  cb);
});

gulp.task('build', ['[Shared] Clean'], (cb) => {
  runSequence([
    '[Static] Client scripts',
    '[Static] Vendor scripts',
    '[Static] Test scripts',
    '[Static] Html',
    '[Static] Haml',
    '[Static] Styles',
    '[Static] SystemStyles',
    '[Static] Fonts',
    '[Static] Images',
  ], cb);
});

gulp.task('deploy', ['build'], () => {
  gulp.start('[Shared] GithubPages');
});

gulp.task('server', ['[Shared] SetWatch', 'build'], () => {
  gulp.start('[Shared] Watch');
});

gulp.task('default', ['server']);
