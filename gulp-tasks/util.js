module.exports = function (args, gulp, $, config) {

    var notifier = require('node-notifier');
    var path = require('path');
    var _ = require('lodash');
    var del = require('del');
    var pkg = require('../package.json');
    
    var util = {
        log: log,
        bytediffFormatter: bytediffFormatter,
        inject: inject,
        notify: notify,
        getHeader: getHeader,
        clean: clean,
        changeEvent: changeEvent
    };
    
    return util;
    /**
     * Log a message or series of messages using chalk's blue color.
     * Can pass in a string, object or array.
     */
    function log(msg) {
        if (typeof (msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    }
    
    /**
    * Formatter for bytediff to display the size changes after processing
    * @param  {Object} data - byte data
    * @return {String}      Difference in bytes, formatted
    */
    function bytediffFormatter(data) {
        var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
        return data.fileName + ' went from ' +
            (data.startSize / 1000).toFixed(2) + ' kB to ' +
            (data.endSize / 1000).toFixed(2) + ' kB and is ' +
            formatPercent(1 - data.percent, 2) + '%' + difference;
    }

    function formatPercent(num, precision) {
        return (num * 100).toFixed(precision);
    }
    
    /**
    * Inject files in a sorted sequence at a specified inject label
    * @param   {Array} src   glob pattern for source files
    * @param   {String} label   The label name
    * @param   {Array} order   glob pattern for sort order of the files
    * @returns {Stream}   The stream
    */
    function inject(src, label, order) {
        var options = { read: false };
        if (label) {
            options.name = 'inject:' + label;
        }

        return $.inject(orderSrc(src, order), options);
    }
    
    /**
    * Order a stream
    * @param   {Stream} src   The gulp.src stream
    * @param   {Array} order Glob array pattern
    * @returns {Stream} The ordered stream
    */
    function orderSrc(src, order) {
        //order = order || ['**/*'];
        return gulp
            .src(src)
            .pipe($.if(order, $.order(order)));
    }
    
    
    /**
    * Show OS level notification using node-notifier
    */
    function notify(options) {
        var notifyOptions = {
            sound: 'Bottle',
            contentImage: path.join(__dirname, 'gulp.png'),
            icon: path.join(__dirname, 'gulp.png')
        };
        _.assign(notifyOptions, options);
        notifier.notify(notifyOptions);
    }
    
    /**
    * Format and return the header for files
    * @return {String}           Formatted file header
    */
    function getHeader() {
        var template = ['/**',
            ' * <%= pkg.name %> - <%= pkg.description %>',
            ' * @authors <%= pkg.authors %>',
            ' * @version v<%= pkg.version %>',
            ' * @link <%= pkg.homepage %>',
            ' * @license <%= pkg.license %>',
            ' */',
            ''
        ].join('\n');
        return $.header(template, {
            pkg: pkg
        });
    }
    
    /**
    * Delete all files in a given path
    * @param  {Array}   path - array of paths to delete
    * @param  {Function} done - callback when complete
    */
    function clean(path, done) {
        log('Cleaning: ' + $.util.colors.blue(path));
        del(path, done);
    }
    
    /**
    * When files change, log it
    * @param  {Object} event - event that fired
    */
    function changeEvent(event) {
        var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
        log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }
}

