module.exports = function (args, gulp, $, config, util) {
    return function () {
        /**
        * vet the code and create coverage report
        * @return {Stream}
        */
        util.log('Analyzing source with JSHint and JSCS');

        return gulp
            .src(config.alljs)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
            .pipe($.jshint.reporter('fail'))
            .pipe($.jscs());
    };
};