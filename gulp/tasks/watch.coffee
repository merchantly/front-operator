gulp   = require 'gulp'
config = require '../config'

gulp.task 'watch', ['browserSync'], ->
  gulp.watch 'app/*.html',                ['html']
  gulp.watch 'app/**/*.haml',             ['haml']
  gulp.watch 'app/stylesheets/**/*.s?ss', ['stylesheets']
  gulp.watch 'app/stylesheets/*.s?ss',    ['stylesheets']
  gulp.watch 'app/assets/**/*',           ['images']
