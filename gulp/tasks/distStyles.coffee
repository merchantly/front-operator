gulp         = require 'gulp'
concatCss    = require 'gulp-concat-css'
autoprefixer = require 'gulp-autoprefixer'
handleErrors = require '../util/handleErrors'
config       = require('../config').dist.styles

gulp.task 'distStyles', ['distSass'], ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe concatCss(config.target)
    .pipe autoprefixer('last 2 versions')
    .pipe gulp.dest config.dest
