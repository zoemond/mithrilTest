var gulp = require("gulp");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var tslint = require("gulp-tslint");
var cached = require("gulp-cached");
var config = require('../config');

gulp.task("tslint", function () {
    gulp.src(config.ts.src)
        .pipe(cached())
        .pipe(plumber({ errorHandler: notify.onError('Error: TSLint!!') }))
        .pipe(tslint({
            // configuration: "Gulp/tasks/config/tslint.json"
        }))
        .pipe(tslint.report());
});