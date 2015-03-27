src   = './app'
build = './build'
dist  = './dist/operator'
assets_dist  = './dist/operator'

vendor_styles = [
  src + '/bower_components/select2/select2.css'
  src + '/bower_components/select2/select2-bootstrap.css'
  src + '/bower_components/switchery/switchery'
  src + '/bower_components/iCheck/skins/square/green.css'
  src + '/bower_components/iCheck/skins/flat/blue.css'
  src + '/bower_components/jstree/dist/themes/default/style.css'
]
vendor_images = [
  src + '/assets/**/*'
  src + '/bower_components/iCheck/skins/square/green*.png'
  src + '/bower_components/iCheck/skins/flat/blue*.png'
  src + '/bower_components/jstree/dist/themes/default/*.png'
  src + '/bower_components/select2/*.{png,gif}'
]

module.exports = {
  dist: {
    scripts: {
      baseDir: src
      extensions: ['.coffee', '.jsx.coffee', '.js.jsx.coffee']
      entries: './scripts/dist.coffee'
      dest: dist
      outputName: 'dist.js'
    }
    images: {
      src: vendor_images
      dest: assets_dist
    }
    html: {
      htmlSrc: src + '/*.html'
      hamlSrc: 'app/**/*.haml'
      dest: dist
    }
    sass: {
      src: src + '/stylesheets/dist.scss'
      dest: dist
      outputName: 'dist_sass.css'
    }
    systemStyles: {
      src: src + '/stylesheets/system_dist.scss'
      dest: dist
      outputName: 'system.css'
    }
    fonts: {
      src: src + '/**/*.{eot,svg,ttf,woff}'
      dest: assets_dist
    }
    styles: {
      src: vendor_styles.concat( dist + '/dist_sass.css')
      target: 'dist.css'
      dest: dist
    }
  }
  vendor: {
    baseDir: src + '/bower_components'
    dest: build + '/scripts'
    outputName: 'vendor.js'
    extensions: ['.coffee']
  }
  local: {
    entries: src + '/scripts/local.coffee'
    dest: build + '/scripts'
    outputName: 'local.js'
    extensions: ['.coffee', '.jsx.coffee', '.js.jsx.coffee']
  }
  browserSync: {
    port: 9000
    open: false
    server: {
      baseDir: [build, src]
    }
    files: [
      build + '/**',
      '!' + build + '/**.map'
    ]
  }
  html: {
    src: src + '/*.html'
    dest: build
  }
  haml: {
    src: 'app/**/*.haml'
    dest: build
  }
  sass: {
    src: src + '/stylesheets/local.scss'
    dest: build + '/stylesheets'
    outputName: 'local_sass.css'
  }
  systemStyles: {
    src: src + '/stylesheets/system_local.scss'
    dest: build + '/stylesheets'
    outputName: 'system.css'
  }
  stylesheets: {
    src: vendor_styles.concat( build + '/stylesheets/local_sass.css' )
    target: 'local.css'
    dest: build + '/stylesheets'
  }
  images: {
    src: src + '/assets/**/*'
    dest: build + '/assets'
  }
  fonts: {
    src: src + '/**/*.{eot,svg,ttf,woff,woff2}'
    dest: build + '/fonts'
  }
  minifyScripts: {
    src: dist + '/scripts/operator_app.js'
    dest: dist + '/scripts'
    outputName: 'operator_app.min.js'
  }
  minifyStyles: {
    src: dist + '/stylesheets/operator_app.css'
    dest: dist + '/stylesheets'
    outputName: 'operator_app.min.css'
  }
  clean: {
    dest: [build, dist]
  }
}
