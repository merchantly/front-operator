gulp    = require 'gulp'
ghPages = require 'gulp-gh-pages'
config  = require('../config').ghPages

gulp.task 'ghPages', ->
  gulp.src config.src
    .pipe ghPages config.options