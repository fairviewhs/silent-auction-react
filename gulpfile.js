const { src, dest, watch, series} = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

const build = () =>
  src('./src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('dist'));

const moveReactBuild = () =>
  src('./react-frontend/build/**/*')
    .pipe(dest('dist/build'));

const watchFiles = () =>
  watch('./src/**/*.ts', build);

module.exports = {
  build: series(build, moveReactBuild),
  watch: watchFiles
}