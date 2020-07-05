const debug = process.env.NODE_ENV;
var path = require("path");
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css',
});

var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path:  DIST_DIR,
        filename: "bundle.js",
        publicPath: "/dist"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            },
            {
                test: /\.scss$/,
                use: [
                    extractPlugin.loader,
                        { loader: 'css-loader', options: { url: false, sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ],
            },
            { 
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/, 
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin( { ...process.env } ),
        extractPlugin,
    ]
};

module.exports = config;
