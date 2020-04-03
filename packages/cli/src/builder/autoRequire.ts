import * as path from "path";
import * as fs from "fs-extra";
import { LibPaths } from "../utils";

interface MaterialsItem {
  name: string;
  mainPath: string;
  metaPath: string;
}

type MaterialsList = MaterialsItem[];

type ComponentsList = MaterialsList;

type PluginsList = MaterialsList;

type ActionsList = MaterialsList;

export async function generateEntryFile({
  mainEntryTemp,
  metaEntryTemp,
  components,
  plugins,
  actions
}: LibPaths): Promise<void> {
  const componentsList = await getItemList(components);
  const pluginsList = await getItemList(plugins);
  const actionsList = await getItemList(actions);

  await Promise.all([
    generateEntry(
      "main",
      mainEntryTemp,
      componentsList,
      pluginsList,
      actionsList
    ),
    generateEntry(
      "meta",
      metaEntryTemp,
      componentsList,
      pluginsList,
      actionsList
    )
  ]);

  return;
}

async function generateEntry(
  type: "main" | "meta",
  targetPath: string,
  componentsList: ComponentsList,
  pluginsList: PluginsList,
  actionsList: ActionsList
): Promise<void> {
  const genItemContent = ({ name, mainPath, metaPath }: MaterialsItem) => {
    return `${name}: require("${
      type === "main" ? mainPath : metaPath
    }").default,`;
  };

  const content = `export default {
  components: {
    ${componentsList.map(genItemContent)}
  },
  plugins: {
    ${pluginsList.map(genItemContent)}
  },
  actions: {
    ${actionsList.map(genItemContent)}
  },
}`;

  if (fs.existsSync(targetPath)) {
    await fs.unlink(targetPath);
  }

  return fs.writeFile(targetPath, content, { encoding: "utf-8" });
}

async function getItemList(folderPath: string): Promise<MaterialsList> {
  const items = await fs.readdir(folderPath);
  return items.map(name => {
    const itemPath = path.resolve(folderPath, name);
    return {
      name,
      mainPath: path.resolve(itemPath, "index"),
      metaPath: path.resolve(itemPath, "config")
    };
  });
}
