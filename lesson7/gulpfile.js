// подключаем gulp
var gulp = require('gulp');
// подключаем sass
var sass = require('gulp-sass');
// подключаем browser-sync
var browserSync = require('browser-sync');
// подключаем useref
var useref = require('gulp-useref')
  // подключаем gulp-uglify
var uglify = require('gulp-uglify')
  // подключаем gulp-minify-css
var mincss = require('gulp-minify-css')
  // подключаем gulp-if
var gulpif = require('gulp-if')

// подключаем библиотеки
gulp.task('frameworks', function () {
  return gulp.src([
      'app/libs/jquery.min.js'
    ])
    .pipe(gulp.dest('app/js'));
});

// настраиваем компиляцию scss в css с обновлением браузера
gulp.task('sass-compile', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// настраиваем watch
gulp.task('watch', ['browserSync'], function () {
  // компиляция scss, сборка и минификация css и js  
  gulp.watch('app/scss/**/*.scss', ['sass-compile']);
  gulp.watch('app/css/**/*.css', ['useref']);
  gulp.watch('app/js/**/*.js', ['useref']);
});

// настраиваем обновление браузера
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
});

// настраиваем сборку файлов с обновлением браузера
gulp.task('useref', ['frameworks'], function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', mincss()))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});