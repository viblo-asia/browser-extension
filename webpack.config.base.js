const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDev ? 'development' : 'production',
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        new ProgressBarPlugin({
            complete: '█',
            format: '  [:bar] :percent :msg',
            clear: false
        }),
        new FriendlyErrorsWebpackPlugin({
            clearConsole: true
        })
    ],
    performance: {
        hints: false
    },
    devtool: isDev ? 'cheap-source-map' : false
};
