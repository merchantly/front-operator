var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    bundleLogger = require('../util/bundleLogger'),
    handleErrors = require('../util/handleErrors'),
    configStatic = require('../config').scripts.static,
    configDevelopment = require('../config').scripts.development,
    configProduction = require('../config').scripts.production;

// External dependencies we do not want to rebundle while developing,
// but include in our dist bundle

var dependencies = {
  'jquery': './node_modules/jquery/dist/jquery',
  'jquery.autosize': './app/bower_components/jquery-autosize/jquery.autosize',
  'jquery.role': './app/bower_components/jquery.role/lib/jquery.role',
  'jquery.fileupload': './app/bower_components/blueimp-file-upload/js/jquery.fileupload',
  'jquery.slimscroll': './app/bower_components/slimscroll/jquery.slimscroll',
  'jquery.flot': './app/bower_components/jquery-flot/jquery.flot',
  'jquery.ui.core': './app/bower_components/jquery-ui/ui/core',
  'jquery.ui.widget': './app/bower_components/jquery-ui/ui/widget',
  'jquery.ui.mouse': './app/bower_components/jquery-ui/ui/mouse',
  'jquery.ui.sortable': './app/bower_components/jquery-ui/ui/sortable',
  'jquery.ui.draggable': './app/bower_components/jquery-ui/ui/draggable',
  'jquery.ui.droppable': './app/bower_components/jquery-ui/ui/droppable',
  'lodash': './node_modules/lodash',
  'bootstrapSass': './app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
  'react': './node_modules/react',
  'react-mixin-manager': './node_modules/react-mixin-manager/react-mixin-manager',
  'reactUjs': './app/scripts/resources/reactUjs',
  'eventEmitter': './app/bower_components/eventEmitter/EventEmitter',
  'typeahead': './app/bower_components/typeahead.js/dist/typeahead.bundle',
  'aviator': './app/bower_components/aviator/src/main',
  'iCheck': './app/bower_components/iCheck/icheck',
  'metisMenu': './app/bower_components/metisMenu/dist/metisMenu.min',
  'pace': './app/bower_components/pace/pace',
  'select2': './app/bower_components/select2/select2',
  'toastr': './app/bower_components/toastr/toastr',
  'jstree': './app/bower_components/jstree/dist/jstree.min'
};

var nonProductionDependencies = ['react', 'reactUjs'];

gulp.task('[Static] Scripts', function(cb) {

  /*==========  Client scripts  ==========*/

  var bundleQueue = 1;
  var clientBundler = browserify({
    cache: {}, packageCache: {},
    entries: configStatic.client.entries,
    extensions: configStatic.client.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    clientBundler.external(key);
  });

  var rebundle = function() {
    bundleLogger.start(configStatic.client.outputName);

    clientBundler.bundle()
      .on('error', handleErrors)
      .pipe(source(configStatic.client.outputName))
      .pipe(gulp.dest(configStatic.client.dest))
      .on('end', function() {
        bundleLogger.end(configStatic.client.outputName);
        bundleQueue--;
        if (bundleQueue === 0) { cb(); }
      });
  };

  clientBundler
    .transform('coffee-reactify')
    .transform('babelify');

  if (global.isWatching) {
    clientBundler = watchify(clientBundler);
    clientBundler.on('update', rebundle);
  }

  rebundle();

  /*==========  Vendor scripts  ==========*/

  var vendorBundler = browserify({
    cache: {}, packageCache: {},
    entries: configStatic.vendor.entries,
    extensions: configStatic.vendor.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    vendorBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configStatic.vendor.outputName);

  vendorBundler
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configStatic.vendor.outputName))
    .pipe(gulp.dest(configStatic.vendor.dest))
    .on('end', function() {
      bundleLogger.end(configStatic.vendor.outputName);
    });
});

gulp.task('[Development] Scripts', function() {
  var appBundler = browserify({
    cache: {}, packageCache: {},
    entries: configDevelopment.entries,
    extensions: configDevelopment.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    if (nonProductionDependencies.indexOf(key) == -1) {
      appBundler.require(dependencies[key], {expose: key});
    }
  });

  bundleLogger.start(configDevelopment.outputName);

  return appBundler
    .transform('babelify', {ignore: /(node_modules|bower_components)/})
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configDevelopment.outputName))
    .pipe(gulp.dest(configDevelopment.dest))
    .on('end', function() {
      bundleLogger.end(configDevelopment.outputName);
    });
});

gulp.task('[Production] Scripts', function() {
  var appBundler = browserify({
    cache: {}, packageCache: {},
    entries: configProduction.entries,
    extensions: configProduction.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    if (nonProductionDependencies.indexOf(key) == -1) {
      appBundler.require(dependencies[key], {expose: key});
    }
  });

  bundleLogger.start(configProduction.outputName);

  return appBundler
    .transform('babelify', {ignore: /(node_modules|bower_components)/})
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configProduction.outputName))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(configProduction.dest))
    .on('end', function() {
      bundleLogger.end(configProduction.outputName);
    });
});