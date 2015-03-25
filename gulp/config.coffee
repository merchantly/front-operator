src   = './app'
build = './build'
dist  = './dist'

module.exports = {
  dist: {
    scripts: {
      baseDir: src
      extensions: ['.coffee', '.jsx.coffee', '.js.jsx.coffee']
      entries: './scripts/dist.coffee'
      dest: dist + '/scripts/'
      outputName: 'app.js'
    }
    styles: {
      src: src + '/stylesheets/dist.scss'
      dest: dist + '/stylesheets'
      outputName: 'app.css'
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
    outputName: 'local.css'
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
    src: dist + '/scripts/app.js'
    dest: dist + '/scripts'
    outputName: 'app.min.js'
  }
  minifyStyles: {
    src: dist + '/stylesheets/app.css'
    dest: dist + '/stylesheets'
    outputName: 'app.min.css'
  }
  clean: {
    dest: [build, dist]
  }
}
