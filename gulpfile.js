const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const imgmin = require('gulp-imagemin');
const del = require('del');
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
const sync = require('browser-sync').create();

function html() {
    return src('src/**.html')
    .pipe(include({
        prefix: '@@'
    }))
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}
exports.html = html;
function scss(){
    return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(dest('dist/css'))
}

exports.scss = scss;

function img()
{
    return src('src/img/*')
    .pipe(imgmin())
    .pipe(dest('dist/img'))
}
exports.img = img;

function clear(){
    return del('dist')
}
exports.clear = clear;

function serve(){
    sync.init({
        server: './dist'
    })
    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)

}
exports.build = series(clear, scss, html, img);
exports.serve = series(clear, scss, html, img, serve);