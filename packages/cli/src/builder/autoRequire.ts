import * as fs from 'fs-extra';
import { LibPaths } from '../utils';
import { findPreview, findThumb } from './utils';
import { MaterialsItem, ComponentsList, PluginsList, ActionsList } from '../types';
import { LibConfig } from '../config';

export async function generateEntryFile(
  { mainEntryTemp, metaEntryTemp, componentsList, pluginsList, actionsList }: LibPaths,
  libConfig: LibConfig,
  isProd: boolean,
): Promise<void> {
  const params = {
    componentsList,
    pluginsList,
    actionsList,
    libConfig,
  };
  await Promise.all([
    // isProd ? Promise.resolve() : generateEntry({ type: 'main', targetPath: mainEntryTemp, ...params }),
    generateEntry({ type: 'main', targetPath: mainEntryTemp, ...params }),
    generateEntry({ type: 'meta', targetPath: metaEntryTemp, ...params }),
  ]);

  return;
}

interface GenEntryParams {
  type: 'main' | 'meta';
  targetPath: string;
  componentsList: ComponentsList;
  pluginsList: PluginsList;
  actionsList: ActionsList;
  libConfig: LibConfig;
}

async function generateEntry({
  type,
  targetPath,
  componentsList,
  pluginsList,
  actionsList,
  libConfig,
}: GenEntryParams): Promise<void> {
  const genItemContent =
    type === 'main' ? genItemMainContent : (item: MaterialsItem) => genItemMetaContent(item, libConfig);

  const content = `export default {
  components: {
    ${componentsList.map(genItemContent).join(',')}
  },
  plugins: {
    ${pluginsList.map(genItemContent).join(',')}
  },
  actions: {
    ${actionsList.map(genItemContent).join(',')}
  }
}`;

  if (fs.existsSync(targetPath)) {
    await fs.unlink(targetPath);
  }

  return fs.writeFile(targetPath, content, { encoding: 'utf-8' });
}

function genItemMainContent({ name, mainPath }: MaterialsItem) {
  return `${name}: require("${mainPath}").default`;
}

function genItemMetaContent({ name, entry, metaPath }: MaterialsItem, { __isBuildIn }: LibConfig) {
  const thumb = findThumb(entry);
  const preview = findPreview(entry);
  return `${name}: { ${thumb ? `thumb: require("${thumb}").default || require("${thumb}"), ` : ''}${
    preview ? `preview: require("${preview}").default || require("${preview}"), ` : ''
  }${__isBuildIn ? 'isBuildIn: true,' : ''}...(require("${metaPath}").default) }`;
}
