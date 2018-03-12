const _concat = require('lodash/concat');
const _isArray = require('lodash/isArray');
const _mergeWith = require('lodash/mergeWith');
const base = require('./webpack.config.base');
const popup = require('./webpack.config.popup');
const background = require('./webpack.config.background');

const mergeWithBase = createConfig => (...args) =>
    _mergeWith(
        {},
        base,
        createConfig(args),
        (current, next) => (_isArray(current) && _isArray(next) ? _concat(current, next) : undefined)
    );

module.exports = [
    mergeWithBase(popup),
    mergeWithBase(background)
];
