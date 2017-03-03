var gulp = require('gulp'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify');

// minify css
gulp.task('minifyCss', function(){
    return gulp.src('public/sass/main.css')
    .pipe(cssnano())
    .pipe(gulp.dest('public/dist'))
});

// minify js
gulp.task('minifyJs', function() {
    return gulp.src('public/javascripts/script.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
});

// als je gulp intoetst in de terminal gaat hij de default af op de volgorde die in de array staat
gulp.task('default', ['minifyCss', 'minifyJs']);