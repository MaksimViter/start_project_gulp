const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require("gulp-rename"),
    fileinclude = require('gulp-file-include'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('build:css', function () {
    return gulp.src('source/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.stream());
});

gulp.task('build:html',function(){
    return gulp.src('source/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          })) 
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.stream());
});

gulp.task('build:img',function(){
    return gulp.src('source/img/*')
                .pipe(imagemin())
                .pipe(gulp.dest('public/images'))
                .pipe(browserSync.stream());
})

gulp.task('build:server',function(){
    browserSync.init({
        server: {
            baseDir: "public",
            index: "index.html",
            directory: true
        },
        directory: true,
    });
})

gulp.task('watch', ['build:css','build:html','build:img','build:server'], function () {
    gulp.watch('source/scss/**/*.scss', ['build:css']);
    gulp.watch('source/**/*.html', ['build:html']);
    gulp.watch('source/img/*', ['build:img']);
});

gulp.task('default', ['watch']);