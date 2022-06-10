/* eslint-disable max-lines */
import * as R from 'ramda';
import { action } from 'mobx';
import {
  ComponentEventTarget,
  ComponentInstance,
  ComponentUniversalEventTrigger,
  EventInstance,
  EventTarget,
  EventTargetType,
  EventTrigger,
  EventTriggerName,
  EventTriggerType,
  GlobalUniversalEventTrigger,
  HotArea,
  Maybe,
  PageUniversalEventTrigger,
  PluginEventTarget,
  PluginInstance,
  PluginUniversalEventTrigger,
} from '@vize/types';
import {
  DepFrom,
  DepsFromType,
  DepsTargetType,
  componentEventDepsMap,
  pluginEventDepsMap,
  createEventInstance,
  regenerateAllEventDeps,
} from 'libs';
import { timeTraveler, actionWithSnapshot } from 'mobx-time-traveler';
import { getMaterialsActionMeta } from '@vize/runtime-web';
import { selectStore, SelectType } from './select';
import { componentsStore } from './components';
import { pluginsStore } from './plugins';
import { hotAreaStore } from './hotAreas';
import { globalStore } from './global';
import { pagesStore } from './pages';

export class EventStore {
  constructor() {
    timeTraveler.onRestore((type, nextSnapshots, currentSnapshots) => {
      if (nextSnapshots?.payload?.needReloadDeps || currentSnapshots?.payload?.needReloadDeps) {
        regenerateAllEventDeps();
      }
    });
  }

  @actionWithSnapshot({ needReloadDeps: true })
  public addEventInstance = (triggerName: EventTriggerName, target: EventTarget) => {
    const action = target.type === EventTargetType.Action ? getMaterialsActionMeta(target.id)! : undefined;

    switch (selectStore.selectType) {
      case SelectType.COMPONENT: {
        const trigger: EventTrigger = {
          type: R.values(ComponentUniversalEventTrigger).includes(triggerName as ComponentUniversalEventTrigger)
            ? EventTriggerType.ComponentUniversalTrigger
            : EventTriggerType.Custom,
          triggerName,
        };
        const instance = createEventInstance(trigger, target, action);
        this.addEventDep(instance.target, {
          depsFromType: DepsFromType.Component,
          parentKey: selectStore.componentKey,
          eventKey: instance.key,
        });
        return this.addEventInstanceToCurrentComponentInstance(instance);
      }

      case SelectType.PLUGIN: {
        const trigger: EventTrigger = {
          type: R.values(PluginUniversalEventTrigger).includes(triggerName as PluginUniversalEventTrigger)
            ? EventTriggerType.PluginUniversalTrigger
            : EventTriggerType.Custom,
          triggerName,
        };
        const instance = createEventInstance(trigger, target, action);
        this.addEventDep(instance.target, {
          depsFromType: DepsFromType.Plugin,
          parentKey: selectStore.pluginKey,
          eventKey: instance.key,
        });
        return this.addEventInstanceToCurrentPluginInstance(instance);
      }

      case SelectType.HOTAREA: {
        const trigger: EventTrigger = {
          type: EventTriggerType.HotAreaUniversalTrigger,
          triggerName,
        };
        const instance = createEventInstance(trigger, target, action);
        this.addEventDep(instance.target, {
          depsFromType: DepsFromType.HotArea,
          parentKey: selectStore.componentKey,
          index: selectStore.hotAreaIndex,
          eventKey: instance.key,
        });
        return this.addEventInstanceToCurrentHotArea(instance);
      }

      case SelectType.GLOBAL: {
        const trigger: EventTrigger = {
          type: R.values(GlobalUniversalEventTrigger).includes(triggerName as GlobalUniversalEventTrigger)
            ? EventTriggerType.GlobalUniversalTrigger
            : EventTriggerType.Custom,
          triggerName,
        };
        const instance = createEventInstance(trigger, target, action);
        this.addEventDep(instance.target, {
          depsFromType: DepsFromType.Global,
          eventKey: instance.key,
        });
        return this.addEventInstanceToGlobal(instance);
      }

      case SelectType.PAGE: {
        const trigger: EventTrigger = {
          type: R.values(PageUniversalEventTrigger).includes(triggerName as PageUniversalEventTrigger)
            ? EventTriggerType.PageUniversalTrigger
            : EventTriggerType.Custom,
          triggerName,
        };
        const instance = createEventInstance(trigger, target, action);
        this.addEventDep(instance.target, {
          depsFromType: DepsFromType.Page,
          eventKey: instance.key,
        });
        return this.addEventInstanceToCurrentPage(instance);
      }
    }
  };

  @action.bound
  private addEventInstanceToCurrentComponentInstance = (instance: EventInstance) => {
    return componentsStore.setCurrentComponentInstanceEvents(events => {
      events.push(instance);
    });
  };

  @action.bound
  private addEventInstanceToCurrentPluginInstance = (instance: EventInstance) => {
    return pluginsStore.setCurrentPluginInstanceEvents(events => {
      events.push(instance);
    });
  };

  @action.bound
  private addEventInstanceToCurrentHotArea = (instance: EventInstance) => {
    return hotAreaStore.setCurrentHotAreaEvents(events => {
      events.push(instance);
    });
  };

  @action.bound
  private addEventInstanceToCurrentPage = (instance: EventInstance) => {
    return pagesStore.setCurrentPage(page => {
      page.events.push(instance);
    });
  };

  @action.bound
  private addEventInstanceToGlobal = (instance: EventInstance) => {
    return globalStore.setGlobalEvents(events => {
      events.push(instance);
    });
  };

  private addEventDep = (target: EventTarget, depFrom: DepFrom) => {
    switch (target.type) {
      case EventTargetType.Component: {
        return componentEventDepsMap.addEventDep((target as ComponentEventTarget).key, depFrom);
      }
      case EventTargetType.Plugin: {
        return pluginEventDepsMap.addEventDep((target as PluginEventTarget).key, depFrom);
      }
      /**
       * @desc
       * Only components and plugins can deleted and registry onEvents
       * So others event targets do not need save depsMap
       */
      default:
        return;
    }
  };

  @actionWithSnapshot({ needReloadDeps: true })
  public deleteEventInstance = (index: number) => {
    let eventInstance: EventInstance;
    switch (selectStore.selectType) {
      case SelectType.COMPONENT: {
        eventInstance = this.deleteEventInstanceFromCurrentComponentInstance(index);
        break;
      }
      case SelectType.PLUGIN: {
        eventInstance = this.deleteEventInstanceFromCurrentPluginInstance(index);
        break;
      }
      case SelectType.HOTAREA: {
        eventInstance = this.deleteEventInstanceFromCurrentHotArea(index);
        break;
      }
      case SelectType.GLOBAL: {
        eventInstance = this.deleteEventInstanceFromGlobal(index);
        break;
      }
      case SelectType.PAGE: {
        eventInstance = this.deleteEventInstanceFromCurrentPage(index);
        break;
      }
    }
    return this.deleteEventDep(eventInstance!);
  };

  @action.bound
  private deleteEventInstanceFromCurrentComponentInstance = (index: number): EventInstance => {
    let eventInstance: Maybe<EventInstance>;
    componentsStore.setCurrentComponentInstanceEvents(events => {
      [eventInstance] = events.splice(index, 1);
    });
    return eventInstance!;
  };

  @action.bound
  private deleteEventInstanceFromCurrentPluginInstance = (index: number): EventInstance => {
    let eventInstance: Maybe<EventInstance>;
    pluginsStore.setCurrentPluginInstanceEvents(events => {
      [eventInstance] = events.splice(index, 1);
    });
    return eventInstance!;
  };

  @action.bound
  private deleteEventInstanceFromCurrentHotArea = (index: number): EventInstance => {
    let eventInstance: Maybe<EventInstance>;
    hotAreaStore.setCurrentHotAreaEvents(events => {
      [eventInstance] = events.splice(index, 1);
    });
    return eventInstance!;
  };

  @action.bound
  private deleteEventInstanceFromCurrentPage = (index: number): EventInstance => {
    let eventInstance: Maybe<EventInstance>;
    pagesStore.setCurrentPage(({ events }) => {
      [eventInstance] = events.splice(index, 1);
    });
    return eventInstance!;
  };

  @action.bound
  private deleteEventInstanceFromGlobal = (index: number): EventInstance => {
    let eventInstance: Maybe<EventInstance>;
    globalStore.setGlobalEvents(events => {
      [eventInstance] = events.splice(index, 1);
    });
    return eventInstance!;
  };

  @action.bound
  private deleteEventDep = ({ target, key: eventInstanceKey }: EventInstance) => {
    switch (target.type) {
      case EventTargetType.Component: {
        return componentEventDepsMap.deleteEventDep(
          (target as ComponentEventTarget).key,
          DepsFromType.Component,
          eventInstanceKey,
        );
      }
      case EventTargetType.Plugin: {
        return pluginEventDepsMap.deleteEventDep(
          (target as PluginEventTarget).key,
          DepsFromType.Plugin,
          eventInstanceKey,
        );
      }
    }
  };

  @actionWithSnapshot({ needReloadDeps: true })
  public deleteDepsEventInstances = (type: DepsTargetType, key: number) => {
    let deps: Maybe<DepFrom[]>;
    switch (type) {
      case DepsTargetType.Component:
        deps = componentEventDepsMap.getEventDep(key);
        break;
      case DepsTargetType.Plugin:
        deps = pluginEventDepsMap.getEventDep(key);
        break;
    }

    return deps?.forEach(({ depsFromType, parentKey, eventKey, index }) => {
      const deleteEventItem = (events: EventInstance[]) => {
        const index = events.findIndex(i => i.key === eventKey);
        events.splice(index, 1);
      };

      const deleteEvent = (instance: ComponentInstance | PluginInstance | HotArea) => deleteEventItem(instance.events);

      switch (depsFromType) {
        case DepsFromType.Component: {
          componentsStore.setComponentInstancePropsByKey(parentKey!, deleteEvent);
          break;
        }
        case DepsFromType.Plugin: {
          pluginsStore.setPluginInstancePropsByKey(parentKey!, deleteEvent);
          break;
        }
        case DepsFromType.HotArea: {
          hotAreaStore.setHotAreaProps(parentKey!, index!, deleteEvent);
          break;
        }
        case DepsFromType.Page: {
          pagesStore.setCurrentPage(page => {
            deleteEventItem(page.events);
          });
          break;
        }
        case DepsFromType.Global: {
          globalStore.setGlobalEvents(deleteEventItem);
          break;
        }
      }
    });
  };

  @actionWithSnapshot
  public setEventInstanceDataOfCurrentComponentInstance = (data: object, index: number) => {
    return componentsStore.setCurrentComponentInstanceEvents(events => {
      events[index]!.data = data;
    });
  };

  @actionWithSnapshot
  public setEventInstanceDataOfCurrentPluginInstance = (data: object, index: number) => {
    return pluginsStore.setCurrentPluginInstanceEvents(events => {
      events[index]!.data = data;
    });
  };

  @actionWithSnapshot
  public setEventInstanceDataOfCurrentHotArea = (data: object, index: number) => {
    return hotAreaStore.setCurrentHotAreaEvents(events => {
      events[index]!.data = data;
    });
  };

  @actionWithSnapshot
  public setEventInstanceDataOfGlobal = (data: object, index: number) => {
    return globalStore.setGlobalEvents(events => {
      events[index]!.data = data;
    });
  };

  @actionWithSnapshot
  public setEventInstanceDataOfCurrentPage = (data: object, index: number) => {
    return pagesStore.setCurrentPage(page => {
      page.events[index]!.data = data;
    });
  };

  @actionWithSnapshot
  public resortEventInstanceFromCurrentComponentInstance = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }

    return componentsStore.setCurrentComponentInstanceEvents(events => {
      const [instance] = events.splice(oldIndex, 1);
      events.splice(newIndex, 0, instance);
    });
  };

  @actionWithSnapshot
  public resortEventInstanceFromCurrentPluginInstance = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }

    return pluginsStore.setCurrentPluginInstanceEvents(events => {
      const [instance] = events.splice(oldIndex, 1);
      events.splice(newIndex, 0, instance);
    });
  };

  @actionWithSnapshot
  public resortEventInstanceFromCurrentHotArea = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }

    return hotAreaStore.setCurrentHotAreaEvents(events => {
      const [instance] = events.splice(oldIndex, 1);
      events.splice(newIndex, 0, instance);
    });
  };

  @actionWithSnapshot
  public resortEventInstanceFromGlobal = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }

    return globalStore.setGlobalEvents(events => {
      const [instance] = events.splice(oldIndex, 1);
      events.splice(newIndex, 0, instance);
    });
  };
}

export const eventStore = new EventStore();
