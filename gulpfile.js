var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
	git = require('gulp-git'),
	imagemin = require('gulp-imagemin'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	svgstore = require('gulp-svgstore'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify');

gulp.task('scripts', function(){
	return(gulp.src('./js/scripts.js')
		.pipe(jshint())
	  .pipe(jshint.reporter('default'))
	  .pipe(gulp.dest('./dist/scripts'))
	  .pipe(rename('scripts.min.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('./dist/scripts'))
	  .pipe(livereload())
		);
});

gulp.task('styles', function(){
	return(gulp.src('./less/styles.less')
		.pipe(less())
		// .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename('styles.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload())
		);
});

gulp.task('images', function(){
	return(gulp.src('./img/**/*')
		.pipe(cache(imagemin(
			{ optimizationLevel: 3, 
				progressive: true, 
				interlaced: true ,
				svgoPlugins: [{removeViewBox: false}],
			})))
    .pipe(gulp.dest('./img'))
		);
});
gulp.task('svgstore', function(){
	return(gulp.src('./svg/icons/*.svg')
		.pipe(rename({prefix: 'icon-'}))
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(gulp.dest('./svg/iconset'))
		);
});

gulp.task('default', function(){
	gulp.start('images', 'svgstore');
});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('./less/styles.less', ['styles']);
	gulp.watch('./js/scripts.js', ['scripts']);
});