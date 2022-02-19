// npm i gulp gulp-sass sass gulp-postcss cssnano gulp-terser gulp-concat postcss-preset-env browser-sync --save-dev

const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcssPresetEnv = require("postcss-preset-env");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

//sass to css
function scssTask() {
  return src("src/sass/main.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano, postcssPresetEnv()]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

//js tasks
function jsTask() {
  return (
    src("src/js/**/*.js") //“src/js” folder and any of its sub-folders.
      .pipe(concat("main.js"))
      // .pipe(sourcemaps.init())
      // .pipe(
      //   babel({
      //     presets: ["@babel/env"],
      //   })
      // )
      .pipe(terser())
      .pipe(dest("./dist", { sourcemaps: "." }))
  );
}

function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  cb();
}

function watchTask() {
  watch("*html", browserSyncReload);
  watch(
    ["src/sass/*.scss", "src/js/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

//default gulp task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
