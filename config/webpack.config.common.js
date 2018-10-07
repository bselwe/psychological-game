const path = require("path");
const paths = require("./paths");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HappyPack = require("happypack");

const deployDir = process.env.DEPLOY_DIR || path.resolve(__dirname, "..", "deploy");

module.exports = {
    entry: [
        path.join(paths.ts, "index.tsx")
    ],

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.root, "index.html")
        }),
        new ForkTsCheckerPlugin({
            checkSyntacticErrors: true,
            tsconfig: paths.tsConfig,
            tslint: paths.tsLint,
            watch: paths.ts,
            async: false
        }),
        new HappyPack({
            id: "ts",
            loaders: [{
                path: "ts-loader",
                query: {
                    happyPackMode: true,
                    configFile: paths.tsConfig
                }
            }]
        })
    ],

    output: {
        path: path.resolve(deployDir),
        filename: "[name].js",
        publicPath: "/"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [{
                test: /\.(tsx?|js)$/,
                loader: "happypack/loader?id=ts",
                include: paths.ts
            },
            {
                test: /\.(ttf|eot)(\?[\s\S]+)?$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]"
                }
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "images/[name].[ext]"
                }
            }
        ]
    }
};
