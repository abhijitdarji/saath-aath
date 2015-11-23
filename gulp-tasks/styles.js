module.exports = function (args, gulp, $, config, util) {
    return function () {
        /**
		* Compile less to css
		* @return {Stream}
		*/
        util.log('Compiling Less --> CSS');

		return gulp
			.src(config.less)
			.pipe($.plumber()) // exit gracefully if something fails after this
			.pipe($.less())
		//        .on('error', errorLogger) // more verbose and dupe output. requires emit.
			.pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
			.pipe(gulp.dest(config.temp));
    };
};