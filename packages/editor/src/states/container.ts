import { action, computed, observable } from 'mobx';
import { EventInstance } from 'types';
import { StoreWithUtils } from './utils';
import { pagesStore } from './pages';
import { editStore } from './edit';

export class ContainerStore extends StoreWithUtils<ContainerStore> {
  /**
   * @desc PageContainerEventsMap
   * @struct Map<Page, EventInstance[]>
   */
  @observable
  public pagesContainerEventInstancesMap: { [key: number]: EventInstance[] } = {};

  @observable
  public singlePageContainerEventInstances: EventInstance[] = [];

  @computed
  public get containerEvents(): EventInstance[] {
    return this.getContainerEventInstances(pagesStore.currentPage.key);
  }

  @action
  public addContainerEventInstancesMap = (pageKey: number) => {
    this.pagesContainerEventInstancesMap[pageKey] = [];
  };

  @action
  public deleteContainerEventInstancesMap = (pageKey: number) => {
    delete this.pagesContainerEventInstancesMap[pageKey];
  };

  public getContainerEventInstances = (pageKey: number) => {
    if (editStore.isSinglePageMode) {
      return this.singlePageContainerEventInstances;
    }
    return this.pagesContainerEventInstancesMap[pageKey];
  };

  @action
  public setCurrentPageContainerEvents = (setter: (eventInstances: EventInstance[]) => EventInstance[] | void) => {
    if (editStore.isSinglePageMode) {
      const newInstances = setter(this.singlePageContainerEventInstances);
      if (newInstances) {
        this.singlePageContainerEventInstances = newInstances;
      }
      return;
    }

    const instance = this.pagesContainerEventInstancesMap[pagesStore.currentPage.key];
    const newInstances = setter(instance);
    if (newInstances) {
      this.pagesContainerEventInstancesMap[pagesStore.currentPage.key] = newInstances;
    }
  };
}

export const containerStore = new ContainerStore();
