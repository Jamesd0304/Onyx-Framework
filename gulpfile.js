'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const htmlbeautify = require('gulp-html-beautify');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const gulpSequence = require('gulp-sequence');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

function browserSync () {
    browserSync({
        server: {
            baseDir: "/index.html"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});


function rebabel(done) {
  gulp.src('./index.js')
      .pipe(babel( {
        presets: [
          '@babel/env'
        ]
      }))
      .pipe(gulp.dest('dist'))
      done();
}

function minJS (done) {
  gulp.src('./app/scripts/index.js')
      .pipe(jsmin())
      .pipe(rename( {
        suffix: '.min'
      }))
      ,pipe(gulp.dest('dist'))
      done();
}
function htmlbeauty (done) {
      gulp.src('./app/index.html')
          .pipe(htmlbeautify(options))
          .pipe(gulp.dest('./public/'))
          done();
}

function sassWatch () {
    gulp.watch('./scss/**/*.scss', compileSass)
}

function compileSass  (done) {
    return gulp.src('./scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
      done();
}

function cssMini (done) {
      return gulp.src('./app/styles/main.css')
      .pipe(cleanCSS({compatability: 'ie8'}))
      .pipe(gulp.dest('dist'));
      done();
}


let cssSeries = gulp.series(sassWatch);
gulp.task('css', cssSeries);
let cssmin = gulp.series(cssMini);
gulp.task('mini', cssmin)
let min = gulp.series(minJS);
gulp.task('minijs', min);
// let buildnew = gulp.series()
let browser = gulp.series()
gulp.task('default', )
