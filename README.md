# gulp-cached-sass

This module is used with [gulp-cached](https://www.npmjs.com/package/gulp-cached).

Inspired by [gulpを使ってsassの@importを解決しつつ差分ビルドをする - Qiita](https://qiita.com/joe-re/items/542b3f6fdc577cf50509)

## What I want to do...

### Now
```js
const {src, dest} = require('gulp');
const gulpSass = require('gulp-sass');
const gulpCached = require('gulp-cached');

const sass = () => {
    const srcPath = './src/scss/**/*.scss';
    const destPath = './dest/css';
    const gulpCachedName = 'sass';
    return src(srcPath)
        .pipe(gulpCached(gulpCachedName))
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(dest(destPath));
};

const watchSass = () => watch('./src/scss/**/*.scss', sass);

exports.default = series(sass, watchSass);
exports.sass = sass;

```

#### Problem

```scss
// style.scss
@import "modules/header";
@import "modules/footer";


```

if update `modules/_header.scss`, but don't run gulp task.

because, this Sass file named with a leading underscore.

ref [Sass: Sass Basics](http://sass-lang.com/guide)
> Partials
>
> You can create partial Sass files that contain little snippets of CSS that you can include in other Sass files. This is a great way to modularize your CSS and help keep things easier to maintain. A partial is simply a Sass file named with a leading underscore. You might name it something like _partial.scss. The underscore lets Sass know that the file is only a partial file and that it should not be generated into a CSS file. Sass partials are used with the @import directive. 

I need run task runner, because updated @import file written to "style.scss".


### In the future I would like to do this

```js
const {src, dest} = require('gulp');
const gulpSass = require('gulp-sass');
const gulpCached = require('gulp-cached');
const gulpCachedSass = require('gulp-cached-sass');

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

exports.default = series(sass, watchSass);
exports.sass = sass;


```

if update `modules/_header.scss`, run gulp task & compile style.scss, and @import file written to any *.scss.

