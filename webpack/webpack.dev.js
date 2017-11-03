const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',
    output: {
        path: helpers.root('dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.s?css/,
            use: [{
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
            },
            {
                loader: 'sass-loader',
            },
            ],
        }],
    },
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: true,
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.API_HOST': JSON.stringify('http://localhost:3001'),
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './client',
        proxy: {
            '*': {
                target: 'http://localhost:3001',
                secure: false
            }
        }
    }
});
