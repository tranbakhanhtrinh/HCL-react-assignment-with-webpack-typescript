const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || "10000");

module.exports = {
    mode: "production",
    target: "browserslist",
    entry: {
        bundle: path.resolve(__dirname, "src/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "static/js/[name].[contenthash:8].js",
        chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
        publicPath: "/",
        clean: true,
        assetModuleFilename: "static/media/[name].[hash][ext]",
    },
    optimization: {
        splitChunks: {
            cacheGroups: { // This configuration will create a separate bundle for all modules that have node_modules in the path, which all our dependencies have
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
    performance: {
        maxEntrypointSize: 1000000,
    },
    module: {
        rules: [
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: imageInlineSizeLimit,
                    },
                },
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
                test: /\.(s[ac]|c)ss$/,
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
        new HtmlWebpackPlugin(
            Object.assign(
                {},
                {
                    inject: true,
                    template: "./public/index.html",
                },
                {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    },
                }
            )
        ),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
    ],
};
