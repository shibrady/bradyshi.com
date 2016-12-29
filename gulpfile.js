/* global require */
'use strict';

let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let gutil = require('gulp-util');
let changed = require('gulp-changed');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cleanCss = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let del = require('del');
let babelify = require('babelify');
let browserify = require('browserify');
let watchify = require('watchify');
let buffer = require('vinyl-buffer');
let source = require('vinyl-source-stream');

let browserSync = require('browser-sync').create('AppServer');
let fallback = require('connect-history-api-fallback');

let dependencies = ['react',
  'react-dom',
  'react-router',
  'react-redux',
  'redux',
  'redux-devtools',
  'pg',
  'pg-native',
  'express',
  ];

let bInstance = browserify(
  {entries: ['src/main.js'],
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify],
});
bInstance.external(dependencies);
bInstance.transform(babelify, {presets: ['latest', 'react']});

let bInstanceServer = browserify(
  {entries: ['src/server.js'],
  debug: true,
  cache: {},
  packageCache: {},
});
bInstanceServer.external(dependencies);
bInstanceServer.transform(babelify, {presets: ['latest', 'react']});

let bundle = (bInstance, sourceName, destination) => {
  let start = Date.now();
  return bInstance.bundle()
    .on('error', function(err) {
      gutil.log(gutil.colors.red('Unexpected bundling error: '
      + err.message));
    })
    .on('end', function() {
      gutil.log(gutil.colors.green('Finished rebundling in',
        (Date.now() - start) + 'ms.'));
      browserSync.reload();
    })
    .pipe(source(sourceName))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destination));
};


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
 * This is needed separately from the watchify task due to
 * watchify requiring an initial bundling
 */
gulp.task('browserify', ['bundle-vendor'], function() {
  return bundle(bInstance, 'bundle.js', 'dist/js');
});

gulp.task('browserifyServer', function() {
  return bundle(bInstanceServer, 'server.js', 'dist');
});

/**
 * Watchify task that watches for our .js file changes
 * and rebundles for BrowserSync to reload and display
 */
 gulp.task('watchify', function() {
   return bInstance.on('update', () => {
     bundle(bInstance, 'bundle.js', 'dist/js');
     browserSync.reload();
   });
 });


/**
 * Compile and move all of our styles (.scss files)
 * to /dist/styles
 */
gulp.task('styles', function() {
  return gulp.src(
      ['node_modules/normalize.css/normalize.css',
      'node_modules/font-awesome/css/font-awesome.min.css',
      'src/styles/**/*.scss',
      ])
    .pipe(changed('./dist/styles', {extension: '.css'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(cleanCss())
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest('dist/styles'));
});

let staticFiles = [
  'src/index.html',
  'src/assets/**',
];

/**
 * Move all files that simply need to be moved
 * without any additional processing (index.html, images, etc.)
 */
gulp.task('staticFiles', function() {
  return gulp.src(staticFiles, {base: './src'})
    .pipe(changed('./dist'))
    .pipe(gulp.dest('dist'));
});

gulp.task('font-awesome', function() {
  return gulp.src(['node_modules/font-awesome/fonts/**'],
    {base: 'node_modules/font-awesome/'})
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['browserify', 'browserifyServer',
  'styles', 'staticFiles', 'font-awesome']);

/**
 * BrowserSync/serving specific tasks below
 */

// Browser reloads after every *.scss file change (see 'serve')
gulp.task('styles-watch', ['styles'], function() {
  browserSync.reload();
});

// Browser reloads after every *.scss file change (see 'serve')
gulp.task('static-watch', ['staticFiles'], function() {
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

  gulp.watch('src/**/*.scss', ['styles-watch']);

  gulp.watch(staticFiles, ['static-watch']);

  gulp.start('watchify');
});

gulp.task('clean', function() {
  return del(['dist/**/*']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('serve');
});

gulp.task('database', function() {
  let stream = nodemon({
    script: 'dist/server.js',
    watch: 'src/server.js',
    tasks: ['browserifyServer']});

  stream
      .on('restart', function() {
        gutil.log(gutil.colors.green('Finished restarting the database'));
      })
      .on('crash', function() {
        gutil.log(gutil.colors.red('The database has crashed! ' +
          'Attempting to restart...'));
        stream.emit('restart', 5);
      });
});
