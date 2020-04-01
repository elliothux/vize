import { Configuration } from "webpack";
import { LibPaths } from "../utils";
import { LibConfig } from "../config";

export function getDefaultWebpackConfig(
  { root, mainEntryTemp, metaEntryTemp, output }: LibPaths,
  { libName }: LibConfig
): Configuration {
  return {
    context: root,
    entry: {
      main: mainEntryTemp,
      meta: metaEntryTemp
    },
    output: {
      path: output,
      filename: `${libName}.[name].js`,
      library: `@vize-materials-${libName}_[name]`,
      libraryTarget: "window",
      umdNamedDefine: true
    },
    externals: {
      react: "React",
      antd: "Antd",
      "react-dom": "ReactDom",
      "react-dom/server": "ReactDomServer"
    }
    // paths: {
    //   libSrcPath: path.resolve(rootPath, "./src"),
    //   libModulesPath: modulesPath
    // },
    // modules: []
  };
}
