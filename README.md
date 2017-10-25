# gulp-cached-sass

This module is wrap [gulp-cached](https://www.npmjs.com/package/gulp-cached).

Currently under development...

## What I want to do...

### Now
```js
var gulp = require('gulp');
var sass = require('gulp-sass');
var cache = require('gulp-cached');

gulp.task('develop', function(){
    gulp.watch('./src/scss/**/*.scss', function(){
        gulp.start('sass');
    });
});

gulp.task('sass', function (callback) {
    var path = {
        src: './src/scss/**/*.scss',
        dest: './dest'
    };
    gulp.src(path.src)
        .pipe(cache('sass'))
        .pipe(sass())
        .pipe(gulp.dest(path.dest))
        .on('end', callback);
});

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
var gulp = require('gulp');
var sass = require('gulp-sass');
var cacheSass = require('gulp-cached-sass');

gulp.task('develop', function(){
    gulp.watch('./src/scss/**/*.scss', function(){
        gulp.start('sass');
    });
});

gulp.task('sass', function (callback) {
    var path = {
        src: './src/scss/**/*.scss',
        dest: './dest'
    };
    gulp.src(path.src)
        .pipe(cacheSass('sass'))
        .pipe(sass())
        .pipe(gulp.dest(path.dest))
        .on('end', callback);
});

```

if update `modules/_header.scss`, run gulp task & compile style.scss, and @import file written to any *.scss.