gulp         = require 'gulp'
concatCss    = require 'gulp-concat-css'
autoprefixer = require 'gulp-autoprefixer'
urlAdjuster  = require 'gulp-css-url-adjuster'
minifyCSS    = require 'gulp-minify-css'
handleErrors = require '../util/handleErrors'
config       = require('../config').dist.styles

gulp.task 'distStyles', ['distFonts', 'distSass'], ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe concatCss(config.target, rebaseUrls: false)
    .pipe urlAdjuster(prepend: '/assets/operator/')
    .pipe autoprefixer('last 2 versions')
    .pipe minifyCSS()
    .pipe gulp.dest config.dest
