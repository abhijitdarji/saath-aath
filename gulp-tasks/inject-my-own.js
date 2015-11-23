module.exports = function (args, gulp, $, config, util) {
    return function () {
		util.log('Wire up css into the html, after files are ready');

		// Only include stubs if flag is enabled
		var js = args.stubs ? [].concat(config.js, config.stubsjs) : config.js;

		return gulp
			.src(config.index)
			.pipe(util.inject(js, '', config.jsOrder))
			.pipe(util.inject(config.css))
			.pipe(gulp.dest(config.client));
    };
};