module.exports = function (args, gulp, $, config, util) {
    return function () {
		/**
		* Create $templateCache from the html templates
		* @return {Stream}
		*/
		util.log('Creating an AngularJS $templateCache');

		return gulp
			.src(config.htmltemplates)
			.pipe($.if(args.verbose, $.bytediff.start()))
			.pipe($.minifyHtml({ empty: true }))
			.pipe($.if(args.verbose, $.bytediff.stop(util.bytediffFormatter)))
			.pipe($.angularTemplatecache(
				config.templateCache.file,
				config.templateCache.options
				))
			.pipe(gulp.dest(config.temp));
    };
};