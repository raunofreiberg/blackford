const webpack = require('webpack');
const dev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: [
        './client/index.js'
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*$|$)/,
                loader: `file-loader?name=assets/[name]${dev ? '' : '.[hash]'}.[ext]`
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
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
    }
};
