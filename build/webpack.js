const webpack = require("webpack");
const path = require("path");
const { merge } = require("webpack-merge");

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

const clientCompiler = webpack(
  merge({}, webpackConfig, {
    entry: {
      client: path.resolve(__dirname, "../src/main.js")
    },
    output: {
      path: path.resolve(__dirname, "../client"),
    },
  })
);

const ssrCompiler = webpack(
  merge({}, webpackConfig, {
    entry: {
      ssr: path.resolve(__dirname, "../src/ssr.js")
    },
    target: "node",
    output: {
      path: path.resolve(__dirname, "../server"),
      library: {
        type: 'commonjs'
      }
    },
  })
);

clientCompiler.run((err, stats) => {
  if (err) {
    throw err;
  }
  console.log(stats.toString());
});

ssrCompiler.run((err, stats) => {
  if (err) {
    throw err;
  }
  console.log(stats.toString());
});
