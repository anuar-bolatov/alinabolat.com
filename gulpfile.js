'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	cleanCSS = require('gulp-clean-css'),
	htmlmin = require('gulp-htmlmin'),
	rimraf = require('rimraf'),
	imagemin = require('gulp-imagemin'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/'
	},
	src: {
		html: 'app/*.html',
		js: 'app/js/app.js',
		style: 'app/scss/app.scss',
		img: 'app/img/*'
	},
	watch: {
		html: 'app/**/*.html',
		js: 'app/js/**/*.js',
		style: 'app/scss/*.scss'
	},
	clean: './dist'
};

var config = {
	server: {
		baseDir: "./dist"
	},
	tunnel: false,
	tunnel: "alinabolat",
	host: 'localhost'
};

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function (cd) {
	pump([
		gulp.src(path.src.js),
		rigger(),
		sourcemaps.init(),
		uglify(),
		sourcemaps.write(),
		gulp.dest(path.build.js),
		reload({stream: true})
	], cd);
});

gulp.task('style:build', function () {
	gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: ['app/scss/'],
			outputStyle: 'compressed',
			sourceMap: true,
			errLogToConsole: true
		}))
		.pipe(prefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('imagemin:build', function () {
	gulp.src(path.src.img)
		.pipe(imagemin())
		.pipe(gulp.dest(path.build.img));
});

gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'imagemin:build'
]);


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


gulp.task('php', function() {
	gulp.src('app/*.php')
		.pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build', 'webserver', 'watch', 'php']);