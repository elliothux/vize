import { Configuration } from "webpack";
import { LibPaths } from "../utils";
import { MaterialsLibConfig } from "../types";

export function getDefaultWebpackConfig(
  { root, mainEntryTemp, metaEntryTemp, output }: LibPaths,
  { libName }: MaterialsLibConfig
): Configuration {
  return {
    // libName: `vize-materials-${libName}`,
    context: root,
    entry: {
      main: mainEntryTempm,
      meta: metaEntryTemp
    },
    output: {
      path: output,
      filename: `${libName}.[name].js`,
      library: "@vize-materials-[name]",
      libraryTarget: "window",
      umdNamedDefine: true
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
    // modules: []
  };
}
