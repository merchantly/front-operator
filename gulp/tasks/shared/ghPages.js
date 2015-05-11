var gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    config = require('../../config').ghPages;

gulp.task('[Shared] GithubPages', function() {
  gulp.src(config.src)
    .pipe(ghPages(config.options));
});