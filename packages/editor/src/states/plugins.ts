import { action, computed, observable } from "mobx";
import { PluginInstance } from "types";
import { pagesStore } from "./pages";

export class PluginsStore {
  @observable
  private pagesPluginInstancesMap: {
    [key: number]: PluginInstance[];
  } = {};

  @computed
  public get pluginsInstances(): PluginInstance[] {
    return this.pagesPluginInstancesMap[pagesStore.currentPage.key];
  }

  @action
  public addPluginInstancesMap = (pageKey: number) => {
    this.pagesPluginInstancesMap[pageKey] = [];
  };

  @action
  public deletePluginInstancesMap = (pageKey: number) => {
    delete this.pagesPluginInstancesMap[pageKey];
  };
}

export const pluginsStore = new PluginsStore();
