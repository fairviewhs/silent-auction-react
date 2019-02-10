const { src, dest, watch, series, parallel } = require('gulp');
const ts = require('gulp-typescript');
const run = require('gulp-run');

const tsProject = ts.createProject('tsconfig.json');

const build = () =>
  src('./src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('dist'));

const buildReact = () =>
  run('cd react-frontend && npm run build').exec();

const moveReactBuild = () =>
  src('./react-frontend/build/**/*')
    .pipe(dest('dist/build'));

const watchFiles = () =>
  watch('./src/**/*.ts', build);

module.exports = {
  build: parallel(build, series(buildReact, moveReactBuild)),
  watch: watchFiles
}