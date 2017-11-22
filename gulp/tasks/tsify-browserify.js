var gulp = require("gulp");
var watchify = require("watchify");
var browserify = require("browserify");
var tsify = require("tsify");
var source = require("vinyl-source-stream");
const babelify = require('babelify');

gulp.task("tsify-browserify", function () {
    var b = browserify({
        entries: ['./../src/ts/main.ts'],
        cache: {},
    });
    b.plugin(tsify, {
        noImplicitAny: true,
        target: "es5"
    });

    function runBundle() {
        return b
            .bundle()
            .pipe(source("./all.js"))
            .pipe(gulp.dest('../dest'))
            .on("end", () => {
                console.log("end")
            })
    }

    runBundle();
});