import { action } from 'mobx';
import { ComponentInstance, HotArea, Maybe } from 'types';

export class HotAreasStore {
  @action
  public setHotAreas = (hotAreas: HotArea[], instance: Maybe<ComponentInstance>) => {
    if (!instance) {
      return;
    }
    instance.hotAreas = hotAreas;
  };
}

export const hotAreasStore = new HotAreasStore();
