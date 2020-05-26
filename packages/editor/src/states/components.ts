import { action, computed, observable, toJS } from "mobx";
import { ComponentInstance, Maybe } from "types";
import { pagesStore } from "./pages";
import { materialsStore } from "./materials";
import { createComponentInstance, injectGlobalReadonlyGetter } from "../utils";
import { selectStore } from "./select";

const pagesComponentIndexMap = new Map<number, Map<number, number[]>>();

export class ComponentsStore {
  @observable
  private pagesComponentInstancesMap: {
    [key: number]: ComponentInstance[];
  } = {};

  @computed
  public get componentInstances(): ComponentInstance[] {
    return this.pagesComponentInstancesMap[pagesStore.currentPage.key];
  }

  @computed
  public get componentsIndexMap(): Map<number, number[]> {
    return pagesComponentIndexMap.get(pagesStore.currentPage.key)!;
  }

  @action
  public addComponentInstancesMap = (pageKey: number) => {
    this.pagesComponentInstancesMap[pageKey] = [];
    pagesComponentIndexMap.set(pageKey, new Map<number, number[]>());
  };

  @action
  public deleteComponentInstancesMap = (pageKey: number) => {
    delete this.pagesComponentInstancesMap[pageKey];
    pagesComponentIndexMap.delete(pageKey);
  };

  @action
  public addComponentInstance = (componentID: string) => {
    const component = materialsStore.components[componentID];
    const instance = createComponentInstance(component);

    const instances = this.pagesComponentInstancesMap[
      pagesStore.currentPage.key
    ];
    instances.push(instance);

    this.componentsIndexMap.set(instance.key, [instances.length - 1]);
    selectStore.selectComponent(instance.key);
  };

  @action
  public deleteComponentInstance = (key: number) => {
    const index = this.componentsIndexMap.get(key)!;
    const instances = this.pagesComponentInstancesMap[
      pagesStore.currentPage.key
    ];

    // TODO: index map
    instances.splice(index[0], 1);
    selectStore.selectPage(selectStore.pageIndex);
  };
}

export const componentsStore = new ComponentsStore();

injectGlobalReadonlyGetter("vize_components_store", () =>
  toJS(componentsStore)
);
