import path from "path";
import fs from "fs-extra";
import { Configuration } from "webpack";
import { LibPaths } from "../utils";
import { LibConfig } from "../config";
import { getLibDefaultWebpackConfig } from "./lib.default";

export function getLibWebpackConfig(
  libPaths: LibPaths,
  libConfig: LibConfig,
  isProd: boolean
): Configuration {
  const { webpackConfigs } = libPaths;
  let config = getLibDefaultWebpackConfig(libPaths, libConfig, isProd);

  const libConfigPath = path.resolve(webpackConfigs, "./lib.dev.js");
  if (fs.existsSync(libConfigPath)) {
    config = require(libConfigPath)(config);
  }

  return config;
}
