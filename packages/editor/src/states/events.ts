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
  HotArea,
  Maybe,
  PluginEventTarget,
  PluginInstance,
  PluginUniversalEventTrigger,
} from '../types';
import {
  componentEventDepsMap,
  createEventInstance,
  DepFrom,
  DepsFromType,
  DepsTargetType,
  pluginEventDepsMap,
} from '../utils';
import { selectStore, SelectType } from './select';
import { componentsStore } from './components';
import { pluginsStore } from './plugins';
import { materialsStore } from './materials';
import { hotAreaStore } from './hotAreas';

export class EventStore {
  @action
  public addEventInstance = (triggerName: EventTriggerName, target: EventTarget) => {
    const action = target.type === EventTargetType.ACTION ? materialsStore.getActionMeta(target.id) : undefined;

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
    }
  };

  @action
  private addEventInstanceToCurrentComponentInstance = (instance: EventInstance) => {
    return componentsStore.setCurrentComponentInstanceEvents(events => {
      events.push(instance);
    });
  };

  @action
  private addEventInstanceToCurrentPluginInstance = (instance: EventInstance) => {
    return pluginsStore.setCurrentPluginInstanceEvents(events => {
      events.push(instance);
    });
  };

  @action
  private addEventInstanceToCurrentHotArea = (instance: EventInstance) => {
    return hotAreaStore.setCurrentHotAreaEvents(events => {
      events.push(instance);
    });
  };

  private addEventDep = (target: EventTarget, depFrom: DepFrom) => {
    switch (target.type) {
      case EventTargetType.COMPONENT: {
        return componentEventDepsMap.addEventDep((target as ComponentEventTarget).key, depFrom);
      }
      case EventTargetType.PLUGIN: {
        return pluginEventDepsMap.addEventDep((target as PluginEventTarget).key, depFrom);
      }
      case EventTargetType.ACTION:
        // TODO
        break;
    }
  };

  @action
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
    }
    return this.deleteEventDep(eventInstance!);
  };

  @action
  private deleteEventInstanceFromCurrentComponentInstance = (index: number): EventInstance => {
    let eventInstance: Maybe<EventInstance>;
    componentsStore.setCurrentComponentInstanceEvents(events => {
      [eventInstance] = events.splice(index, 1);
    });
    return eventInstance!;
  };

  @action
  private deleteEventInstanceFromCurrentPluginInstance = (index: number): EventInstance => {
    let eventInstance: Maybe<EventInstance>;
    pluginsStore.setCurrentPluginInstanceEvents(events => {
      [eventInstance] = events.splice(index, 1);
    });
    return eventInstance!;
  };

  @action
  private deleteEventInstanceFromCurrentHotArea = (index: number): EventInstance => {
    let eventInstance: Maybe<EventInstance>;
    hotAreaStore.setCurrentHotAreaEvents(events => {
      [eventInstance] = events.splice(index, 1);
    });
    return eventInstance!;
  };

  @action
  private deleteEventDep = ({ target, key: eventInstanceKey }: EventInstance) => {
    switch (target.type) {
      case EventTargetType.COMPONENT: {
        return componentEventDepsMap.deleteEventDep(
          (target as ComponentEventTarget).key,
          DepsFromType.Component,
          eventInstanceKey,
        );
      }
      case EventTargetType.PLUGIN: {
        return pluginEventDepsMap.deleteEventDep(
          (target as PluginEventTarget).key,
          DepsFromType.Plugin,
          eventInstanceKey,
        );
      }
    }
  };

  @action
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

    return deps!.forEach(({ depsFromType, parentKey, eventKey, index }) => {
      const deleteEvent = (instance: ComponentInstance | PluginInstance | HotArea) => {
        const index = instance.events.findIndex(i => i.key === eventKey);
        instance.events.splice(index, 1);
      };

      switch (depsFromType) {
        case DepsFromType.Component: {
          componentsStore.setComponentInstancePropsByKey(parentKey, deleteEvent);
          break;
        }
        case DepsFromType.Plugin: {
          pluginsStore.setPluginInstancePropsByKey(parentKey, deleteEvent);
          break;
        }
        case DepsFromType.HotArea: {
          hotAreaStore.setHotAreaProps(parentKey, index!, deleteEvent);
          break;
        }
      }
    });
  };

  @action
  public setEventInstanceDataOfCurrentComponentInstance = (data: object, index: number) => {
    return componentsStore.setCurrentComponentInstanceEvents(events => {
      events[index]!.data = data;
    });
  };

  @action
  public setEventInstanceDataOfCurrentPluginInstance = (data: object, index: number) => {
    return pluginsStore.setCurrentPluginInstanceEvents(events => {
      events[index]!.data = data;
    });
  };

  @action
  public setEventInstanceDataOfCurrentHotArea = (data: object, index: number) => {
    return hotAreaStore.setCurrentHotAreaEvents(events => {
      events[index]!.data = data;
    });
  };

  @action
  public resortEventInstanceFromCurrentComponentInstance = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }

    return componentsStore.setCurrentComponentInstanceEvents(events => {
      const [instance] = events.splice(oldIndex, 1);
      events.splice(newIndex, 0, instance);
    });
  };

  @action
  public resortEventInstanceFromCurrentPluginInstance = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }

    return pluginsStore.setCurrentPluginInstanceEvents(events => {
      const [instance] = events.splice(oldIndex, 1);
      events.splice(newIndex, 0, instance);
    });
  };

  @action
  public resortEventInstanceFromCurrentHotArea = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }

    return hotAreaStore.setCurrentHotAreaEvents(events => {
      const [instance] = events.splice(oldIndex, 1);
      events.splice(newIndex, 0, instance);
    });
  };
}

export const eventStore = new EventStore();
