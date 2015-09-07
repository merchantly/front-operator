import gulp from 'gulp';
import mochaPhantomjs from 'gulp-mocha-phantomjs';
import expect from 'gulp-expect-file';

gulp.task('[Production] Test', ['[Production] Test file presence', '[Production] Test js']);

gulp.task('[Production] Test js', ['[Production] Test scripts'], () => (
  gulp.src('test/dist.html')
    .pipe(mochaPhantomjs({
      reporter: 'spec',
    }))
    .on('error', () => process.exit(1))
));

gulp.task('[Production] Test file presence', () => (
  gulp.src('dist/**/*', { read: false })
    .pipe(expect(
      {
        checkRealFile: true,
        errorOnFailure: true,
        reportMissing: true,
        reportUnexpected: false,
        verbose: true,
      },
      [
        'dist/operator/dist.js',
        'dist/operator/dist.css',
        'dist/operator/system.css',
      ]
    ))
    .on('error', () => process.exit(1))
));
