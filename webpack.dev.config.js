const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: "development",
    target: "web",
    entry: {
        bundle: path.resolve(__dirname, "src/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: "/",
        clean: true,
        assetModuleFilename: "static/media/[name].[hash][ext]",
    },
    devtool: "source-map",
    devServer: {
        open: true,
        hot: true,
        port: 9000,
        static: {
            directory: path.resolve(__dirname, "./build"),
        },
        devMiddleware: {
            index: "index.html",
            writeToDisk: true,
        },
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules|\.d\.ts$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.d\.ts$/,
                loader: "ignore-loader",
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[name].chunk.css",
        }),
        new ReactRefreshWebpackPlugin(),
    ],
};
