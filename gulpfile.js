var gulp = require('gulp');
var nodeInspector = require('gulp-node-inspector');
var nodemon = require('gulp-nodemon');

gulp.task('default',['node-inspector'],  function () {
    nodemon({
      script: 'server.js',
      ext: 'js ejs html',
      env: { 'NODE_ENV': 'development' },
      nodeArgs:['--debug-brk'],
      tasks: ['node-inspector']
    }).on('start', function () {
        console.log('nodemon started..................................................');
    });
});

gulp.task('node-inspector', function () {
      gulp.src([])
          .pipe(nodeInspector({
            debugPort: 5858,
            webHost: '0.0.0.0',
            webPort: 8080,
            preload: false
      }));
});
