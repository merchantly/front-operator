gulp         = require 'gulp'
flatten      = require 'gulp-flatten'
handleErrors = require '../util/handleErrors'
config       = require('../config').dist.fonts

gulp.task 'distFonts', ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe flatten()
    .pipe gulp.dest config.dest

