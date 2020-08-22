import { action, computed, observable } from 'mobx';
import { EventInstance, PluginInstance } from 'types';
import {
  addPagePluginInstanceIndexMap,
  deletePagePluginInstanceIndexMap,
  createPluginInstance,
  getCurrentPagePluginIndex,
  regenerateCurrentPagePluginIndexMap,
  setCurrentPagePluginIndex,
} from '../utils';
import { materialsStore } from './materials';
import { selectStore } from './select';
import { pagesStore } from './pages';
import { globalStore } from './global';

export class PluginsStore {
  /**
   * @desc PagePluginsMap
   * @struct Map<Page, PluginInstance[]>
   */
  @observable
  private pagesPluginInstancesMap: {
    [key: number]: PluginInstance[];
  } = {};

  @observable
  public singlePagePluginsInstances: PluginInstance[] = [];

  @computed
  public get pluginInstances(): PluginInstance[] {
    if (globalStore.isSinglePageMode) {
      return this.singlePagePluginsInstances;
    }
    return this.pagesPluginInstancesMap[pagesStore.currentPage.key];
  }

  @action
  public addPluginInstancesMap = (pageKey: number) => {
    this.pagesPluginInstancesMap[pageKey] = [];
    addPagePluginInstanceIndexMap(pageKey);
  };

  @action
  public deletePluginInstancesMap = (pageKey: number) => {
    delete this.pagesPluginInstancesMap[pageKey];
    deletePagePluginInstanceIndexMap(pageKey);
  };

  /**
   * @desc PluginInstances
   * @struct PluginInstance[]
   */
  @action
  private changePluginInstance = (setter: (pluginInstances: PluginInstance[]) => PluginInstance[] | void) => {
    if (globalStore.isSinglePageMode) {
      const newInstances = setter(this.singlePagePluginsInstances);
      if (newInstances) {
        this.singlePagePluginsInstances = newInstances;
      }
      return;
    }

    const instance = this.pagesPluginInstancesMap[pagesStore.currentPage.key];
    const newInstances = setter(instance);
    if (newInstances) {
      this.pagesPluginInstancesMap[pagesStore.currentPage.key] = newInstances;
    }
  };

  @action
  public addPluginInstance = (pluginID: string) => {
    const plugin = materialsStore.plugins[pluginID];
    const instance = createPluginInstance(plugin);

    this.changePluginInstance(pluginInstances => {
      pluginInstances.push(instance);
      setCurrentPagePluginIndex(instance.key, pluginInstances.length - 1);
    });

    selectStore.selectPlugin(instance.key);
  };

  @action
  public deletePluginInstance = (key: number) => {
    const index = getCurrentPagePluginIndex(key)!;

    this.changePluginInstance(pluginInstances => {
      pluginInstances.splice(index, 1);
      regenerateCurrentPagePluginIndexMap(pluginInstances);
    });

    selectStore.selectPage(selectStore.pageIndex);
  };

  public getPluginInstance = (key: number): PluginInstance => {
    const index = getCurrentPagePluginIndex(key)!;
    return this.pluginInstances[index];
  };

  @action
  public setCurrentPluginInstanceData = (data: object) => {
    const instance = this.getPluginInstance(selectStore.pluginKey);
    instance.data = data;
    return data;
  };

  @action
  public setCurrentPluginInstanceEvents = (setter: (events: EventInstance[]) => EventInstance[]) => {
    const index = getCurrentPagePluginIndex(selectStore.pluginKey)!;
    const instance = this.pluginInstances[index];

    instance.events = setter(instance.events);
    return instance;
  };
}

export const pluginsStore = new PluginsStore();
