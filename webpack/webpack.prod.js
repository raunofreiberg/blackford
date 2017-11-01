const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlPluginRemove = require('html-webpack-plugin-remove');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = webpackMerge(commonConfig, {
    entry: {
        bundle: [
            'babel-polyfill',
            './client/index.js',
        ],
    },
    output: {
        path: helpers.root('dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: helpers.root(),
            verbose: true,
            watch: true,
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: false,
                html5: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeTagWhitespace: true
            }
        }),
        new HtmlPluginRemove(/<script.*?src="\/bundle.js".*?<\/script>/),
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
            },
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
            'process.env.API_HOST': JSON.stringify('http://207.154.244.76:3001'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle: false,
            sourceMap: true,
            compressor: {
                drop_console: true,
                warnings: false,
            }
        })
    ]
});