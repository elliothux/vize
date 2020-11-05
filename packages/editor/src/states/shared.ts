import { action, observable } from 'mobx';
import { StoreWithUtils } from './utils';
import { ComponentInstance } from '../types';
import { componentsStore } from './components';
import { deleteSharedComponentIndex, getSharedComponentIndex, setSharedComponentIndex } from '../utils/indexMap';
import { componentEventDepsMap, DepsTargetType, isNumber } from '../utils';
import { selectStore } from './select';
import { eventStore } from './events';

export class SharedStore extends StoreWithUtils<SharedStore> {
  /**
   * @desc Shared Components
   * @struct ComponentInstance[]
   */
  @observable
  public sharedComponentInstances: ComponentInstance[] = [];

  @action
  public setComponentInstanceAsShared = (componentKey: number) => {
    const instance = componentsStore.deleteComponentInstance(componentKey);
    instance.shared = true;
    this.sharedComponentInstances.push(instance);

    componentEventDepsMap.createEventDepsMap(componentKey);
    setSharedComponentIndex(componentKey, { index: this.sharedComponentInstances.length - 1 });
    selectStore.selectComponent(true, componentKey);
  };

  @action
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

  @action
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
