gulp        = require 'gulp'
include     = require 'gulp-file-include'
haml        = require 'gulp-haml-coffee'
flatten     = require 'gulp-flatten'
config      = require('../config').dist.html

gulp.task 'distHtml', ->
  gulp.src config.htmlSrc
    .pipe flatten()
    .pipe gulp.dest config.dest

  gulp.src config.hamlSrc
    .pipe(include(
      prefix: "@@"
      basepath: "@file"
    ))
    .pipe haml()
    .pipe gulp.dest config.dest

