/* eslint-disable max-lines */
import { action, computed, observable, toJS } from 'mobx';
import { ComponentInstance, ComponentPosition, ComponentSize, EventInstance, HotArea, LayoutMode, Maybe } from 'types';
import { getMaterialsComponentMeta, getMaxNodeBottomOffset } from 'runtime';
import { pagesStore } from './pages';
import {
  addPageComponentInstanceIndexMap,
  batchUpdateCurrentPageComponentIndex,
  compareComponentIndex,
  componentEventDepsMap,
  ComponentIndex,
  createComponentInstance,
  deleteCurrentPageComponentIndex,
  deletePageComponentInstanceIndexMap,
  DepsTargetType,
  findComponentInstanceByIndex,
  getCurrentPageComponentIndex,
  isNumber,
  setCurrentPageComponentIndex,
} from '../utils';
import { selectStore, SelectType } from './select';
import { eventStore } from './events';
import { StoreWithUtils } from './utils';
import { editStore } from './edit';
import { sharedStore } from './shared';

export class ComponentsStore extends StoreWithUtils<ComponentsStore> {
  /**
   * @desc PageComponentsMap
   * @struct Map<Page, ComponentInstance[]>
   */
  @observable
  public pagesComponentInstancesMap: { [key: number]: ComponentInstance[] } = {};

  @computed
  public get componentInstances(): ComponentInstance[] {
    return this.getComponentInstancesMap(pagesStore.currentPage.key);
  }

  @action
  public addComponentInstancesMap = (pageKey: number) => {
    this.pagesComponentInstancesMap[pageKey] = [];
    addPageComponentInstanceIndexMap(pageKey);
  };

  @action
  public deleteComponentInstancesMap = (pageKey: number) => {
    delete this.pagesComponentInstancesMap[pageKey];
    deletePageComponentInstanceIndexMap(pageKey);
  };

  @action
  public getComponentInstancesMap = (pageKey: number) => {
    return this.pagesComponentInstancesMap[pageKey];
  };

  /**
   * @desc ComponentInstances
   * @struct ComponentInstance[]
   */
  @action
  public addComponentInstance = (componentID: string) => {
    const component = getMaterialsComponentMeta(componentID)!;
    const instance =
      editStore.layoutMode === LayoutMode.FREE
        ? createComponentInstance(component, true, getMaxNodeBottomOffset(this.componentInstances))
        : createComponentInstance(component, false);

    componentEventDepsMap.createEventDepsMap(instance.key);

    if (selectStore.containerComponentKey > -1) {
      return this.addComponentInstanceAsChildren(instance);
    }

    const instances = this.pagesComponentInstancesMap[pagesStore.currentPage.key];
    instances.push(instance);

    setCurrentPageComponentIndex(instance.key, { index: instances.length - 1 });
    selectStore.selectComponent(false, instance.key);
  };

  @action
  private addComponentInstanceAsChildren = (instance: ComponentInstance) => {
    const instances = this.pagesComponentInstancesMap[pagesStore.currentPage.key];
    const { index: parentIndex } = getCurrentPageComponentIndex(selectStore.containerComponentKey)!;

    const parent = instances[parentIndex!];
    instance.parent = parent;

    const containerChildren = parent.children!;
    containerChildren.push(instance);

    setCurrentPageComponentIndex(instance.key, {
      index: containerChildren.length - 1,
      parentIndex,
    });
    selectStore.selectComponent(false, instance.key, parent.key);
  };

  @action
  public deleteComponentInstance = (key: number) => {
    if (!getCurrentPageComponentIndex(key)) {
      return sharedStore.deleteSharedComponentInstance(key);
    }

    let instances = this.pagesComponentInstancesMap[pagesStore.currentPage.key];
    const { index, parentIndex } = deleteCurrentPageComponentIndex(key, instances);

    if (isNumber(parentIndex)) {
      instances = instances[parentIndex!].children!;
    }

    const [instance] = instances.splice(index, 1);
    selectStore.selectPage(selectStore.pageIndex);
    eventStore.deleteDepsEventInstances(DepsTargetType.Component, key);
    componentEventDepsMap.deleteEventDepsMap(key);
    return instance;
  };

  @action
  public resortComponentInstance = (key: number, oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }

    const instances = this.pagesComponentInstancesMap[pagesStore.currentPage.key];

    const { parentIndex } = getCurrentPageComponentIndex(key)!;
    if (isNumber(parentIndex)) {
      const childrenInstances = instances[parentIndex!]!.children!;
      const [childInstance] = childrenInstances.splice(oldIndex, 1);
      childrenInstances.splice(newIndex, 0, childInstance);
      return batchUpdateCurrentPageComponentIndex(childrenInstances, oldIndex, newIndex);
    }

    const [instance] = instances.splice(oldIndex, 1);
    instances.splice(newIndex, 0, instance);
    return batchUpdateCurrentPageComponentIndex(instances, oldIndex, newIndex);
  };

  @action
  public moveComponentInstance = (oldIndex: ComponentIndex, newIndex: ComponentIndex) => {
    if (compareComponentIndex(oldIndex, newIndex)) {
      return;
    }

    const instances = this.pagesComponentInstancesMap[pagesStore.currentPage.key];
    let instance: ComponentInstance;
    if (isNumber(oldIndex.parentIndex)) {
      const childrenInstances = instances[oldIndex.parentIndex!]!.children!;
      [instance] = childrenInstances.splice(oldIndex.index, 1);
    } else {
      [instance] = instances.splice(oldIndex.index, 1)!;
    }
    deleteCurrentPageComponentIndex(instance.key, instances);
    setCurrentPageComponentIndex(instance.key, newIndex);

    if (isNumber(newIndex.parentIndex)) {
      const childrenInstances = instances[newIndex.parentIndex!]!.children!;
      childrenInstances.splice(newIndex.index, 0, instance);
      batchUpdateCurrentPageComponentIndex(childrenInstances, newIndex.index, childrenInstances.length - 1);
    } else {
      instances.splice(newIndex.index, 0, instance);
      batchUpdateCurrentPageComponentIndex(instances, newIndex.index, instances.length - 1);
    }
  };

  @action
  public dragMoveComponentInstance = (key: number, position: ComponentPosition) => {
    const instance = findComponentInstanceByIndex(
      this.pagesComponentInstancesMap[pagesStore.currentPage.key],
      getCurrentPageComponentIndex(key)!,
    );
    instance.layout!.position = position;
  };

  @action
  public resizeComponentInstance = (key: number, position: ComponentPosition, size: ComponentSize) => {
    const instance = findComponentInstanceByIndex(
      this.pagesComponentInstancesMap[pagesStore.currentPage.key],
      getCurrentPageComponentIndex(key)!,
    );
    instance.layout = {
      position,
      size,
    };
  };

  @action
  public setComponentInstancePropsByKey = (
    key: number,
    setter: (instance: ComponentInstance) => void,
  ): ComponentInstance => {
    const componentIndex = getCurrentPageComponentIndex(key)!;
    if (!componentIndex) {
      return sharedStore.setSharedComponentInstancePropsByKey(key, setter);
    }

    const { index, parentIndex } = componentIndex;
    const instances = this.pagesComponentInstancesMap[pagesStore.currentPage.key];

    const instance = isNumber(parentIndex) ? instances[parentIndex!].children![index] : instances[index];
    setter(instance);

    return instance;
  };

  public getCurrentPageComponentInstance = (componentKey: number): ComponentInstance => {
    const componentIndex = getCurrentPageComponentIndex(componentKey)!;
    if (!componentIndex) {
      return sharedStore.getCurrentSharedComponentInstance(componentKey);
    }

    const instances = this.pagesComponentInstancesMap[pagesStore.currentPage.key];
    const { index, parentIndex } = componentIndex;

    if (isNumber(parentIndex)) {
      return instances[parentIndex!].children![index];
    }

    return instances[index];
  };

  public getCurrentComponentInstance = (): Maybe<ComponentInstance> => {
    const { selectType, componentKey } = selectStore;
    return selectType === SelectType.COMPONENT || selectType === SelectType.HOTAREA
      ? this.getCurrentPageComponentInstance(componentKey)
      : null;
  };

  /**
   * @desc Change Current Component Instance Props
   */
  @action
  private setCurrentComponentInstanceProps = (setter: (instance: ComponentInstance) => void) => {
    return this.setComponentInstancePropsByKey(selectStore.componentKey, setter);
  };

  @action
  public setCurrentComponentInstanceData = (data: object) => {
    return this.setCurrentComponentInstanceProps(instance => {
      instance.data = data;
    });
  };

  @action
  public setCurrentComponentInstanceStyle = (style: object) => {
    return this.setCurrentComponentInstanceProps(instance => {
      instance.style = style;
    });
  };

  @action
  public setCurrentComponentInstanceCommonStyle = (commonStyle: object) => {
    return this.setCurrentComponentInstanceProps(instance => {
      instance.commonStyle = commonStyle;
    });
  };

  @action
  public setCurrentComponentInstanceWrapperStyle = (wrapperStyle: object) => {
    return this.setCurrentComponentInstanceProps(instance => {
      instance.wrapperStyle = wrapperStyle;
    });
  };

  @action
  public setCurrentComponentInstanceEvents = (setter: (events: EventInstance[]) => EventInstance[] | void) => {
    return this.setCurrentComponentInstanceProps(instance => {
      const newEvents = setter(instance.events);
      if (newEvents) {
        instance.events = newEvents;
      }
    });
  };

  @action
  public setCurrentComponentInstanceHotAreas = (setter: (hotAreas: HotArea[]) => HotArea[] | void) => {
    return this.setCurrentComponentInstanceProps(instance => {
      const newHotAreas = setter(instance.hotAreas!);
      if (newHotAreas) {
        instance.hotAreas = newHotAreas;
      }
    });
  };
}

export const componentsStore = new ComponentsStore();
