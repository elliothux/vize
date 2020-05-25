import { action, computed, observable, toJS } from "mobx";
import { ComponentInstance, Maybe } from "types";
import { pagesStore } from "./pages";
import { materialsStore } from "./materials";
import { createComponentInstance, injectGlobalReadonlyGetter, isNumber } from "../utils";
import { selectStore } from "./select";

export class ComponentsStore {
  @observable
  private pagesComponentInstancesMap: {
    [key: number]: ComponentInstance[];
  } = {};

  @computed
  public get componentInstances(): ComponentInstance[] {
    console.log("get componentInstances");
    return this.pagesComponentInstancesMap[pagesStore.currentPage.key];
  }

  @action
  public addComponentInstancesMap = (pageKey: number) => {
    this.pagesComponentInstancesMap[pageKey] = [];
  };

  @action
  public deleteComponentInstancesMap = (pageKey: number) => {
    delete this.pagesComponentInstancesMap[pageKey];
  };

  @action
  public addComponentInstance = (componentID: string) => {
    console.log("add");
    const component = materialsStore.components[componentID];
    const instance = createComponentInstance(component);
    this.pagesComponentInstancesMap[pagesStore.currentPage.key].push(instance);
    selectStore.selectComponent(instance.key);
  };
}

export const componentsStore = new ComponentsStore();

injectGlobalReadonlyGetter("vize_components_store", () => toJS(componentsStore));
