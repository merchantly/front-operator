browserify     = require 'browserify'
watchify       = require 'watchify'
gulp           = require 'gulp'
source         = require 'vinyl-source-stream'
bundleLogger   = require '../util/bundleLogger'
handleErrors   = require '../util/handleErrors'
vendorConfig   = require('../config').vendor
localConfig    = require('../config').local

gulp.task 'vendorScripts', ['clean'], ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: vendorConfig.baseDir
    extensions: vendorConfig.extensions
  }).require './jquery/dist/jquery',                                   { expose: 'jquery' }
    .require './jquery-autosize/jquery.autosize',                      { expose: 'jquery.autosize' }
    .require './jquery.role/lib/jquery.role',                          { expose: 'jquery.role' }
    .require './blueimp-file-upload/js/jquery.fileupload',             { expose: 'jquery.fileupload' }
    .require './jquery-ui/ui/core',                                    { expose: 'jquery.ui.core' }
    .require './jquery-ui/ui/widget',                                  { expose: 'jquery.ui.widget' }
    .require './jquery-ui/ui/mouse',                                   { expose: 'jquery.ui.mouse' }
    .require './jquery-ui/ui/sortable',                                { expose: 'jquery.ui.sortable' }
    .require './jquery-ui/ui/draggable',                               { expose: 'jquery.ui.draggable' }
    .require './jquery-ui/ui/droppable',                               { expose: 'jquery.ui.droppable' }
    .require './lodash/dist/lodash',                                   { expose: 'lodash' }
    .require './bootstrap-sass-official/assets/javascripts/bootstrap', { expose: 'bootstrapSass' }
    .require './react/react-with-addons',                              { expose: 'react' }
    .require './react-mixin-manager/react-mixin-manager',              { expose: 'react-mixin-manager' }
    #.require '../scripts/libs/react_ujs',                              { expose: 'reactUjs' }
    .require './eventEmitter/EventEmitter',                            { expose: 'eventEmitter' }
    .require './typeahead.js/dist/typeahead.bundle',                   { expose: 'typeahead' }
    .require './aviator/src/main',                                     { expose: 'aviator' }
    .require './metisMenu/dist/metisMenu',                             { expose: 'metisMenu' }
    .require './slimscroll/jquery.slimscroll',                         { expose: 'jquery.slimscroll' }
    .require './pace/pace',                                            { expose: 'pace' }
    .require './select2/select2',                                      { expose: 'select2' }
    #.require './switchery/dist/switchery.min',                         { expose: 'switchery' }
    .require './iCheck/icheck',                                        { expose: 'icheck' }
    .require './toastr/toastr',                                        { expose: 'toastr' }
    .require './jstree/dist/jstree.min',                               { expose: 'jstree' }
    .require './jquery-flot/jquery.flot',                              { expose: 'jquery-flot' }


  bundle = ->
    bundleLogger.start vendorConfig.outputName

    return bundler
             .bundle()
             .on 'error', handleErrors
             .pipe source(vendorConfig.outputName)
             .pipe gulp.dest(vendorConfig.dest)
             .on 'end', ->
               bundleLogger.end vendorConfig.outputName

  if global.isWatching
    bundler = watchify bundler
    bundler.on 'update', bundle

  return bundle()

gulp.task 'localScripts', ['clean'], ->
  bundler = browserify({
    cache: {}, packageCache: {}
    entries: localConfig.entries
    extensions: localConfig.extensions
  }).external 'jquery'
    .external 'jquery.autosize'
    .external 'jquery.fileupload'
    .external 'jquery.role'
    .external 'jquery.ui.core'
    .external 'jquery.ui.widget'
    .external 'jquery.ui.mouse'
    .external 'jquery.ui.draggable'
    .external 'jquery.ui.droppable'
    .external 'jquery.ui.sortable'
    .external 'lodash'
    .external 'bootstrapSass'
    #.external 'react'
    .external 'react-mixin-manager'
    .external 'reactUjs'
    .external 'eventEmitter'
    .external 'typeahead'
    .external 'aviator'
    .external 'pace'
    .external 'select2'
    #.external 'switchery'
    .external 'icheck'
    .external 'toastr'
    .external 'jstree'
    .external 'jquery-flot'

  bundle = ->
    bundleLogger.start localConfig.outputName

    return bundler
             .bundle()
             .on 'error', handleErrors
             .pipe source(localConfig.outputName)
             .pipe gulp.dest(localConfig.dest)
             .on 'end', ->
               bundleLogger.end localConfig.outputName

  if global.isWatching
    bundler = watchify bundler
    bundler.on 'update', bundle

  return bundle()
