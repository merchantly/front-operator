gulp        = require 'gulp'
requireDir  = require 'require-dir'
runSequence = require 'run-sequence'

# Require all tasks in gulp/tasks, including subfolders
requireDir './gulp/tasks', { recurse: true }

gulp.task 'dist', ['clean'], ->
  gulp.start 'scripts', 'styles', 'minifyScripts', 'minifyStyles'

gulp.task 'build', ['clean'], (cb) ->
  runSequence ['vendorScripts', 'localScripts', 'html', 'haml', 'stylesheets', 'fonts', 'images'], cb

gulp.task 'server', ['setWatch', 'build'], ->
  gulp.start 'watch'
