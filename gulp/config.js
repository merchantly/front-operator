const src = './app';
const build = './build';
const dist = './dist/operator';
const distAssets = './dist/operator';
const test = './test';

var vendorStyles = [
  src + '/bower_components/select2/select2.css',
  src + '/bower_components/select2/select2-bootstrap.css',
  src + '/bower_components/switchery/switchery',
  src + '/bower_components/iCheck/skins/all.css',
  src + '/bower_components/iCheck/skins/square/green.css',
  src + '/bower_components/iCheck/skins/flat/blue.css',
  src + '/bower_components/jstree/dist/themes/default/style.css',
  './node_modules/react-select/dist/default.css'
];

var vendorImages = [
  src + '/assets/**/*',
  src + '/bower_components/iCheck/skins/square/green*.png',
  src + '/bower_components/iCheck/skins/flat/blue*.png',
  src + '/bower_components/jstree/dist/themes/default/*.png',
  src + '/bower_components/select2/*.{png,gif}'
];

module.exports = {
  clean: {
    dest: [build, dist]
  },
  browserSync: {
    port: 9000,
    open: false,
    server: {
      baseDir: [build, src]
    },
    files: [
      build + '/**',
      '!' + build + '/**.map'
    ]
  },
  ghPages: {
    src: build + '/**/*',
    options: {
      message: 'gh-pages'
    }
  },
  scripts: {
    static: {
      client: {
        entries: src + '/scripts/static.js',
        dest: build + '/scripts',
        outputName: 'client.js',
        extensions: ['.jsx', '.cjsx', '.coffee']
      },
      vendor: {
        baseDir: src + '/bower_components',
        dest: build + '/scripts',
        outputName: 'vendor.js',
        extensions: ['.coffee']
      },
      test: {
        entries: test + '/index.js',
        dest: build + '/scripts/',
        outputName: 'test.js',
        extensions: ['.jsx', '.cjsx', '.coffee']
      },
    },
    development: {
      entries: src + '/scripts/development.js',
      dest: dist,
      outputName: 'development.js',
      extensions: ['.jsx', '.cjsx', '.coffee']
    },
    production: {
      entries: src + '/scripts/production.js',
      dest: dist,
      outputName: 'dist.js',
      extensions: ['.jsx', '.cjsx', '.coffee']
    },
  },
  html: {
    static: {
      src: src + '/html/*.html',
      dest: build
    }
  },
  haml: {
    static: {
      src: 'app/haml/*.haml',
      dest: build
    }
  },
  styles: {
    static: {
      src: src + '/stylesheets/local.scss',
      vendorSrc: vendorStyles,
      dest: build + '/stylesheets',
      outputName: 'local.css'
    },
    production: {
      src: src + '/stylesheets/dist.scss',
      vendorSrc: vendorStyles,
      dest: dist,
      outputName: 'dist.css'
    }
  },
  systemStyles: {
    static: {
      src: src + '/stylesheets/system_local.scss',
      dest: build + '/stylesheets',
      outputName: 'system.css'
    },
    production: {
      src: src + '/stylesheets/system_dist.scss',
      dest: dist,
      outputName: 'system.css'
    }
  },
  fonts: {
    static: {
      src: src + '/**/*.{eot,svg,ttf,woff,woff2}',
      dest: build + '/fonts'
    }
  },
  images: {
    static: {
      src: vendorImages,
      dest: build + '/assets'
    },
    production: {
      src: vendorImages,
      dest: distAssets
    }
  }
};