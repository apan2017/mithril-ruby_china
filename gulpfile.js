// http://qiita.com/hkusu/items/e068bba0ae036b447754

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');


gulp.task('browserify', function() {
  browserify('./javascripts/app.jsx')
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('watch', function() {
  gulp.watch('./javascripts/**/*.jsx', ['browserify'])
});

gulp.task('default', ['watch']);