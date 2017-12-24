const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval',
    entry: {
        bundle: [
            'babel-polyfill',
            './client/index.js',
            bootstrapEntryPoints.dev,
        ],
    },
    output: {
        path: helpers.root('dist'),
        filename: '[name].[chunkhash].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new CleanWebpackPlugin(['dist'], {
            root: helpers.root(),
            verbose: true,
            watch: true,
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html',
        }),
        new CopyWebpackPlugin([{
            from: helpers.root('./client/images'),
            to: helpers.root('dist/images'),
        }]),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '95-100',
            },
        }),
        new webpack.DefinePlugin({
            'process.env.API_HOST': JSON.stringify('http://freiberg.tech'),
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
});