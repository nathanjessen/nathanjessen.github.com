const child = require('child_process');
const browserSync = require('browser-sync').create();
const atImport = require('postcss-import');
const nested = require('postcss-nested');
const mqpacker = require('css-mqpacker');

const gulp = require('gulp');
const prefix = require('autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');

const siteRoot = '_site';
const cssFiles = '_assets/css/*.css';
const cssSourceFiles = '_assets/css/**/*.css';
const jsFiles = '_assets/js/*.js';
const imageFiles = '_assets/img/**/*.{jpg,png,gif}';

// CSS
gulp.task('css', function () {
  var processors = [
    atImport(),
    nested(),
    mqpacker(),
    prefix('> 5%')
  ];
  return gulp.src(cssFiles)
    .pipe(postcss(processors))
    .pipe(cssnano())
    .pipe(notify('css optimized'))
    .pipe(gulp.dest('assets/css'));
});

// JavaScript
gulp.task('scripts', function () {
  gulp.src(jsFiles)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

// Vendor JS
gulp.task('vendor-js', function () {
  gulp.src([
      '_assets/vendors/reveal/js/reveal.js'
    ])
    .pipe(concat('reveal.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

// Vendor CSS
gulp.task('vendor-css', function () {
  gulp.src([
    '_assets/vendors/reveal/css/reveal.css',
    '_assets/vendors/reveal/css/theme/beige.css'
  ])
  .pipe(concat('reveal.beige.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('assets/css'));
});

// Images
gulp.task('imagemin', function () {
  gulp.src(imageFiles)
  .pipe(imagemin({
    optimizationLevel: 7
  }))
  .pipe(gulp.dest('assets/img'));
});

// Jekyll
gulp.task('jekyll', () => {
  var jekyllCmd = (process.platform === "win32" ? "jekyll.bat" : "jekyll");

  const jekyll = child.spawn(jekyllCmd, ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

// BrowserSync
gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  // Watch
  gulp.watch(cssSourceFiles, ['css']);
  gulp.watch(jsFiles, ['scripts']);
  gulp.watch(imageFiles, ['imagemin']);
});

// Default
gulp.task('default', ['vendor-css', 'vendor-js', 'scripts', 'css', 'jekyll', 'serve']);
