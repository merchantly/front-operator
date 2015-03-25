gulp         = require 'gulp'
concatCss    = require 'gulp-concat-css'
autoprefixer = require 'gulp-autoprefixer'
minifyCSS    = require 'gulp-minify-css'
handleErrors = require '../util/handleErrors'
config       = require('../config').dist.styles

gulp.task 'distStyles', ['distFonts', 'distSass'], ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe concatCss(config.target, rebaseUrls: false)
    .pipe autoprefixer('last 2 versions')
    .pipe minifyCSS()
    .pipe gulp.dest config.dest
