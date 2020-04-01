import * as path from "path";
import * as fs from "fs";

type ComponentList = { name: string; mainPath: string; metaPath: string }[];

export function generateBuildTemp(root: string): void {
  const src = path.resolve(root, "./src");

  console.log(components);

  const targetPath = path.resolve(root, ".temp/entry.js");
  const tempContent = `export default {
  components: {
    ${components.map(([name, path]) => `${name}: require("${path}"),`)}
  },
 }`;

  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
  fs.writeFileSync(targetPath, tempContent, { encoding: "utf-8" });
}

generateBuildTemp(path.resolve(__dirname, "../"));

function getComponentList(src: string): ComponentList {
  const componentsPath = path.resolve(src, "./components");
  return fs.readdirSync(componentsPath).map(name => {
    const componentPath = path.resolve(componentsPath, name);
    return {
      name,
      mainPath: path.resolve(componentPath, "index"),
      metaPath: path.resolve(componentPath, "config")
    };
  });
}
