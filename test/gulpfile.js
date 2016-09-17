var gulp = require('gulp');
var gulpCssTree = require('..');

gulp.task('default', function () {
    gulp.src('./styles/*.css')
        .pipe(gulpCssTree())
        .pipe(gulpCssTree.failAfterError())
        .pipe(gulp.dest('build'));
});