const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../.temp/entry.js"), //入口文件
  output: {
    path: path.resolve(__dirname, "../build"), //输出位置
    filename: "index.js" //输入文件
  },
  module: {},
  mode: "development"
};
