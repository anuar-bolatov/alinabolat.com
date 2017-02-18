var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    htmlmin = require('gulp-htmlmin'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

// Directories
var path = {
    build: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/app.js',
        style: 'src/scss/app.scss'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/*.scss'
    },
    clean: './dist'
};

// Static Server + Tunnel
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        tunnel: true,
        host: 'localhost',
        port: 8080
    });
});

// Combining HTML file
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

// Build JavaScript files 
gulp.task('js:build', function () {
    pump([
      gulp.src(path.src.js),
      rigger(),
      sourcemaps.init(),
      uglify(),
      sourcemaps.write('.'),
      gulp.dest(path.build.js),
      reload({stream: true})
    ]);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('style:build', function () {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// Watch tasks
gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build'
]);

gulp.task('default', ['build', 'watch', 'browser-sync']);