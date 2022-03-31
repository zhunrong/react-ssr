const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

const relativePath = (...pathArr) => path.resolve(__dirname, ...pathArr);

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
              modules: true,
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
              modules: true,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(), new webpack.ProgressPlugin()],
  stats: {
    assets: true,
    modules: false,
    colors: true,
  },
};

const clientDevConfig = merge({}, baseConfig, {
  entry: {
    client: relativePath("../src/client.js"),
  },
  output: {
    path: relativePath("../client"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: relativePath("../index.html"),
    }),
  ],
  devtool: "eval-source-map",
});

const clientPrdConfig = merge({}, clientDevConfig, {
  mode: "production",
});
delete clientPrdConfig.devtool;


const ssrDevConfig = merge({}, baseConfig, {
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
});

const ssrPrdConfig = merge({}, ssrDevConfig, {
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
