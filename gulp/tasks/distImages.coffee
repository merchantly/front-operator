gulp         = require 'gulp'
handleErrors = require '../util/handleErrors'
config       = require('../config').dist.images

gulp.task 'distImages', ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe gulp.dest config.dest

