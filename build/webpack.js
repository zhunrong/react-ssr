const webpack = require("webpack");
const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackConfig = {
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
    ],
  },
};

const multiCompiler = webpack([
  // 构建 client
  merge({}, webpackConfig, {
    entry: {
      client: path.resolve(__dirname, "../src/client.js"),
    },
    output: {
      path: path.resolve(__dirname, "../client"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../index.html"),
      }),
    ],
  }),
  // 构建 ssr
  merge({}, webpackConfig, {
    entry: {
      ssr: path.resolve(__dirname, "../src/ssr.js"),
    },
    target: "node",
    output: {
      path: path.resolve(__dirname, "../server"),
      library: {
        type: "commonjs",
      },
    },
  }),
]);

// multiCompiler.run((err, stats) => {
//   if (err) {
//     throw err;
//   }
//   console.log(stats.toString());
// });

multiCompiler.watch({
  ignored: /node_modules/,
  aggregateTimeout: 200,
}, (err, stats) => {
  if (err) {
    throw err;
  }
  console.log(stats.toString());
});
