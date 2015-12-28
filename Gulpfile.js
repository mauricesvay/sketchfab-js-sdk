var browserify = require('browserify');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var pkg = require('./package.json');

gulp.task('browserify', function() {

    var minified = browserify(['./src/Sketchfab.js'], {
            'standalone':'SketchfabSDK',
            'debug': false,
        })
        .bundle()
        .pipe(source('sketchfab-sdk.' + pkg.version + '.min.js' ))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));

    var debug = browserify(['./src/Sketchfab.js'], {
            'standalone':'SketchfabSDK',
            'debug': false,
        })
        .bundle()
        .pipe(source('sketchfab-sdk.' + pkg.version + '.js' ))
        .pipe(gulp.dest('./dist/'));

    return minified && debug;

});

gulp.task('build', ['browserify']);

gulp.task('watch', function(){
    gulp.watch('src/**', ['build']);
});
gulp.task('default', ['build']);
