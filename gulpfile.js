var gulp = require('gulp');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var copy = require('gulp-copy');
var browserSync = require('browser-sync').create();
var filenames = require("gulp-filenames");
var sass = require('gulp-sass');

sass.compiler = require('node-sass');



function copyImages() {
    return gulp.src("./src/img/**")
        .pipe(gulp.dest("./dist/img/"))
}

function copyHtml() {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist/"))
}



function Pug() {
    return gulp.src('./src/*.pug')
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(pug({
            pretty: true,
        }))
        .pipe(gulp.dest('./dist'))
}

function Server() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    browserSync.watch('dist', browserSync.reload)
}

function Watch() {
    gulp.watch('src/**/*.pug', gulp.series(Pug));
    gulp.watch('src/*.html', gulp.series(copyHtml));
}

gulp.task('default', gulp.series(copyHtml, copyImages, Pug, gulp.parallel(Server, Watch)));
gulp.task('build', gulp.series(copyHtml, copyImages, Pug, ));
