var dest = '../dest';
var src = '../src';
var path = require('path');
var relativeSrcPath = path.relative('.', src);

module.exports = {
    minify: {
        src: dest + '/js/*.js',
        dest: dest + '/js/min',
    },

    tsd: {
        json: src + '/tsd.json'
    },

    ts: {
        src: [
            src + '/ts/**/*.ts'
        ],
        dest: dest + '/js/raw',
        options: {
            noImplicitAny: false,
            target: 'ES6',
            module: 'commonjs'
        }
    },
    browserify: {
        entry: {
            entries: dest + '/js/raw/main.js',
            debug: true
        },
        dest: dest + '/js/fe',
        output: {
            filename: 'bundle.js'
        },
        watchsrc: dest + '/js/raw/**/*.js'
    },

    watch: {
        ts: relativeSrcPath + '/ts/*.ts',
        js: relativeSrcPath + '/js/*.js'
    }
}