import { action, computed, observable } from 'mobx';
import { EventInstance, Maybe, PluginInstance } from 'types';
import { getMaterialsPluginMeta } from 'runtime';
import {
  addPagePluginInstanceIndexMap,
  createPluginInstance,
  deletePagePluginInstanceIndexMap,
  DepsTargetType,
  getCurrentPagePluginIndex,
  pluginEventDepsMap,
  regenerateCurrentPagePluginIndexMap,
  setCurrentPagePluginIndex,
} from '../utils';
import { selectStore, SelectType } from './select';
import { pagesStore } from './pages';
import { eventStore } from './events';
import { editStore } from './edit';
import { StoreWithUtils } from './utils';

export class PluginsStore extends StoreWithUtils<PluginsStore> {
  /**
   * @desc PagePluginsMap
   * @struct Map<Page, PluginInstance[]>
   */
  @observable
  public pagesPluginInstancesMap: {
    [key: number]: PluginInstance[];
  } = {};

  @observable
  public singlePagePluginsInstances: PluginInstance[] = [];

  @computed
  public get pluginInstances(): PluginInstance[] {
    return this.getPluginInstances(pagesStore.currentPage.key);
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

  public getPluginInstances = (pageKey: number) => {
    if (editStore.isSinglePageMode) {
      return this.singlePagePluginsInstances;
    }
    return this.pagesPluginInstancesMap[pageKey];
  };

  /**
   * @desc PluginInstances
   * @struct PluginInstance[]
   */
  @action
  private changePluginInstance = (setter: (pluginInstances: PluginInstance[]) => PluginInstance[] | void) => {
    if (editStore.isSinglePageMode) {
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
    const plugin = getMaterialsPluginMeta(pluginID)!;
    const instance = createPluginInstance(plugin);

    this.changePluginInstance(pluginInstances => {
      pluginInstances.push(instance);
      setCurrentPagePluginIndex(instance.key, pluginInstances.length - 1);
    });

    selectStore.selectPlugin(instance.key);
    pluginEventDepsMap.createEventDepsMap(instance.key);
  };

  @action
  public deletePluginInstance = (key: number) => {
    const index = getCurrentPagePluginIndex(key)!;

    this.changePluginInstance(pluginInstances => {
      pluginInstances.splice(index, 1);
      regenerateCurrentPagePluginIndexMap(pluginInstances);
    });

    selectStore.selectPage(selectStore.pageIndex);
    eventStore.deleteDepsEventInstances(DepsTargetType.Plugin, key);
    pluginEventDepsMap.deleteEventDepsMap(key);
  };

  public getCurrentPagePluginInstance = (key: number): PluginInstance => {
    const index = getCurrentPagePluginIndex(key)!;
    return this.pluginInstances[index];
  };

  public getCurrentPluginInstance = (): Maybe<PluginInstance> => {
    const { selectType, pluginKey } = selectStore;
    return selectType === SelectType.PLUGIN ? this.getCurrentPagePluginInstance(pluginKey) : null;
  };

  @action
  public setPluginInstancePropsByKey = (key: number, setter: (instance: PluginInstance) => void) => {
    const instance = this.getCurrentPagePluginInstance(key);
    setter(instance);
    return instance;
  };

  @action
  private setCurrentPluginInstanceProps = (setter: (instance: PluginInstance) => void) => {
    const instance = this.getCurrentPagePluginInstance(selectStore.pluginKey);
    setter(instance);
    return instance;
  };

  @action
  public setCurrentPluginInstanceData = (data: object) => {
    return this.setCurrentPluginInstanceProps(instance => {
      instance.data = data;
    });
  };

  @action
  public setCurrentPluginInstanceEvents = (setter: (events: EventInstance[]) => EventInstance[] | void) => {
    return this.setCurrentPluginInstanceProps(instance => {
      const newEvents = setter(instance.events);
      if (newEvents) {
        instance.events = newEvents;
      }
      return instance;
    });
  };
}

export const pluginsStore = new PluginsStore();
