gulp         = require 'gulp'
sass         = require 'gulp-sass'
rename       = require 'gulp-rename'
handleErrors = require '../util/handleErrors'
config       = require('../config').sass

gulp.task 'sass', ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe sass(
      errLogToConsole: true
      sourceComments: 'normal'
      includePaths: [
        './app/stylesheets/'
        './app/bower_components/'
        './app/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap'
      ]
    )
    .pipe rename config.outputName
    .pipe gulp.dest config.dest
