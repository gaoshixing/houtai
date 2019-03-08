var path = require("path"),
　　fs = require('fs'),
　　webpack = require("webpack");

var vendors = [
    "awe-dnd",
    "axios",
    "echarts",
    "iview",
    "js-cookie",
    "sockette",
    "vue",
    "vue-i18n",
    "vue-router",
    "vuex",
    "qs",
    "pdfjs-dist",
    "qrcodejs2",
    "html2canvas",
];

module.exports = {
　　entry: {
　　　　vendor: vendors
　　},
　　output: {
　　　　path: path.join(__dirname, "dist"),
　　　　filename: "lib.js",
　　　　library: "[name]_[hash]"
　　},
　　plugins: [
　　　　new webpack.DllPlugin({
　　　　　　path: path.join(__dirname, "dist", "manifest.json"),
　　　　　　name: "[name]_[hash]",
　　　　　　context: __dirname
　　　　}),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
　　]
};