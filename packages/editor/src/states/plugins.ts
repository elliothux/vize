import { action, observable } from 'mobx';
import { ActionInstance, PluginInstance } from 'types';
import { materialsStore } from './materials';
import { createPluginInstance, getPluginIndex, regeneratePluginIndexMap, setPluginIndex } from '../utils';
import { selectStore } from './select';

export class PluginsStore {
  @observable
  public pluginsInstances: PluginInstance[] = [];

  @action
  public addPluginInstance = (pluginID: string) => {
    const plugin = materialsStore.plugins[pluginID];
    const instance = createPluginInstance(plugin);

    this.pluginsInstances.push(instance);

    selectStore.selectPlugin(instance.key);
    setPluginIndex(instance.key, this.pluginsInstances.length - 1);
  };

  @action
  public deletePluginInstance = (key: number) => {
    const index = getPluginIndex(key)!;
    this.pluginsInstances.splice(index, 1);
    selectStore.selectPage(selectStore.pageIndex);
    regeneratePluginIndexMap(this.pluginsInstances);
  };

  public getPluginInstance = (key: number): PluginInstance => {
    const index = getPluginIndex(key)!;
    return this.pluginsInstances[index];
  };

  @action
  public setCurrentPluginInstanceData = (data: object) => {
    const instance = this.getPluginInstance(selectStore.pluginKey);
    instance.data = data;
    return data;
  };

  @action
  public setCurrentPluginInstanceActions = (setter: (actions: ActionInstance[]) => ActionInstance[]) => {
    const index = getPluginIndex(selectStore.pluginKey)!;
    const instance = this.pluginsInstances[index];

    instance.actions = setter(instance.actions);
    return instance;
  };
}

export const pluginsStore = new PluginsStore();
