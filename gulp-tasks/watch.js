module.exports = function (args, gulp, $, config, util) {
    return function () {
		 gulp.watch([config.less], ['styles']);
    };
};