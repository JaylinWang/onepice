const { series, src, dest } = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
var pkg = require('./package.json');

const distPath = {
  name: pkg.name,
  css: 'assets/css',
  js: 'assets/js',
  image: 'assets/images',
  font: 'assets/fonts',
  vendor: 'assets/vendors',
}

const scrPath = {
  less: {
    main: 'src/less/index.less'
  },
  js: {
    main: ['src/js/index.js']
  },
  font: {
    main: 'src/fonts/**/**'
  },
  vendor: {
    main: 'src/vendors/**/**'
  }
}

function css() {
  return src(scrPath.less.main)
      .pipe(less())
      .pipe(concat(pkg.name + '.min.css'))
      .pipe(dest(distPath.css));
}

function js() {
  return src(scrPath.js.main)
  .pipe(concat(pkg.name + '.min.js'))
  .pipe(uglify())
  .pipe(dest(distPath.js));
}

function vendor() {
  return src(scrPath.vendor.main)
  .pipe(dest(distPath.vendor));
}

function font() {
  return src(scrPath.font.main)
  .pipe(dest(distPath.font));
}


exports.build = series(css, js, vendor, font);