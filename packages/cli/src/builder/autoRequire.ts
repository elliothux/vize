import * as fs from 'fs-extra';
import { MaterialsLibConfig } from '@vize/types';
import { LibPaths } from '../utils';
import { findPreview, findThumb } from './utils';
import {
  MaterialsItem,
  ComponentsList,
  PluginsList,
  ActionsList,
  ContainerList,
  MaterialsContainerItem,
} from '../types';

export async function generateMaterialsEntryFile(
  { mainEntryTemp, metaEntryTemp, componentsList, pluginsList, actionsList, containerList }: LibPaths,
  libConfig: MaterialsLibConfig,
  withForms: boolean,
  isProd: boolean,
): Promise<void> {
  const params = {
    componentsList,
    pluginsList,
    actionsList,
    containerList,
    libConfig,
    withForms,
  };
  await Promise.all([
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
  containerList: ContainerList;
  libConfig: MaterialsLibConfig;
  withForms: boolean;
}

async function generateEntry({
  type,
  targetPath,
  componentsList,
  pluginsList,
  actionsList,
  containerList,
  libConfig,
  withForms,
}: GenEntryParams): Promise<void> {
  const isMeta = type === 'meta';
  const genItemContent = !isMeta
    ? genItemMainContent
    : (item: MaterialsItem | MaterialsContainerItem) => genItemMetaContent(item, libConfig);

  const componentsStr = componentsList.map(genItemContent).join(',');
  const pluginsStr = pluginsList.map(genItemContent).join(',');
  const actionsStr = actionsList.map(genItemContent).join(',');
  const containerStr = isMeta ? containerList.map(genItemContent).join(',') : '';

  const content = `export default {
  components: {
    ${componentsStr}
  },
  plugins: {
    ${pluginsStr}
  },
  actions: {
    ${actionsStr}
  },
  containers: {
    ${containerStr}
  }${isMeta && withForms ? ',\n\twithForms: true' : ''}${isMeta ? `,\n\tlib: ${JSON.stringify(libConfig)}` : ''}
}`;

  return writeFile(targetPath, content);
}

function genItemMainContent(item: MaterialsItem | MaterialsContainerItem) {
  const mainPath = (item as MaterialsItem).mainPath;
  if (!mainPath) {
    throw new Error('Should not be here...');
  }
  return `"${item.name}": require("${mainPath}").default`;
}

function genItemMetaContent(
  { name, entry, metaPath }: MaterialsItem | MaterialsContainerItem,
  { __isBuildIn }: MaterialsLibConfig,
) {
  const thumb = findThumb(entry);
  const preview = findPreview(entry);
  return `"${name}": { ${thumb ? `thumb: require("${thumb}").default || require("${thumb}"), ` : ''}${
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
