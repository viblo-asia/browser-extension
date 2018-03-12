const path = require('path');
const { ProvidePlugin } = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const makeManifest = require('./builder/make-manifest');

module.exports = buildEnv => ({
    name: 'background',
    entry: './src/js/extensions/background.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'background.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new DotenvPlugin({
            path: buildEnv.envfile
        }),
        new ProvidePlugin({
            io: 'socket.io-client'
        }),
        new CopyPlugin([
            {
                from: './assets/manifest.template.json',
                to: 'manifest.json',
                transform: makeManifest(buildEnv)
            },
            {
                from: './assets/images',
                to: 'images'
            }
        ])
    ]
});
