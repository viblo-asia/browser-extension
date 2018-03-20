const path = require('path');
const dotenv = require('dotenv');
const DotenvPlugin = require('dotenv-webpack');
const { DefinePlugin } = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = (buildEnv = {}) => {
    const envfilePath = path.resolve(buildEnv.envfile || '.env');
    dotenv.config({ path: envfilePath });

    return {
        mode: isDev ? 'development' : 'production',
        resolve: {
            alias: {
                '~': path.resolve(__dirname, './src'),
                '~assets': path.resolve(__dirname, './assets')
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
            }),
            new DotenvPlugin({
                path: buildEnv.envfile || '.env'
            }),
            new DefinePlugin({
                'process.isDev': JSON.stringify(isDev),
                'process.browser': JSON.stringify(buildEnv.BROWSER || 'chrome')
            })
        ],
        performance: {
            hints: false
        },
        devtool: isDev ? '#eval-source-map' : false
    };
};
