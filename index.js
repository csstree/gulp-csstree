'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var validator = require('csstree-validator');
var jsonReporter = validator.reporters.json;
var objToConsole = require('./formatter');
var defaultFormatter = function (report, file) {
  var reportData = JSON.parse(jsonReporter(report));

  return objToConsole(Array.isArray(reportData) ? reportData[0] : reportData, file);
};

/**
 * @function
 * @param {object} options 
 */
var cssTreePlugin = function (options) {
  options = options || {};

  var formatter = options.formatter || defaultFormatter;
  var logger = options.logger || process.stdout.write.bind(process.stdout);

  if (typeof formatter != 'function') {
    throw new gutil.PluginError('gulp-csstree', 'Custom formatter must be a function')
  }

  if (typeof logger != 'function') {
    throw new gutil.PluginError('gulp-csstree', 'Custom logger must be a function')
  }

  return through.obj(function (file, enc, cb) {
    var content;
    var report;
    var formatted;

    if (file.isNull()) return cb(null, file);
    if (file.isStream()) return cb(new gutil.PluginError('gulp-csstree: Streaming not supported'), file);

    content = file.contents.toString(enc);

    if (!content) return cb(null, file);

    try {
      report = validator.validateString(content);
      report = Object.keys(report).reduce(function (result, current) {
        return result.concat(report[current]);
      }, []);

      if (report.length) {
        file.csstree = true;
        formatted = formatter(validator.validateString(content), file);
        logger(formatted);
      }
    } catch (e) {
      return cb(new gutil.PluginError('gulp-csstree', e));
    }

    return cb(null, file);
  });
};

cssTreePlugin.failAfterError = function () {
  var hasErrors = false;

  return through.obj(function (file, enc, cb) {
    hasErrors = hasErrors || file.csstree;

    return cb(null, file);
  }, function (cb) {
    if (hasErrors) {
      return cb(new gutil.PluginError('gulp-csstree', 'CSS Tree validator has failed'));
    }

    return cb();
  });
};

module.exports = cssTreePlugin;