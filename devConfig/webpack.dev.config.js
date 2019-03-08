var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config.js');
let path = require('path') // 增加
function isExternal(module) {
    var userRequest = module.context || module.userRequest;
    if (typeof userRequest !== 'string') {
        return false;
    }
    return userRequest.indexOf('bower_components') >= 0 || userRequest.indexOf('node_modules') >= 0 || userRequest.indexOf('libraries') >= 0;
}

module.exports = merge(webpackBaseConfig, {
    devtool: 'cheap-eval-source-map',
    devtool: false,
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/manifest.json')
        }),
        /* new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.[hash].js',
            minChunks: function(module) {
                return isExternal(module);
            }
        }), */
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: false
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.ejs',
            favicon: './src/static/favicon.ico',
            title: "藤门留学",
            inject: false
        })
    ]
});
