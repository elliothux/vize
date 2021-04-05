import { action, computed } from 'mobx';
import { ComponentInstance, ComponentPosition, ComponentSize, EventInstance, HotArea, LayoutMode, Maybe } from 'types';
import { getMaterialsComponentMeta, getMaxNodeBottomOffset } from 'runtime';
import { isNumber } from 'utils';
import {
  createComponentInstance,
  compareComponentIndex,
  getCurrentPageComponentIndex,
  setCurrentPageComponentIndex,
  deleteCurrentPageComponentIndex,
  batchUpdateCurrentPageComponentIndex,
  findComponentInstanceByIndex,
  componentEventDepsMap,
  DepsTargetType,
  ComponentIndex,
} from 'libs';
import { pagesStore } from './pages';
import { selectStore, SelectType } from './select';
import { eventStore } from './events';
import { StoreWithUtils } from './utils';
import { editStore } from './edit';
import { sharedStore } from './shared';

export class ComponentsStore extends StoreWithUtils<ComponentsStore> {
  @computed
  public get componentInstances(): ComponentInstance[] {
    return pagesStore.currentPage.componentInstances;
  }

  @action
  public setCurrentPageComponentInstances = (
    setter: (componentInstances: ComponentInstance[]) => ComponentInstance[] | void,
  ) => {
    let newInstances: ComponentInstance[] | undefined;
    pagesStore.setCurrentPage(page => {
      newInstances = setter(page.componentInstances) || undefined;
      if (newInstances) {
        page.componentInstances = newInstances;
      }
    });
    return newInstances;
  };

  @action
  public addComponentInstance = (componentID: string) => {
    return this.setCurrentPageComponentInstances(instances => {
      const component = getMaterialsComponentMeta(componentID)!;
      const instance =
        editStore.layoutMode === LayoutMode.FREE
          ? createComponentInstance(component, true, getMaxNodeBottomOffset(this.componentInstances))
          : createComponentInstance(component, false);

      componentEventDepsMap.createEventDepsMap(instance.key);

      if (selectStore.containerComponentKey > -1) {
        return this.addComponentInstanceAsChildren(instance);
      }

      instances.push(instance);
      setCurrentPageComponentIndex(instance.key, { index: instances.length - 1 });
      selectStore.selectComponent(false, instance.key);
    });
  };

  @action
  private addComponentInstanceAsChildren = (instance: ComponentInstance) => {
    return this.setCurrentPageComponentInstances(instances => {
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
    });
  };

  @action
  public deleteComponentInstance = (key: number) => {
    if (!getCurrentPageComponentIndex(key)) {
      return sharedStore.deleteSharedComponentInstance(key);
    }

    let deletedInstance: ComponentInstance;
    this.setCurrentPageComponentInstances(instances => {
      const { index, parentIndex } = deleteCurrentPageComponentIndex(key, instances);

      if (isNumber(parentIndex)) {
        instances = instances[parentIndex!].children!;
      }

      const [instance] = instances.splice(index, 1);
      selectStore.selectPage(selectStore.pageIndex);
      eventStore.deleteDepsEventInstances(DepsTargetType.Component, key);
      componentEventDepsMap.deleteEventDepsMap(key);
      deletedInstance = instance;
    });
    return deletedInstance!;
  };

  @action
  public resortComponentInstance = (key: number, oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }

    return this.setCurrentPageComponentInstances(instances => {
      const { parentIndex } = getCurrentPageComponentIndex(key)!;
      if (isNumber(parentIndex)) {
        const childrenInstances = instances[parentIndex!]!.children!;
        const [childInstance] = childrenInstances.splice(oldIndex, 1);
        childrenInstances.splice(newIndex, 0, childInstance);
        return batchUpdateCurrentPageComponentIndex(childrenInstances, oldIndex, newIndex);
      }

      const [instance] = instances.splice(oldIndex, 1);
      instances.splice(newIndex, 0, instance);
      batchUpdateCurrentPageComponentIndex(instances, oldIndex, newIndex);
    });
  };

  @action
  public moveComponentInstance = (oldIndex: ComponentIndex, newIndex: ComponentIndex) => {
    if (compareComponentIndex(oldIndex, newIndex)) {
      return;
    }

    return this.setCurrentPageComponentInstances(instances => {
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
    });
  };

  @action
  public dragMoveComponentInstance = (key: number, position: ComponentPosition) => {
    return this.setCurrentPageComponentInstances(instances => {
      const instance = findComponentInstanceByIndex(instances, getCurrentPageComponentIndex(key)!);
      instance.layout!.position = position;
    });
  };

  @action
  public resizeComponentInstance = (key: number, position: ComponentPosition, size: ComponentSize) => {
    return this.setCurrentPageComponentInstances(instances => {
      const instance = findComponentInstanceByIndex(instances, getCurrentPageComponentIndex(key)!);
      instance.layout = {
        position,
        size,
      };
    });
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

    let instance: ComponentInstance;
    this.setCurrentPageComponentInstances(instances => {
      instance = isNumber(parentIndex) ? instances[parentIndex!].children![index] : instances[index];
      setter(instance);
    });

    return instance!;
  };

  public getCurrentPageComponentInstance = (componentKey: number): ComponentInstance => {
    const componentIndex = getCurrentPageComponentIndex(componentKey)!;
    if (!componentIndex) {
      return sharedStore.getCurrentSharedComponentInstance(componentKey);
    }

    const { componentInstances: instances } = pagesStore.currentPage;
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
