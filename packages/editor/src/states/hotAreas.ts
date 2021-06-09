import { EventInstance, HotArea, Maybe } from 'types';
import { actionWithSnapshot } from 'mobx-time-traveler';
import { componentsStore } from './components';
import { selectStore } from './select';

export class HotAreasStore {
  public getCurrentHotArea = (): Maybe<HotArea> => {
    const component = componentsStore.getCurrentComponentInstance();
    if (!component) {
      return null;
    }

    const { hotAreaIndex } = selectStore;
    if (hotAreaIndex < 0) {
      return null;
    }
    return component.hotAreas?.[hotAreaIndex];
  };

  @actionWithSnapshot
  public setCurrentComponentHotAreas = (hotAreas: HotArea[]) => {
    return componentsStore.setCurrentComponentInstanceHotAreas(() => hotAreas);
  };

  @actionWithSnapshot
  public setCurrentComponentHotArea = (setter: (hotArea: HotArea) => HotArea) => {
    const { hotAreaIndex } = selectStore;
    return componentsStore.setCurrentComponentInstanceHotAreas(hotAreas => {
      const hotArea = hotAreas[hotAreaIndex];
      hotAreas[hotAreaIndex] = setter(hotArea);
      return hotAreas;
    });
  };

  @actionWithSnapshot({ needReloadDeps: true })
  public setCurrentHotAreaEvents = (setter: (eventInstances: EventInstance[]) => EventInstance[] | void) => {
    return this.setCurrentComponentHotArea(hotarea => {
      const events = setter(hotarea.events);
      if (events) {
        hotarea.events = events;
      }
      return hotarea;
    });
  };

  @actionWithSnapshot
  public setHotAreaProps = (
    componentKey: number,
    hotAreaIndex: number,
    setter: (hotArea: HotArea) => HotArea | void,
  ) => {
    return componentsStore.setComponentInstancePropsByKey(componentKey, instance => {
      const hotArea = setter(instance.hotAreas![hotAreaIndex]);
      if (hotArea) {
        instance.hotAreas![hotAreaIndex] = hotArea;
      }
      return instance;
    });
  };

  @actionWithSnapshot({ needReloadDeps: true })
  public deleteHotArea = (componentKey: number, hotAreaIndex: number) => {
    return componentsStore.setComponentInstancePropsByKey(componentKey, ({ hotAreas }) => {
      hotAreas!.splice(hotAreaIndex, 1);
    });
  };
}

export const hotAreaStore = new HotAreasStore();
