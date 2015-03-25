gulp         = require 'gulp'
concatCss    = require 'gulp-concat-css'
autoprefixer = require 'gulp-autoprefixer'
handleErrors = require '../util/handleErrors'
config       = require('../config').stylesheets

gulp.task 'stylesheets', ['sass'], ->

  gulp.src config.src
    .on 'error', handleErrors
    .pipe concatCss(config.target, rebaseUrls: false)
    .pipe autoprefixer('last 2 versions')
    .pipe gulp.dest config.dest
