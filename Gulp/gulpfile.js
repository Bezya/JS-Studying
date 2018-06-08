const gulp = require('gulp');
let less = require('gulp-less');
let concat = require('gulp-concat');
//let concatCss = require('gulp-concat-css');
let uglify = require('gulp-uglify-es').default;
let rollup = require('gulp-better-rollup');
let babel = require('rollup-plugin-babel');
let sourcemaps = require('gulp-sourcemaps');
let cssmin = require('gulp-cssmin');
let browserSync = require('browser-sync');
let del = require('del');

let paths = {
    vendor: ['public/js/libs/*.js'],
    scripts:[
        'public/js/gallery/*.js',
        'public/js/home/*.js',
        'public/js/profile/*.js',
        'public/js/login/*.js',
        'public/js/*.js',


    ],
    styles: ['public/css/*.css'],
    fonts: ['public/fonts/*.*'],
    img: ['public/img/*.*']
};

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('css', function() {
    return gulp.src(paths.styles)
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/css'));
});

gulp.task('scripts', function() {
    return gulp.src('public/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(rollup({plugins: [babel()]}, 'iife'))
        .pipe(concat('app.min.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/js'))
});

gulp.task('vendor', function() {
    return gulp.src(paths.vendor)
        .pipe(gulp.dest('public/build/js/vendor'))
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('public/build/fonts'))
});

gulp.task('img', function () {
    return gulp.src(paths.img)
        .pipe(gulp.dest('public/build/img'))
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['css']);
});

gulp.task('default', ['watch', 'css', 'scripts', 'vendor', 'fonts', 'img']);
