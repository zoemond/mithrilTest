
var gulp = require("gulp");
var runSequence = require("run-sequence");

gulp.task("build", () => {
    runSequence(["tslint", "tsify-browserify"]);
});