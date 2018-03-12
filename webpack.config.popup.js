const path = require('path');
const { DefinePlugin } = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (buildEnv = {}) => ({
    name: 'popup',
    entry: ['./src/js/index.js', './src/sass/app.sass'],
    output: {
        path: path.resolve(__dirname, './build/popup'),
        filename: 'popup.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?!sass-loader?indentedSyntax'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: './src/popup.html',
            filename: 'popup.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'popup.css'
        }),
        new DotenvPlugin({
            path: buildEnv.envfile
        }),
        new DefinePlugin({
            'process.env.BROWSER': buildEnv.BROWSER || 'chrome'
        })
    ]
});
