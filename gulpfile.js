const gulp = require('gulp');
const { dest, parallel, series } = gulp;
const babel = require('gulp-babel');

function js() {
    return gulp
        .src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
}

exports.js = js;
exports.default = js;