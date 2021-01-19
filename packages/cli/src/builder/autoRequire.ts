import * as fs from 'fs-extra';
import { LibPaths } from '../utils';
import { findPreview, findThumb } from './utils';
import { MaterialsItem, ComponentsList, PluginsList, ActionsList } from '../types';
import { LibConfig } from '../config';

export async function generateMaterialsEntryFile(
  { mainEntryTemp, metaEntryTemp, componentsList, pluginsList, actionsList }: LibPaths,
  libConfig: LibConfig,
  withForms: boolean,
  isProd: boolean,
): Promise<void> {
  const params = {
    componentsList,
    pluginsList,
    actionsList,
    libConfig,
    withForms,
  };
  await Promise.all([
    // isProd ? Promise.resolve() : generateEntry({ type: 'main', targetPath: mainEntryTemp, ...params }),
    generateEntry({ type: 'main', targetPath: mainEntryTemp, ...params }),
    generateEntry({ type: 'meta', targetPath: metaEntryTemp, ...params }),
  ]);

  return;
}

export async function generateFormEntryFile({
  formRulesList,
  formFieldsList,
  formsEntryTemp,
}: LibPaths): Promise<boolean> {
  if (!formFieldsList && !formRulesList) {
    return false;
  }

  const content = `export default {\n\t${formFieldsList ? `${genFormContent('fields', formFieldsList)}` : ''},\n\t${
    formRulesList ? `${genFormContent('rules', formRulesList)}` : ''
  }\n}`;

  await writeFile(formsEntryTemp, content);
  return true;
}

interface GenEntryParams {
  type: 'main' | 'meta';
  targetPath: string;
  componentsList: ComponentsList;
  pluginsList: PluginsList;
  actionsList: ActionsList;
  libConfig: LibConfig;
  withForms: boolean;
}

async function generateEntry({
  type,
  targetPath,
  componentsList,
  pluginsList,
  actionsList,
  libConfig,
  withForms,
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
  }${type === 'meta' && withForms ? ',\n\twithForms: true' : ''}
}`;

  return writeFile(targetPath, content);
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

function genFormContent(key: string, items: string[]): string {
  return `${key}: [\n${items.map(i => `\t\trequire("${i}").default, \n`).join('')}\t]`;
}

async function writeFile(targetPath: string, content: string) {
  if (fs.existsSync(targetPath)) {
    await fs.unlink(targetPath);
  }

  return fs.writeFile(targetPath, content, { encoding: 'utf-8' });
}
