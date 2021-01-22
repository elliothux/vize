import * as path from 'path';
import * as fs from 'fs-extra';
import { ActionsList, ComponentsList, ContainerList, MaterialsList, PluginsList } from '../types';
import { ensureRunPathValid } from './common';

export interface LibPaths {
  root: string;
  src: string;
  temp: string;
  config: string;
  output: string;
  components: string;
  componentsList: ComponentsList;
  plugins: string;
  pluginsList: PluginsList;
  actions: string;
  actionsList: ActionsList;
  containers: string;
  containerList: ContainerList;
  nodeModules: string;
  webpackConfigs: string;
  containerName?: string;
  container?: string;
  containerEntry?: string;
  containerHTML?: string;
  mainEntryTemp: string;
  metaEntryTemp: string;
  formFields: string;
  formRules: string;
  formFieldsList?: string[];
  formRulesList?: string[];
  formsEntryTemp: string;
}

let paths: Maybe<LibPaths> = null;

export function getLibPaths(root: string, containerName?: string): LibPaths {
  if (paths) {
    return paths;
  }
  ensureRunPathValid(root);

  const src = path.resolve(root, './src');
  const temp = path.resolve(root, './.temp');
  const config = path.resolve(root, './.vizerc');
  const output = path.resolve(root, './dist');
  const components = path.resolve(src, './components');
  const componentsList = getItemList(components);
  const plugins = path.resolve(src, './plugins');
  const pluginsList = getItemList(plugins);
  const actions = path.resolve(src, './actions');
  const actionsList = getItemList(actions);
  const containers = path.resolve(src, './containers');
  const containerList = getContainerList(containers);
  const nodeModules = path.resolve(root, './node_modules');
  const webpackConfigs = path.resolve(root, './webpack');
  const mainEntryTemp = path.resolve(temp, './entry_main.js');
  const metaEntryTemp = path.resolve(temp, './entry_meta.js');
  const form = path.resolve(root, './form');
  const formFields = path.resolve(form, './fields');
  const formRules = path.resolve(form, './rules');
  const formsEntryTemp = path.resolve(temp, './entry_forms.js');

  paths = {
    root,
    src,
    temp,
    config,
    output,
    mainEntryTemp,
    metaEntryTemp,
    components,
    componentsList,
    plugins,
    pluginsList,
    actions,
    actionsList,
    containers,
    webpackConfigs,
    nodeModules,
    containerName,
    containerList,
    formFields,
    formRules,
    formsEntryTemp,
  };

  const containerItem = containerList.find(i => i.name === containerName);
  if (containerName && containerItem) {
    paths.container = containerItem.path;
    paths.containerEntry = containerItem.entry;
    paths.containerHTML = containerItem.html;
  }

  if (fs.existsSync(formFields)) {
    const items = fs.readdirSync(formFields).map(name => path.resolve(formFields, name));
    paths.formFieldsList = items.length ? items : null;
  }

  if (fs.existsSync(formRules)) {
    const items = fs.readdirSync(formRules).map(name => path.resolve(formRules, name));
    paths.formRulesList = items.length ? items : null;
  }

  return paths;
}

function getItemList(folderPath: string): MaterialsList {
  const items = fs.readdirSync(folderPath);
  return items.map(name => {
    const itemPath = path.resolve(folderPath, name);
    return {
      name,
      entry: itemPath,
      mainPath: path.resolve(itemPath, 'index'),
      metaPath: path.resolve(itemPath, 'config'),
    };
  });
}

function getContainerList(folderPath: string): ContainerList {
  const items = fs.readdirSync(folderPath);
  return items.map(name => {
    const itemPath = path.resolve(folderPath, name);
    const entry = path.resolve(itemPath, './index');
    const html = path.resolve(itemPath, './index.html.ejs');

    return {
      name,
      path: itemPath,
      entry,
      html,
    };
  });
}
