var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');

//css圧縮
// gulp.task('minify-css', function () {
//     return gulp.src("dist/css/*.css")
//     .pipe(minifycss)
//     .addListener(gulp.dest("dist/css/"));    
// });

//sassコンパイル
gulp.task('sass', function () {
    return gulp.src("src/scss/*.scss")
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest("dist/css/"));
});

//ブラウザー自動更新
gulp.task('browser-sync', function (done) {
    browserSync.init({
        server: {
            baseDir: "./", // 対象ディレクトリ
            index: "index.html" //indexファイル名
        }
    });
    done();
});

// gulp.task('bs-reload', function () {
//     browsersync.reload();
// });

//watch関数
gulp.task('watchFiles', function (done) {

    const browserReload = () => {
        browserSync.reload();
        done();
    };

    gulp.watch("./*.html").on('change', gulp.series(browserReload));
    gulp.watch("./dist/**/*.+(js|css)").on('change', gulp.series(browserReload));
    gulp.watch("./src/scss/**/*.scss").on('change', gulp.series('sass'));

});

gulp.task('default', gulp.series(gulp.task('sass'), gulp.series('browser-sync', 'watchFiles')));

// Gulpを使ったファイルの監視
// gulp.task('default', gulp.task('browser-sync'), function () {
//     gulp.watch('./src/**/*.js', ['build']);
//     gulp.watch('./src/**/*.vue', ['build']);
//     gulp.watch("./*.html", gulp.task('bsreload'));
//     gulp.watch("./dist/**/*.+(js|css)", gulp.task('bsreload'));
//     gulp.watch("./src/**/*.vue", ['bs-reload']);
//     gulp.watch("./src/**/*.js", ['eslint']);
//     gulp.watch("./src/scss/**/*.scss", gulp.task('sass'));
//     gulp.watch("./dist/css/**/*.css", ['minify-css'])
// });