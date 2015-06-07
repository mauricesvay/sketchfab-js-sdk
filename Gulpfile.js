var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var pkg = require('./package.json');
var jsdoc = require('gulp-jsdoc');

gulp.task('browserify', function() {
    return browserify(['./src/Sketchfab.js'], {
            'standalone':'Sketchfab',
            'debug': false,
        })
        .bundle()
        .pipe(source('sketchfab-sdk.' + pkg.version + '.js' ))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('doc', function(){
    return gulp.src(["./src/**/*.js", "README.md"])
        .pipe(
            jsdoc('./dist/docs/',
                {
                    path: 'ink-docstrap',
                    systemName      : 'Sketchfab JS SDK',
                    theme           : "flatly",
                    linenums        : false,
                    collapseSymbols : false,
                    inverseNav      : true
                }
            )
        );
});


gulp.task('build', ['browserify', 'doc']);

gulp.task('watch', function(){
    gulp.watch('src/**', ['build']);
});
gulp.task('default', ['build']);
