var gulp = require('gulp'),
 	sass = require('gulp-sass'),
 	concat = require('gulp-concat'),
 	browserSync = require('browser-sync').create('./app');


	gulp.task('sass', function() {
	  return gulp.src('public/scss/main.scss/*.scss')
	    .pipe(sass({
	      'sourcemap=none': true
	    }))
	    .pipe(concat('main.css'))
	    .pipe(gulp.dest('public/dist'))
	});


	gulp.task('serve', ['sass'], function() {

	    browserSync.init({
	        proxy: "http://localhost:3000"
	    });

	    gulp.watch("public/scss/main/*.scss", ['sass']).on('change', browserSync.reload);
	    gulp.watch("views/*.ejs").on('change', browserSync.reload);
	});

	gulp.task('default', ['sass','serve']);


// // Watch Files For Changes
// gulp.task('watch:es6', function() {
// 	browserSync.init({
// 	  // server: "./app",
// 	  proxy: "http://localhost:3000"
// 	});
// 	gulp.watch('/public/styles/*.scss').on('change', browserSync.reload);
// });

// // als je gulp intoetst in de terminal gaat hij de default af op de volgorde die in de array staat
// gulp.task('default', ['sass',  'watch']);