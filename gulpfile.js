var args = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();
var util = require('./gulp-tasks/util')(args, gulp, $, config);
var gls = require('gulp-live-server');
var port = process.env.PORT || config.defaultPort;

function getTask(task) {
    return require('./gulp-tasks/' + task)(args, gulp, $, config, util);
}


/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', getTask('code-analysis'));
gulp.task('styles', ['clean-styles'], getTask('styles'));
gulp.task('fonts', ['clean-fonts'], getTask('fonts'));
gulp.task('images', ['clean-images'], getTask('images'));

gulp.task('less-watcher', getTask('watch'));
gulp.task('templatecache', ['clean-code'], getTask('template-cache'));

gulp.task('wiredep', getTask('inject-libraries'));
gulp.task('inject', ['wiredep', 'styles', 'templatecache'], getTask('inject-my-own'));

gulp.task('build', ['optimize', 'images', 'fonts'], getTask('build'));
gulp.task('optimize', ['inject'], getTask('optimize'));
gulp.task('publish', ['build'], getTask('publish'));
gulp.task('zipit', getTask('zip'));
gulp.task('bump', getTask('bump'));

/**
 * clean up tasks
 */
require('./gulp-tasks/cleanup')(args, gulp, $, config, util);

/**
 * serve the dev environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-dev', ['inject'], function () {
    serve(true /*isDev*/);
});

/**
 * serve the build environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-build', ['build'], function () {
    serve(false /*isDev*/);
});


/**
 * serve the code
 * --debug-brk or --debug
 * --nosync
 * @param  {Boolean} isDev - dev or build mode
 */
function serve(isDev) {
    var server;
    util.log('starting live-server');

    if (isDev) {
        server = gls.static([config.client, config.root], config.port);
        server.start();

        gulp.watch([config.less], ['styles'])
            .on('change', util.changeEvent);
            
        gulp.watch([config.css, config.html, config.js], function (file) {
            util.changeEvent(file);
            server.notify.apply(server, [file]);
        });
    } else {
        
        server = gls.static(config.build, config.port);
        server.start();
    }

  
};
