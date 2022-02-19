const { src, dest, watch, series } = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const tsProject = ts.createProject('tsconfig.json');

const build = () =>
  src('./src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('dist'));

const watchFiles = done => 
  nodemon({
    script: 'dist/app.js', // run ES5 code
    ext: 'ts',
    watch: 'src', // watch ES2015 code
    tasks: ['build'], // compile synchronously onChange
    done: done,
    verbose: true
  });

module.exports = {
  build: build,
  watch: series(build, watchFiles)
}
