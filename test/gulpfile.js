'use strict';
const {series} = require('gulp');
const {sass, watchSass} = require('./gulpTasks/cssTasks');

exports.default = series(sass, watchSass);
