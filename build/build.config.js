const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { mergeWithCustomize, unique } = require("webpack-merge");

const relativePath = (...pathArr) => path.resolve(__dirname, ...pathArr);

const myMerge = (...objects) =>
  mergeWithCustomize({
    // 合并插件的时候，保证这些插件唯一
    customizeArray: unique(
      "plugins",
      ["MiniCssExtractPlugin"],
      (plugin) => plugin.constructor && plugin.constructor.name
    ),
  })(...objects);

const baseConfig = {
  mode: "development",
  output: {
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[name].js",
    assetModuleFilename: "asset/[name][ext]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "global",
                localIdentName: "[local]__[hash:base64:8]",
                exportLocalsConvention: "camelCaseOnly",
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "global",
                localIdentName: "[local]__[hash:base64:8]",
                exportLocalsConvention: "camelCaseOnly",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    new webpack.ProgressPlugin(),
  ],
  stats: {
    assets: true,
    modules: false,
    colors: true,
  },
};

const clientDevConfig = myMerge({}, baseConfig, {
  entry: {
    client: relativePath("../src/client.js"),
  },
  output: {
    path: relativePath("../client"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].js",
    assetModuleFilename: "asset/[name].[contenthash:8][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: relativePath("../index.html"),
      filename: 'template.html'
    }),
  ],
  devtool: "eval-source-map",
});

const clientPrdConfig = myMerge({}, clientDevConfig, {
  mode: "production",
});
delete clientPrdConfig.devtool;

const ssrDevConfig = myMerge({}, baseConfig, {
  entry: {
    ssr: relativePath("../src/ssr.js"),
  },
  target: "node",
  output: {
    path: relativePath("../server"),
    library: {
      type: "commonjs",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
});

const ssrPrdConfig = myMerge({}, ssrDevConfig, {
  mode: "production",
});
delete ssrPrdConfig.devtool;

module.exports = {
  baseConfig,
  clientDevConfig,
  clientPrdConfig,
  ssrDevConfig,
  ssrPrdConfig,
};
