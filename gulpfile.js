'use strict';
// Based on:
// https://gist.github.com/schmuli/6422753589261e097a83

//=============================================
//            PLUGIN REFERENCES
//=============================================
var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var fs = require('fs');
var path = require('path');
var utils = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var runSequence = require('run-sequence');


//=============================================
//            DECLARE PATHS
//=============================================

var paths = {
  /**
   * The 'gulpfile' file is where our run tasks are hold.
   */
  gulpfile: 'gulpfile.js',
  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks.
   *
   * - 'styles'       contains all project css styles
   * - 'images'       contains all project images
   * - 'fonts'        contains all project fonts
   * - 'scripts'      contains all project javascript except config-env.js and unit test files
   * - 'html'         contains main html files
   * - 'templates'    contains all project html templates
   * - 'config'       contains Angular app config files
   */
  app: {
    basePath: 'JUDGE/',
    fonts: 'node_modules/materialize-css/dist/fonts/**/*.{eot,svg,ttf,woff,woff2}',
    styles: [
      'node_modules/materialize-css/dist/css/materialize.min.css',
      'node_modules/angular-loading-bar/build/loading-bar.min.css',
      'JUDGE/assets/styles.css'
    ],
    images: 'JUDGE/assets/img/*.{png,gif,jpg,jpeg}',
    scripts: [ // Must be in order of dependency
    'JUDGE/src/app.js',
    'JUDGE/src/app-states.js',
    'JUDGE/src/pages/**/base-table-model-controller.js',
    'JUDGE/src/pages/**/base-site-controller.js',    
    'JUDGE/src/pages/**/base-site-table-model-controller.js',
    'JUDGE/src/services/**/base-api-service.js',
    'JUDGE/src/services/**/*.js',
    'JUDGE/src/config/**/*.js',
    'JUDGE/src/directives/**/*.js',
    'JUDGE/src/pages/**/*.js'
    ],
    dependencies: [
       'node_modules/jquery/dist/jquery.min.js',
       'node_modules/angular/angular.js',
       'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
       'node_modules/angular-ui-router/release/angular-ui-router.min.js',
       'node_modules/angular-loading-bar/build/loading-bar.min.js',
       'node_modules/lodash/lodash.min.js',
       'node_modules/materialize-css/dist/js/materialize.min.js',
       'node_modules/pdfmake/build/pdfmake.min.js',
       'node_modules/pdfmake/build/vfs_fonts.js'
    ],
    html: 'app.html',
    templates: 'JUDGE/src/**/*.html'
  },
  /**
   * The 'build' folder is where our app resides once it's
   * completely built.
   *
   * - 'dist'         application distribution source code
   */
  build: {
    basePath: 'build/',
    dist: {
      basePath: 'build/dist/',
      fonts: 'build/dist/fonts/',
      images: 'build/dist/img/',
      styles: 'build/dist/styles/'
    },
    views: {
      basePath: 'build/views/',
    }
  }
};

gulp.task('clean', function() {
    return del([paths.build.basePath]);
});

gulp.task('compileDependencies', function() {
    return gulp.src(paths.app.dependencies)
                .pipe(concat('dependencies.js'))
                .pipe(gulp.dest(paths.build.dist.basePath));
});

gulp.task('compileScripts', function() {
    return gulp.src(paths.app.scripts)
                .pipe(babel())
                .pipe(concat('judge.js'))
                .pipe(gulp.dest(paths.build.dist.basePath));
});

gulp.task('compileFonts', function() {
    return gulp.src(paths.app.fonts)
                .pipe(gulp.dest(paths.build.dist.fonts));
});

gulp.task('compileImages', function() {
    return gulp.src(paths.app.images)
                .pipe(gulp.dest(paths.build.dist.images));
});

gulp.task('compileStyles', function() {
    return gulp.src(paths.app.styles)
                .pipe(concat('main.css'))
                .pipe(gulp.dest(paths.build.dist.styles));
});

gulp.task('compileViews', function() {
    return gulp.src(paths.app.templates)
            .pipe(gulp.dest(paths.build.views.basePath))
});

gulp.task('build', function() {
runSequence(['clean'], ['compileDependencies'], ['compileScripts'], ['compileFonts'], ['compileImages'], ['compileStyles'], ['compileViews']);
});

gulp.task('watch', function() {
  var watcher = gulp.watch(paths.app.basePath + '**', ['build']);
  watcher.on('change', function() {});
})