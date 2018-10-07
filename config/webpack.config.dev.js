
const webpack = require("webpack");
const path = require("path");
const paths = require("./paths");
const merge = require("webpack-merge");

const CommonConfig = require("./webpack.config.common.js");

module.exports = merge(CommonConfig, {
    devtool: "source-map",

    entry: [
        "webpack-dev-server/client?http://localhost:8080",
        "webpack/hot/only-dev-server"
    ],

    resolve: {
        alias: {
            config: paths.config("development")
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader?localIdentName=[folder]__[name]__[local]&modules&importLoaders=1&sourceMap"
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    "style-loader",
                    "css-loader?localIdentName=[folder]__[name]__[local]&modules&importLoaders=1&sourceMap",
                    "sass-loader"
                ]
            }
        ]
    },

    devServer: {
        hot: true,
        contentBase: path.join(paths.root, "dist"),
        publicPath: "/",
        disableHostCheck: true,

        host: "0.0.0.0",
        port: 8080,
        historyApiFallback: true
    }
});
