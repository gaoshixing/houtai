var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./config');
var proxyMiddleware = require('http-proxy-middleware'),
    webpackConfig = require('./webpack.dev.config.js'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    connectHistoryApiFallback = require('connect-history-api-fallback');

var proxyTable = config.proxyTable;
var port = process.env.PORT || config.port;

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

webpackConfig.entry.main.unshift("webpack-hot-middleware/client?reload=true?http://localhost:" + port);

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
})

var hotMiddleware = webpackHotMiddleware(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})


//配置代理
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(context, options))
})

app.use(connectHistoryApiFallback());
app.use(devMiddleware);
app.use(hotMiddleware);
app.use('/js/lib.js',function(req,res)
{
    res.sendFile(path.resolve(__dirname,'dist/lib.js'));
});

if (process.argv.indexOf('--open')>-1) {
    var child_process = require('child_process'),
        url = 'http://localhost:' + port,
        cmd = "";
    if (String(process.platform).toLowerCase().indexOf("darwin") >= 0) {
        cmd = 'open';
    } else if (String(process.platform).toLowerCase().indexOf("win") >= 0) {
        cmd = 'explorer';
    } else if (String(process.platform).toLowerCase().indexOf('linux') >= 0) {
        cmd = 'xdg-open';
    } else {
        cmd = 'open';
    }
    child_process.exec(`${cmd} "${url}"`);
}

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
