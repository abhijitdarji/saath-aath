module.exports = function (args, gulp, $, config, util) {
    return function () {
		/**
		* Wire-up the bower dependencies
		* @return {Stream}
		*/
		util.log('Wiring the bower dependencies into the html');

		var wiredep = require('wiredep').stream;
		var options = config.getWiredepDefaultOptions();

		return gulp
			.src(config.index)
			.pipe(wiredep(options))
			.pipe(gulp.dest(config.client));
    };
};