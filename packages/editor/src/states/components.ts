import { action, computed, observable, toJS } from "mobx";
import { ComponentInstance, Maybe } from "types";
import { pagesStore } from "./pages";
import { materialsStore } from "./materials";
import {
  addPageComponentInstanceMap,
  createComponentInstance,
  deleteCurrentPageComponentIndex,
  deletePageComponentInstanceMap,
  injectGlobalReadonlyGetter,
  setCurrentPageComponentIndex
} from "../utils";
import { selectStore } from "./select";

export class ComponentsStore {
  @observable
  private pagesComponentInstancesMap: {
    [key: number]: ComponentInstance[];
  } = {};

  @computed
  public get componentInstances(): ComponentInstance[] {
    return this.pagesComponentInstancesMap[pagesStore.currentPage.key];
  }

  @action
  public addComponentInstancesMap = (pageKey: number) => {
    this.pagesComponentInstancesMap[pageKey] = [];
    addPageComponentInstanceMap(pageKey);
  };

  @action
  public deleteComponentInstancesMap = (pageKey: number) => {
    delete this.pagesComponentInstancesMap[pageKey];
    deletePageComponentInstanceMap(pageKey);
  };

  @action
  public addComponentInstance = (componentID: string) => {
    const component = materialsStore.components[componentID];
    const instance = createComponentInstance(component);

    const instances = this.pagesComponentInstancesMap[
      pagesStore.currentPage.key
    ];
    instances.push(instance);

    setCurrentPageComponentIndex(instance.key, [instances.length - 1]);
    selectStore.selectComponent(instance.key);
  };

  @action
  public deleteComponentInstance = (key: number) => {
    const instances = this.pagesComponentInstancesMap[
      pagesStore.currentPage.key
    ];
    const index = deleteCurrentPageComponentIndex(key, instances);
    instances.splice(index[0], 1);
    selectStore.selectPage(selectStore.pageIndex);
  };
}

export const componentsStore = new ComponentsStore();

injectGlobalReadonlyGetter("vize_components_store", () =>
  toJS(componentsStore)
);
