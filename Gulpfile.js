var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var pkg = require('./package.json');

gulp.task('browserify', function() {
    return browserify(['./src/Sketchfab.js'], {
            'standalone':'SketchfabSDK',
            'debug': false,
        })
        .bundle()
        .pipe(source('sketchfab-sdk.' + pkg.version + '.js' ))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['browserify']);

gulp.task('watch', function(){
    gulp.watch('src/**', ['build']);
});
gulp.task('default', ['build']);
