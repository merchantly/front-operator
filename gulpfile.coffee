gulp        = require 'gulp'
requireDir  = require 'require-dir'
runSequence = require 'run-sequence'

# Require all tasks in gulp/tasks, including subfolders
requireDir './gulp/tasks', { recurse: true }

gulp.task 'dist', ['[Shared] Clean'], ->
  gulp.start '[Production] Scripts', '[Production] Styles', '[Production] SystemStyles', '[Production] Images'

gulp.task 'build', ['[Shared] Clean'], (cb) ->
  runSequence [
    '[Static] Scripts', '[Static] Html', '[Static] Haml', '[Static] Styles',
    '[Static] SystemStyles', '[Static] Fonts', '[Static] Images'
  ], cb

gulp.task 'deploy', ['build'], ->
  gulp.start '[Shared] GithubPages'

gulp.task 'server', ['[Shared] SetWatch', 'build'], ->
  gulp.start '[Shared] Watch'

# var gulp = require('gulp'),
#     requireDir = require('require-dir'),
#     runSequence = require('run-sequence');

# // Require all tasks in gulp/tasks, including subfolders
# requireDir('./gulp/tasks', {recurse: true});

# gulp.task('dist', ['Clean'], function() {
#   gulp.start('distImages', 'distScripts', 'distStyles', 'distSystemStyles');
# });

# gulp.task('build', ['Clean'], function(cb) {
#   runSequence([
#     'vendorScripts', 'localScripts', 'html', 'haml', 'stylesheets', 'systemStyles', 'fonts', 'images'
#   ], cb);
# });

# gulp.task('deploy', ['build'], function() {
#   gulp.start('ghPages');
# });

# gulp.task('server', ['setWatch', 'build'], function() {
#   gulp.start('watch');
# });