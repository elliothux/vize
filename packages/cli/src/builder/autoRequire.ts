import * as fs from 'fs-extra';
import { LibPaths } from '../utils';
import { findPreview, findThumb } from './utils';
import { MaterialsItem, ComponentsList, PluginsList, ActionsList } from '../types';

export async function generateEntryFile(
  { mainEntryTemp, metaEntryTemp, componentsList, pluginsList, actionsList }: LibPaths,
  isProd: boolean,
): Promise<void> {
  await Promise.all([
    isProd ? Promise.resolve() : generateEntry('main', mainEntryTemp, componentsList, pluginsList, actionsList),
    generateEntry('meta', metaEntryTemp, componentsList, pluginsList, actionsList),
  ]);

  return;
}

async function generateEntry(
  type: 'main' | 'meta',
  targetPath: string,
  componentsList: ComponentsList,
  pluginsList: PluginsList,
  actionsList: ActionsList,
): Promise<void> {
  const genItemContent = type === 'main' ? genItemMainContent : genItemMetaContent;

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

function genItemMetaContent({ name, entry, metaPath }: MaterialsItem) {
  const thumb = findThumb(entry);
  const preview = findPreview(entry);
  return `${name}: { ${thumb ? `thumb: require("${thumb}").default || require("${thumb}"), ` : ''}${
    preview ? `preview: require("${preview}").default || require("${preview}"), ` : ''
  }...(require("${metaPath}").default) }`;
}
