const webpack = require('webpack');

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
            test: /\.(woff|woff2|ttf|eot|jpg|jpe?g|png|gif|svg|ico)(\?.*$|$)/,
            loader: `url-loader`,
        },
        {
            test: /\.s?css/,
            use: [{
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
            },
            {
                loader: 'sass-loader',
            }],
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
    }
};
