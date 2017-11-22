var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config');
var runSequence = require("run-sequence");
var watchify = require("watchify");
const babelify = require('babelify');

gulp.task("watchify_browserify", function () {
    var b = watchify(browserify({
        entries: config.browserify.entry.entries,
        cache: {},
        transform: [babelify],
    }));
    function runBundle() {
        console.log("updating...")
        return b
            .bundle()
            .pipe(source(config.browserify.output.filename))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.browserify.dest))
            .on("end", () => {
                console.log("end")
            })
    }

    b.on("update", runBundle);
    b.on("log", function (msg) {
        console.log(msg);
    });
    runBundle();
});
// gulp.task('watchify', function () {
//     console.log("watchfy now")
//     runBundle();
// });
gulp.task('watch_set', function () {
    gulp.watch(config.ts.src, ['tslint']);
    gulp.watch(config.ts.src, ['typescript']);
})
gulp.task('watch', function () {
    runSequence('build', ['watch_set', 'watchify_browserify']);
});
browserify(config.browserify.entry.entries)
    .bundle()
    .pipe(source(config.browserify.output.filename))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.browserify.dest));
