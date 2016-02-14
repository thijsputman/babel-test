var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var series = require('stream-series');

gulp.task("default", ["build-dist"]);

var vendorStream = gulp.src([
  "./node_modules/babel-polyfill/dist/polyfill.js",
  "./node_modules/es6-promise/dist/es6-promise.js",
  "./node_modules/whatwg-fetch/fetch.js"]);

gulp.task("build-dist", ["build-lib"], function () {
  
  var target = gulp.src('./static/index.html');
  
  var appStream = gulp.src([
    './lib/test.js'
  ]);
  
  var sources = series(vendorStream, appStream)
    .pipe(plugins.concat("app.js"))
    .pipe(plugins.uglify())
    .pipe(gulp.dest("./dist"));
    
  return target.pipe(plugins.inject(sources))
    .pipe(gulp.dest('./'));    	
});

gulp.task("build-lib", function(){
  
  return gulp.src("./src/test.jsx")
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.concat("test.js"))
    .pipe(plugins.sourcemaps.write("."))
    .pipe(gulp.dest("./lib"));
});
