import gulp from 'gulp';
import eslint from 'gulp-eslint';
import { scripts as config } from '../../config';

gulp.task('[Shared] Eslint', function () {
  return gulp.src(config.srcScripts + '/**/*.js?(x)')
    .pipe(eslint())
    .pipe(eslint.format());
});
