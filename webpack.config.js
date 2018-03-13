const _concat = require('lodash/concat');
const _isArray = require('lodash/isArray');
const _mergeWith = require('lodash/mergeWith');
const base = require('./webpack.config.base');
const popup = require('./webpack.config.popup');
const background = require('./webpack.config.background');

const mergeAppendArray = (...args) => _mergeWith(
    ...args,
    (current, next) => (
        _isArray(current) && _isArray(next)
            ? _concat(current, next)
            : undefined
    )
);

const mergeWithBase = createConfig => (...args) => {
    const baseConfig = base(...args);
    const extendConfig = typeof createConfig === 'function'
        ? createConfig(...args)
        : createConfig;

    return mergeAppendArray({}, baseConfig, extendConfig);
};

module.exports = [
    mergeWithBase(popup),
    mergeWithBase(background)
];
