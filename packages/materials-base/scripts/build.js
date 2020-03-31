const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "../");
const src = path.resolve(root, "./src");

const componentsPath = path.resolve(src, "./components");
const components = fs
  .readdirSync(componentsPath)
  .map(name => [name, path.resolve(componentsPath, name)]);
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
