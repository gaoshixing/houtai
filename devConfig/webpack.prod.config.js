var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config.js');


function isExternal(module) {
    var userRequest = module.context || module.userRequest;
    if (typeof userRequest !== 'string') {
        return false;
    }
    return userRequest.indexOf('bower_components') >= 0 || userRequest.indexOf('node_modules') >= 0 || userRequest.indexOf('libraries') >= 0;
}

module.exports = merge(webpackBaseConfig, {
    devtool: false,
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/manifest.json')
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname,'dist/lib.js'),
            to:path.resolve(__dirname,'../dist/js/lib.js'),
        }]),
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: { comments: false, },
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
            },
            sourceMap: false
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
          cssProcessorOptions: {
            safe: true
          }
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.ejs',
            favicon: './src/static/favicon.ico',
            title:"藤门留学",
            inject: false
        })
    ]
});
