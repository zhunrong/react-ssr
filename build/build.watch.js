const webpack = require("webpack");
const { clientDevConfig, ssrDevConfig, baseConfig } = require("./build.config");

const multiCompiler = webpack([
  // 构建 client
  clientDevConfig,
  // 构建 ssr
  ssrDevConfig,
]);

multiCompiler.watch(
  {
    ignored: /node_modules/,
    aggregateTimeout: 200,
  },
  (err, stats) => {
    if (err) {
      throw err;
    }
    console.log(stats.toString(baseConfig.stats));
  }
);
