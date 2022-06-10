import { action, observable } from 'mobx';
import { isNumber } from 'utils';
import {
  deleteSharedComponentIndex,
  getSharedComponentIndex,
  setSharedComponentIndex,
  componentEventDepsMap,
  DepsTargetType,
} from 'libs';
import { ComponentInstance } from '@vize/types';
import { StoreWithUtils } from './utils';
import { componentsStore } from './components';
import { selectStore } from './select';
import { eventStore } from './events';

export class SharedStore extends StoreWithUtils<SharedStore> {
  /**
   * @desc Shared Components
   * @struct ComponentInstance[]
   */
  @observable
  public sharedComponentInstances: ComponentInstance[] = [];

  @action.bound
  public setComponentInstanceAsShared = (componentKey: number) => {
    const instance = componentsStore.deleteComponentInstance(componentKey);
    instance.shared = true;
    instance.parent = undefined;
    this.sharedComponentInstances.push(instance);

    componentEventDepsMap.createEventDepsMap(componentKey);
    const index = this.sharedComponentInstances.length - 1;
    setSharedComponentIndex(componentKey, { index });
    selectStore.selectComponent(true, componentKey);

    instance?.children?.forEach(({ key }, childIndex) => {
      setSharedComponentIndex(key, { index: childIndex, parentIndex: index });
    });
  };

  @action.bound
  public setSharedComponentInstancePropsByKey = (
    key: number,
    setter: (instance: ComponentInstance) => void,
  ): ComponentInstance => {
    const { index, parentIndex } = getSharedComponentIndex(key)!;

    const instance = isNumber(parentIndex)
      ? this.sharedComponentInstances[parentIndex!].children![index]
      : this.sharedComponentInstances[index];
    setter(instance);

    return instance;
  };

  @action.bound
  public deleteSharedComponentInstance = (key: number) => {
    let { sharedComponentInstances } = this;
    const { index, parentIndex } = deleteSharedComponentIndex(key, this.sharedComponentInstances);

    if (isNumber(parentIndex)) {
      sharedComponentInstances = sharedComponentInstances[parentIndex!].children!;
    }

    const [instance] = sharedComponentInstances.splice(index, 1);
    selectStore.selectPage(selectStore.pageIndex);
    eventStore.deleteDepsEventInstances(DepsTargetType.Component, key);
    componentEventDepsMap.deleteEventDepsMap(key);
    return instance;
  };

  public getCurrentSharedComponentInstance = (componentKey: number): ComponentInstance => {
    const { index, parentIndex } = getSharedComponentIndex(componentKey)!;

    if (isNumber(parentIndex)) {
      return this.sharedComponentInstances[parentIndex!].children![index];
    }

    return this.sharedComponentInstances[index];
  };
}

export const sharedStore = new SharedStore();
