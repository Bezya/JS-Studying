const gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let rollup = require('gulp-better-rollup');
let babel = require('rollup-plugin-babel');
let sourcemaps = require('gulp-sourcemaps');
let cssmin = require('gulp-cssmin');
let del = require('del');

let paths = {
    scripts: [
        'public/js/utils.js',
        'public/js/router.js',
        'public/js/login/*.js',
        'public/js/home/*.js',
        'public/js/gallery/*.js',
        'public/js/profile/*.js',
        'public/js/app.js'
    ],
    styles: ['public/css/*.css']
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
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/js'))
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['css']);
});

gulp.task('default', ['watch', 'scripts',  'css']);
