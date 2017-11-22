var gulp = require("gulp");
var watchify = require("watchify");
var browserify = require("browserify");
var tsify = require("tsify");
var source = require("vinyl-source-stream");
const babelify = require('babelify');

gulp.task("tsify_browserify", function () {
  var b = watchify(browserify({
    entries: ['./../src/ts/main.ts'],
    cache: {},
    transform: [babelify],
    plugin: [tsify]
  }));
  b.plugin(tsify, {
    noImplicitAny: true,
    target: "es5"
  });

  function runBundle() {
    console.log("updating...")
    return b
      .bundle()
      .pipe(source("./all.js"))
      .pipe(gulp.dest('../dest'))
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