

var gulp = require('gulp'),
		rename = require('gulp-rename'), // rename files
		cssnano     = require('gulp-cssnano'),	// minify css
		notify = require('gulp-notify'),	// 
		autoprefixer = require('gulp-autoprefixer'),	// old browser autoprefix
		connect = require('gulp-connect'),	// server connect
		sass = require('gulp-sass'),	// sass plugin
		del = require('del'),	// delete files
		cache = require('gulp-cache'),	// cache files
		imagemin = require('gulp-imagemin'),	// optimize img
		pngquant = require('imagemin-pngquant'),	// optimize png
		livereload = require('gulp-livereload'),	// livereload plugin
		concat = require('gulp-concat'), // concat files
		uglify = require('gulp-uglifyjs');;	// minify js


// server connect
gulp.task('connect', function() {
	connect.server({
		root: 'server/',
		livereload: true
	});
});

// html
gulp.task('html', function(){
	gulp.src('app/*.html')
	.pipe(gulp.dest('server/'))
	.pipe(connect.reload());
});

// css
gulp.task('sass', function () {
	var buildCss = gulp.src([
				'app/bower/normalize-css/normalize.css',
				'app/bower/jquery-ui-slider/jquery-ui.min.css',
			])
			.pipe(concat('libs.min.css'))
			.pipe(cssnano())
			.pipe(gulp.dest('server/css'));

	return gulp.src('app/scss/style.scss')
				.pipe(sass().on('error', sass.logError))
				.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
				.pipe(cssnano())
				.pipe(rename('style.min.css'))
				.pipe(gulp.dest('server/css'))
				.pipe(connect.reload()); 
});

// js
gulp.task('js', function(){
	return	gulp.src('app/js/*.js')
				.pipe(gulp.dest('server/js'))
				.pipe(connect.reload());
});
// scripts
gulp.task('scripts', function() {
	gulp.src([
			'app/bower/html5shiv/dist/html5shiv.min.js', 
			'app/bower/html5shiv/dist/html5shiv-printshiv.min.js', 
			'app/bower/respond/dest/respond.min.js'
		])
	.pipe(concat('ie.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('server/js'));
  return gulp.src([ 
	        'app/bower/jquery/jquery.min.js', 
	        'app/bower/jquery-ui-slider/jquery-ui.min.js',
	        'app/bower/jquery.ui.touch-punch/dist/jquery.ui.touch-punch.min.js' 
        ])
        .pipe(gulp.dest('server/js'));
});

// img
gulp.task('img', function() {

	return gulp.src('app/img/**/*') 
				.pipe(cache(imagemin({  
					interlaced: true,
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()]
				})))
				.pipe(gulp.dest('dist/img')); 
});

// watch
gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/index.html', ['html']);
	gulp.watch('app/js/*.js', ['js']);
});

gulp.task('delete', function() {
	del.sync('server');
	return del.sync('dist');
});

	// default
	gulp.task('default', ['connect', 'html', 'sass', 'scripts', 'js', 'watch']);

	// clear cache
	gulp.task('clear', function () {
		return cache.clearAll();
	})

	gulp.task('build', ['delete', 'sass', 'scripts', 'js', 'img'], function() {
	    
	    var buildCss = gulp.src('server/css/*.css')
	    .pipe(gulp.dest('dist/css'));

	    // var buildFonts = gulp.src('app/fonts/**/*') 
	    // .pipe(gulp.dest('dist/fonts'));

	    var buildJs = gulp.src('server/js/**/*') 
	    .pipe(gulp.dest('dist/js'));

	    var buildHtml = gulp.src('server/*.html') 
	    .pipe(gulp.dest('dist'));

	    var buildHtml = gulp.src('server/*.ico') 
	    .pipe(gulp.dest('dist'));



	  });