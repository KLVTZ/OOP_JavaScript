var gulp       = require('gulp'),
	jshint     = require('gulp-jshint'),
	uglify	   = require('gulp-uglify'),
	livereload = require('gulp-livereload');


gulp.task('lint', function() {
	gulp.src('./js/*')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
});

gulp.task("watch", function() {
	gulp.src(".")
		.pipe(livereload());
});


gulp.task("default", ["lint", "watch"]);

gulp.watch("./js/*", ["lint"]);

gulp.watch("index.html", ["watch"]);
