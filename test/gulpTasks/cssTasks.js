const {src, dest, watch} = require('gulp');
const gulpSass = require('gulp-sass');
const gulpCached = require('gulp-cached');
const gulpCachedSass = require('../../index');

const sass = () => {
    const srcPath = './src/scss/**/*.scss';
    const destPath = './dest/css';
    const gulpCachedName = 'sass';
    const baseDir = './src/scss/';
    return src(srcPath)
        .pipe(gulpCached(gulpCachedName))
        .pipe(gulpCachedSass(baseDir))
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(dest(destPath));
};

const watchSass = () => watch('./src/scss/**/*.scss', sass);

module.exports = {sass, watchSass};
