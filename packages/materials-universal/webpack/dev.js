const path = require("path");

const rootPath = path.resolve(__dirname, "../");

module.exports = {
  libName: "materials-base",
  context: rootPath,
  entry: path.resolve(rootPath, ".temp/entry.js"), //入口文件
  output: {
    path: path.resolve(rootPath, "build"), //输出位置
    filename: "index.js"
  },
  externals: {
    react: "React",
    antd: "Antd",
    "react-dom": "ReactDom",
    "react-dom/server": "ReactDomServer"
  },
  // paths: {
  //   libSrcPath: path.resolve(rootPath, "./src"),
  //   libModulesPath: modulesPath
  // },
  modules: []
};
