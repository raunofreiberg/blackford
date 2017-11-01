const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        './client/index.js',
    ],
    output: {
        path: helpers.root('dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: true,
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
                secure: false,
            },
        },
    },
});
