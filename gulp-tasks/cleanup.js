module.exports = function (args, gulp, $, config, util) {

	/**
		 * Remove all files from the build, temp, and reports folders
		 * @param  {Function} done - callback when complete
		 */
	gulp.task('clean', function (done) {
		var delconfig = [].concat(config.build, config.temp);
		util.log('Cleaning: ' + $.util.colors.blue(delconfig));
		util.del(delconfig, done);
	});

	/**
		 * Remove all fonts from the build folder
		 * @param  {Function} done - callback when complete
		 */
	gulp.task('clean-fonts', function (done) {
		util.clean(config.build + 'fonts/**/*.*', done);
	});

	/**
		 * Remove all images from the build folder
		 * @param  {Function} done - callback when complete
		 */
	gulp.task('clean-images', function (done) {
		util.clean(config.build + 'images/**/*.*', done);
	});

	/**
		 * Remove all styles from the build and temp folders
		 * @param  {Function} done - callback when complete
		 */
	gulp.task('clean-styles', function (done) {
		var files = [].concat(
			config.temp + '**/*.css',
			config.build + 'styles/**/*.css'
			);
		util.clean(files, done);
	});

	/**
		 * Remove all js and html from the build and temp folders
		 * @param  {Function} done - callback when complete
		 */
	gulp.task('clean-code', function (done) {
		var files = [].concat(
			config.temp + '**/*.js',
			config.build + 'js/**/*.js',
			config.build + '**/*.html'
			);
		util.clean(files, done);
	});

};
