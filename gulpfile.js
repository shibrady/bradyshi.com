/* global require */

let gulp = require('gulp');
let changed = require('gulp-changed');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cleanCss = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let del = require('del');
let babelify = require('babelify');
let browserify = require('browserify');
let buffer = require('vinyl-buffer');
let source = require('vinyl-source-stream');

let browserSync = require('browser-sync').create('AppServer');
let fallback = require('connect-history-api-fallback');

let dependencies = ['react',
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
  return browserify({entries: 'src/main.js', debug: true})
    .external(dependencies)
    .transform(babelify, {presets: ['latest', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
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
      'src/styles/**/*.scss',
      ])
    .pipe(changed('./dist/styles', {extension: '.css'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(cleanCss())
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest('dist/styles'));
});

let staticFiles = ['src/index.html'];

/**
 * Move all files that simply need to be moved
 * without any additional processing (index.html, images, etc.)
 */
gulp.task('staticFiles', function() {
  return gulp.src(staticFiles)
    .pipe(changed('./dist'))
    .pipe(gulp.dest('dist'));
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
      baseDir: './dist',
      // Middleware necessary in order to be able to visit any link
      // That isn't '/' without having 404 errors
      middleware: [fallback()],
    },
  });

  gulp.watch('src/**/*.js', ['react-watch']);

  gulp.watch('src/**/*.scss', ['sass-watch']);

  gulp.watch(staticFiles, ['static-watch']);
});

gulp.task('clean', function() {
  return del(['dist/**/*']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('serve');
});
