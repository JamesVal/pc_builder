/*
    ./webpack.config.js
*/
const REACT_SOURCE = 'src';
const APP_DIR = 'client';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './'+REACT_SOURCE+'/index.html',
    filename: '../../templates/'+APP_DIR+'/index.html',
    inject: 'body'
});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CleanWebpackPluginConfig = new CleanWebpackPlugin();
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const HtmlReplaceWebpackPluginConfig = new HtmlReplaceWebpackPlugin(
    {
        pattern: /src=".*(main.*\.js)"/g,
        replacement: function(match, $1) {
            return 'src="{% static \''+APP_DIR+'/'+$1+'\' %}"';
        }
    }
);

module.exports = {
    entry: './'+REACT_SOURCE+'/index.js',
    output: {
        path: path.resolve('static/'+APP_DIR),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            { test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    plugins: [
        CleanWebpackPluginConfig,
        HtmlWebpackPluginConfig,
        HtmlReplaceWebpackPluginConfig
    ]
}