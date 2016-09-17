var gutil = require('gulp-util');

module.exports = function defaultFormatter(error, file) {
    error.file = file;

    var message = {
        head: gutil.colors.red(gutil.template('csstree: <%= file.relative %> (line: <%= line %> column: <%= column %>)', error)),
        message: gutil.colors.gray(gutil.template('message: <%= details || message %>', error)),
    };

    return message.head + '\n' + message.message + '\n';
}