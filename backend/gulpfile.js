const { src, dest, watch } = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const build = () =>
  src('./src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('dist'));

const watchFiles = () =>
  watch('./src/**/*.ts', build);

module.exports = {
  build: build,
  watch: watchFiles
}
