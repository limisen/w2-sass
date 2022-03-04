const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')

// HTML-hanteraren
function copyHtml() {
  return src('src/**/*.html')
    .pipe(dest('dist'))
}

// Sass-hanteraren ,
function scssTask() {
  return src('src/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }))
}


// Kontrollanten
function watchTask() {
  watch('src/scss/**/*.scss', scssTask)
  watch('src/**/*.html', copyHtml)
}

exports.default = series(
  scssTask,
  copyHtml,
  watchTask
)