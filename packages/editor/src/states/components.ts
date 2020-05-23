import { action, computed, observable } from "mobx";
import { ComponentInstance, Maybe } from "types";
import { pagesStore } from "./pages";
import { materialsStore } from "./materials";
import { createComponentInstance, isNumber } from "../utils";
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
  };

  @action
  public deleteComponentInstancesMap = (pageKey: number) => {
    delete this.pagesComponentInstancesMap[pageKey];
  };

  @action
  public addComponentInstance = (componentID: string) => {
    const component = materialsStore.components[componentID];
    const instance = createComponentInstance(component);
    this.componentInstances.push(instance);
    selectStore.selectComponent(instance.key);
  };
}

export const componentsStore = new ComponentsStore();
