import path from "path";

export interface LibPaths {
  root: string;
  src: string;
  temp: string;
  config: string;
  output: string;
  components: string;
  plugins: string;
  actions: string;
  containers: string;
  mainEntryTemp: string;
  metaEntryTemp: string;
}

let paths: Maybe<LibPaths> = null;

export function getLibPaths(root: string): LibPaths {
  if (paths) {
    return paths;
  }

  const src = path.resolve(root, "./src");
  const temp = path.resolve(root, "./temp");
  const config = path.resolve(root, "./.vizerc");
  const output = path.resolve(root, "./dist");
  const mainEntryTemp = path.resolve(temp, "./entry_main.js");
  const metaEntryTemp = path.resolve(temp, "./entry_meta.js");
  const components = path.resolve(src, "./components");
  const plugins = path.resolve(src, "./plugins");
  const actions = path.resolve(src, "./actions");
  const containers = path.resolve(src, "./containers");

  paths = {
    root,
    src,
    temp,
    config,
    output,
    mainEntryTemp,
    metaEntryTemp,
    components,
    plugins,
    actions,
    containers
  };

  return paths;
}
