var gulp = require('gulp'),
    php = require('gulp-connect-php'),
    browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload  = browserSync.reload;
gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});
gulp.task('php', function() {
    php.server({ base: 'app', port: 8010, keepalive: true});
});
gulp.task('browser-sync',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
});
gulp.task('default', ['browser-sync','sass'], function () {
    gulp.watch(['app/**/*.php'], [reload]);
    gulp.watch('app/scss/**/*.scss',['sass']);
    gulp.watch('app/**/*.php')
    gulp.watch('app/js/**/*.js')
});