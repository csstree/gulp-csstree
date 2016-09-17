# gulp-csstree
> [CSS Tree](https://github.com/csstree/) lint plugin for gulp 3

## Usage

First, install `gulp-csstree` as a development dependency:

```shell
npm install --save-dev gulp-csstree
```

Then, add it to your `gulpfile.js`:

```js
var csstree = require('gulp-csstree');

gulp.task('css', function () {
    gulp.src('./styles/*.css')
        .pipe(csstree())
        .pipe(gulp.dest('build'));
});
```

## Options

### formatter
```js
var csstree = require('gulp-csstree');

gulp.task('css', function () {
    gulp.src('./styles/*.css')
        .pipe(csstree({ formatter: formatterFn }))
        .pipe(gulp.dest('build'));
});
```
`formatterFn` is a function like this:
```js
function formatterFn(report, file) {
    // some code, that outputs a report data...
}
```
Formatter function will be called for every file which has an invalid css.

## Fail on errors

Pipe the file stream to `csstree.failAfterError()` to fail on errors.

```js
var csstree = require('gulp-csstree');

gulp.task('css', function () {
    gulp.src('./styles/*.css')
        .pipe(csstree())
        .pipe(csstree.failAfterError())
        .pipe(gulp.dest('build'));
});
```