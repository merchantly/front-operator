import gulp from 'gulp';
import mochaPhantomjs from 'gulp-mocha-phantomjs';

gulp.task('[Shared] Test', () => (
  gulp.src('test/index.html').pipe(mochaPhantomjs({
    reporter: 'spec'
  }))
));

gulp.task('[Shared] Test with build', ['[Static] Vendor scripts', '[Static] Test scripts'], () => (
  gulp.src('test/index.html').pipe(mochaPhantomjs({
    reporter: 'spec'
  }))
));