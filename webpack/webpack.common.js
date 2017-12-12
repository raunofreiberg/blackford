require('dotenv').config();
const webpack = require('webpack');
const helpers = require('../helpers');

module.exports = {
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
            }],
        },
        {
            test: /\.(woff|woff2|ttf|eot|otf|jpg|jpe?g|png|gif|svg|ico)(\?.*$|$)/,
            loader: 'url-loader',
        },
        {
            test: /\.s?css/,
            use: [{
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]',
                },
            },
            {
                loader: 'sass-loader',
            },
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: helpers.root('./client/sass/_utils.scss'),
                },
            },
            ],
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    resolve: {
        extensions: ['.js', '.json'],
    },
    node: {
        fs: 'empty',
        tls: 'empty',
        net: 'empty',
        console: false,
        global: true,
        process: true,
        Buffer: true,
        __filename: 'mock',
        __dirname: 'mock',
        setImmediate: true,
    },
};
