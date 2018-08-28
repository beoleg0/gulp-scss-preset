var     gulp 							= require('gulp'),
				sass 							= require('gulp-sass');
				concatCss 				= require('gulp-concat-css'),
				cleanCSS 					= require('gulp-clean-css'),
				autoprefixer 			= require('gulp-autoprefixer'),
				uncss 						= require('gulp-uncss');
				sourcemaps 				= require('gulp-sourcemaps'),
				rename 						= require('gulp-rename'),
				concat 						= require('gulp-concat'),
				uglify						= require('gulp-uglify'),
				babel 						= require('gulp-babel'),
				browserSync 			= require("browser-sync").create(),
				clean 						= require('gulp-clean'),


gulp.task('default', ['clean'], function() {
	gulp.run('dev');
});

gulp.task('production', ['clean'], function() {
	gulp.run('build');
});

gulp.task('dev', ['build', 'watch', 'serve']);

gulp.task('build', ['html', 'styles', 'javascript', 'javascript-libs', 'img', 'fonts']);
 
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['styles']);
  gulp.watch('app/js/**/*.js', ['javascript']);
  gulp.watch('app/js/libs/*.js', ['javascript-libs']);
	gulp.watch('app/*.html', ['html']);
	gulp.watch('app/img/**/*.*', ['img']);
	gulp.watch('app/fonts/**/*.*', ['fonts']);
	gulp.watch('app/**/*.*').on('change', browserSync.reload);
});

gulp.task('styles', function () {
  return gulp.src('app/scss/**/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({browsers: ['last 10 versions']}))
	.pipe(concatCss('main.css'))
	.pipe(cleanCSS({
    format: 'beautify',
     level: {
       1: {
         specialComments: 0
       }
     }
    }))
	.pipe(sourcemaps.write())
	.pipe(rename('main.css'))
	// .pipe(uncss({
 //            html: ['app/*.html'],
//             ignore: ['.your-class'],  
 //        }))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('javascript', function () {
	return gulp.src('app/js/*.js')
	.pipe(babel({
            presets: ['env']
        }))
	.pipe(concat('index.js'))
	// .pipe(uglify())
	.pipe(rename('index.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('javascript-libs', function (){
  return gulp.src('app/js/libs/*.js')
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
})

gulp.task('html', function () {
	return gulp.src('app/*.html')
	.pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*.*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});
});

gulp.task('clean', function() {
	return gulp.src('dist/')
		.pipe(clean());
});

