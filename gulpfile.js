var gulp = require('gulp'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync');


// minify css
gulp.task('minifyCss', function(){
    return gulp.src('public/sass/main.css')
    .pipe(cssnano())
    .pipe(gulp.dest('public/dist'))
});

gulp.task('css-watch', ['minifyCss'], browserSync.reload); 

// minify js
gulp.task('minifyJs', function() {
    return gulp.src('public/javascripts/script.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
});

// Watch Files For Changes
gulp.task('watch', function() {
	browserSync({
		server:{
			// proxy: "local.dev"
			proxy: 'http://localhost:3000'
			// baseDir:'public'
		}
	});
	gulp.watch('/sass/main/*.scss', ['css-watch']);
	gulp.watch('/public/javascripts/*script.js', ['minifyJs']);
});

// als je gulp intoetst in de terminal gaat hij de default af op de volgorde die in de array staat
gulp.task('default', ['minifyCss', 'minifyJs', 'watch']);