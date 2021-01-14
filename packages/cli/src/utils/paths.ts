import * as path from 'path';
import * as fs from 'fs-extra';
import { ActionsList, ComponentsList, ContainerList, MaterialsList, PluginsList } from '../types';
import { ensureRunPathValid } from './common';
import { error } from './logger';

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
  const mainEntryTemp = path.resolve(temp, './entry_main.js');
  const metaEntryTemp = path.resolve(temp, './entry_meta.js');
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

  let container;
  let containerEntry;
  let containerHTML;
  const containerItem = containerList.find(i => i.name === containerName);
  if (containerName && containerItem) {
    container = containerItem.path;
    containerEntry = containerItem.entry;
    containerHTML = containerItem.html;
  }

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
    container,
    containerList,
    containerEntry,
    containerHTML,
  };

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
