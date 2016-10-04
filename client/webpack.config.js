var webpack = require('webpack');
var path = require('path');
var config_webpath_dev = require('./configs/webpack_dev');

var config = {
    devtool: 'eval',
    entry: __dirname + '/public/src/app.js',
    resolve: {root: [__dirname + "/sass"]},
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {test: /\.(png|jpg)$/, loader: 'file-loader'}
        ]
    },
    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: config_webpath_dev.domain,
        port: config_webpath_dev.port
    },
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
    config.devtool = false;
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ];
};

module.exports = config;
