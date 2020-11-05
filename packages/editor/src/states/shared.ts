import { action, observable } from 'mobx';
import { StoreWithUtils } from './utils';
import { ComponentInstance } from '../types';
import { componentsStore } from './components';
import { getSharedComponentIndex, setSharedComponentIndex } from '../utils/indexMap';
import { isNumber } from '../utils';
import { selectStore } from './select';

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
}

export const sharedStore = new SharedStore();
