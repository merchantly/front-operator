import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import streamify from 'gulp-streamify';
import bundleLogger from '../util/bundleLogger';
import handleErrors from '../util/handleErrors';
import { scripts as config } from '../config';

// External dependencies we do not want to rebundle while developing,
// but include in our dist bundle
const dependencies = {
  'react': './node_modules/react/addons',

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
  'jstree': './app/bower_components/jstree/dist/jstree',
  'deep-diff': './node_modules/deep-diff',
};
const nonProductionDependencies = [
  'reactUjs'
];

gulp.task('[Static] Client scripts', ['[Shared] Eslint'], () => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.static.client.entries,
    extensions: config.static.client.extensions
  });

  Object.keys(dependencies).forEach((dep) => {
    bundler.external(dep);
  });

  function rebundle() {
    bundleLogger.start(config.static.client.outputName);

    bundler.bundle()
      .on('error', handleErrors)
      .pipe(source(config.static.client.outputName))
      .pipe(gulp.dest(config.static.client.dest))
      .on('end', () => {
        bundleLogger.end(config.static.client.outputName);
      });
  };

  if (global.isWatching) {
    bundler = watchify(bundler
      .transform('coffee-reactify')
      .transform('babelify', {
        stage: 0,
        ignore: /(node_modules|bower_components)/
      })
    );
    bundler.on('update', rebundle);
  } else {
    bundler
      .transform('coffee-reactify')
      .transform('babelify', {
        stage: 0,
        ignore: /(node_modules|bower_components)/
      });
  }

  rebundle();
});

gulp.task('[Static] Vendor scripts', (cb) => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.static.vendor.entries,
    extensions: config.static.vendor.extensions
  });

  Object.keys(dependencies).forEach((dep) => {
    bundler.require(dependencies[dep], { expose: dep });
  });

  bundleLogger.start(config.static.vendor.outputName);

  bundler
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.static.vendor.outputName))
    .pipe(gulp.dest(config.static.vendor.dest))
    .on('end', () => {
      bundleLogger.end(config.static.vendor.outputName);
      cb();
    });
});

function testFactory(taskName, config) {
  return gulp.task(taskName, () => {
    let testBundler = browserify({
      cache: {}, packageCache: {},
      entries: config.entries,
      extensions: config.extensions,
    });

    Object.keys(dependencies).forEach((dep) => {
      testBundler.external(dep);
    });

    function rebundle() {
      bundleLogger.start(config.outputName);

      return testBundler.bundle()
        .on('error', handleErrors)
        .pipe(source(config.outputName))
        .pipe(gulp.dest(config.dest))
        .on('end', () => {
          bundleLogger.end(config.outputName);
        });
    };

    if (global.isWatching) {
      testBundler = watchify(
        testBundler
          .transform('coffee-reactify')
          .transform('babelify', {
            stage: 0,
            ignore: /(node_modules|bower_components)/,
          })
      );
      testBundler.on('update', rebundle);
    } else {
      testBundler
        .transform('coffee-reactify')
        .transform('babelify', {
          stage: 0,
          ignore: /(node_modules|bower_components)/,
        });
    }

    return rebundle();
  });
}

testFactory('[Static] Test scripts', config.static.test);
testFactory('[Production] Test scripts', config.static.testDist);

gulp.task('[Development] Scripts', ['[Shared] Eslint'], () => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.development.entries,
    extensions: config.development.extensions
  });

  Object.keys(dependencies).forEach((dep) => {
    if (nonProductionDependencies.indexOf(dep) == -1) {
      bundler.require(dependencies[dep], { expose: dep });
    }
  });

  bundleLogger.start(config.development.outputName);

  return bundler
    .transform('babelify', {
      stage: 0,
      ignore: /(node_modules|bower_components)/
    })
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.development.outputName))
    .pipe(gulp.dest(config.development.dest))
    .on('end', () => {
      bundleLogger.end(config.development.outputName);
    });
});

gulp.task('[Production] Scripts', ['[Shared] Eslint'], () => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.production.entries,
    extensions: config.production.extensions
  });

  Object.keys(dependencies).forEach((dep) => {
    if (nonProductionDependencies.indexOf(dep) == -1) {
      bundler.require(dependencies[dep], { expose: dep });
    }
  });

  bundleLogger.start(config.production.outputName);

  return bundler
    .transform('babelify', {
      stage: 0,
      ignore: /(node_modules|bower_components)/
    })
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.production.outputName))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(config.production.dest))
    .on('end', () => {
      bundleLogger.end(config.production.outputName);
    });
});
