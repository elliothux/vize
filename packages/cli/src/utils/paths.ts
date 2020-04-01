import path from "path";

export interface LibPaths {
  root: string;
  src: string;
  temp: string;
  config: string;
  mainEntryTemp: string;
  metaEntryTemp: string;
  output: string;
}

let paths: Maybe<LibPaths> = null;

export function getLibPaths(root: string): LibPaths {
  if (paths) {
    return paths;
  }

  const src = path.resolve(root, "./src");
  const temp = path.resolve(root, "./temp");
  const config = path.resolve(root, "./.vizerc");
  const mainEntryTemp = path.resolve(temp, "./entry_main.js");
  const metaEntryTemp = path.resolve(temp, "./entry_meta.js");
  const output = path.resolve(root, "./dist");
  paths = {
    root,
    src,
    temp,
    config,
    mainEntryTemp,
    metaEntryTemp,
    output
  };

  return paths;
}
