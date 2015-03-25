gulp         = require 'gulp'
concatCss    = require 'gulp-concat-css'
handleErrors = require '../util/handleErrors'
config       = require('../config').vendor_css

gulp.task 'vendor_css', ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe concatCss config.target
    .pipe gulp.dest config.dest
