gulp         = require 'gulp'
concatCss    = require 'gulp-concat-css'
handleErrors = require '../util/handleErrors'
config       = require('../config').stylesheets

gulp.task 'stylesheets', ['vendor_css', 'sass'], ->

  gulp.src config.src
    .pipe concatCss(config.target)
    .on 'error', handleErrors
    .pipe gulp.dest config.dest
