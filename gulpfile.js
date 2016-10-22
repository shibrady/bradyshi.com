var gulp = require('gulp');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var browserSync = require('browser-sync').create('AppServer');
var fallback = require('connect-history-api-fallback');

var dependencies = ['react',
  'react-dom',
  'react-router',
  'react-redux',
  'redux',
  'redux-devtools'];

/**
 * Browserify our external dependencies once
 * so that future bundles don't require an entire rebundling
 */
gulp.task('bundle-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/js'));
});

/**
 * Browserify our actual application with the entry point main.js
 * Will capture all React/Redux entities
 */
gulp.task('browserify', ['bundle-vendor'], function() {
  return browserify({ entries: 'src/main.js', debug: true })
    .external(dependencies)
    .transform(babelify, { presets: ['latest', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});

/**
 * Compile and move all of our styles (.scss files)
 * to /dist/styles
 */
gulp.task('styles', function() {
  return gulp.src(
      ['node_modules/normalize.css/normalize.css',
      'src/styles/**/*.scss'
      ])
    .pipe(changed('./dist/styles', { extension: '.css' }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(cleanCss())
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest('dist/styles'))
});

var static = ['src/index.html'];

/**
 * Move all files that simply need to be moved
 * without any additional processing (index.html, images, etc.)
 */
gulp.task('static', function() {
  return gulp.src(static)
    .pipe(changed('./dist'))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['browserify', 'styles', 'static']);

/**
 * BrowserSync/serving specific tasks below
 */

// Browser reloads after every *.js file change (see 'serve')
gulp.task('react-watch', ['browserify'], function() {
   browserSync.reload();
});

// Browser reloads after every *.scss file change (see 'serve')
gulp.task('sass-watch', ['sass'], function() {
  browserSync.reload();
});

// Browser reloads after every *.scss file change (see 'serve')
gulp.task('static-watch', ['static'], function() {
  browserSync.reload();
});

// For development purposes
// Starts the server on default port 3000
// after finishing dist/ preparation
gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      // Middleware necessary in order to be able to visit any link
      // That isn't '/' without having 404 errors
      middleware: [fallback()]
    }
  });

  gulp.watch('src/**/*.js', ['react-watch']);

  gulp.watch('src/**/*.scss', ['sass-watch']);

  gulp.watch(static, ['static-watch']);
});

gulp.task('clean', function() {
  return del(['dist/**/*']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('serve');
});
