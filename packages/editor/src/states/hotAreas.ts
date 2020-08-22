import { action } from 'mobx';
import { HotArea } from 'types';
import { componentsStore } from './components';

export class HotAreasStore {
  @action
  public setHotAreas = (hotAreas: HotArea[]) => {
    return componentsStore.setCurrentComponentInstanceHotAreas(() => hotAreas);
  };
}

export const hotAreasStore = new HotAreasStore();
