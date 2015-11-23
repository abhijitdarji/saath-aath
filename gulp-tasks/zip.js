module.exports = function (args, gulp, $, config, util) {
    return function () {
		var zip = require('gulp-zip');
		//usage "gulp zipit --name=test"
		var files = [
			config.root + '**',
			'!./bower_components/**',
			'!./.vscode/**',
			'!./.tmp/**',
			'!./node_modules/**',
			'!./typings/**',
			'!./fonts/**',
			'!./build/fonts/**',
			'!./*.zip',
		];

		return gulp.src(files)
			.pipe(zip(args.name + '.zip'))
			.pipe(gulp.dest(config.root));
    };
};