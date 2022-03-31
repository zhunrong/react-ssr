const webpack = require("webpack");
const { clientPrdConfig, ssrPrdConfig, baseConfig } = require("./build.config");

const multiCompiler = webpack([
  // 构建 client
  clientPrdConfig,
  // 构建 ssr
  ssrPrdConfig,
]);

multiCompiler.run((err, stats) => {
  if (err) {
    throw err;
  }
  console.log(stats.toString(baseConfig.stats));
});
