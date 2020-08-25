/* eslint-disable max-lines */
import * as R from 'ramda';
import { action } from 'mobx';
import {
  ComponentEventTarget,
  ComponentInstance,
  ComponentUniversalEventTriggers,
  EventInstance,
  EventTarget,
  EventTargetType,
  EventTrigger,
  EventTriggerName,
  EventTriggerType,
  Maybe,
  PluginEventTarget,
  PluginInstance,
  PluginUniversalEventTrigger,
} from '../types';
import { componentEventDepsMap, createEventInstance, DepFrom, DepsType, pluginEventDepsMap } from '../utils';
import { selectStore, SelectType } from './select';
import { componentsStore } from './components';
import { pluginsStore } from './plugins';
import { materialsStore } from './materials';

export class EventStore {
  @action
  public addEventInstance = (triggerName: EventTriggerName, target: EventTarget) => {
    const action = target.type === EventTargetType.ACTION ? materialsStore.getActionMeta(target.id) : undefined;

    switch (selectStore.selectType) {
      case SelectType.COMPONENT: {
        const trigger: EventTrigger = {
          type: R.values(ComponentUniversalEventTriggers).includes(triggerName as ComponentUniversalEventTriggers)
            ? EventTriggerType.ComponentUniversalTrigger
            : EventTriggerType.Custom,
          triggerName,
        };
        const instance = createEventInstance(trigger, target, action);
        this.addEventDep(instance.target, [DepsType.Component, selectStore.componentKey, instance.key]);
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
        this.addEventDep(instance.target, [DepsType.Plugin, selectStore.pluginKey, instance.key]);
        return this.addEventInstanceToCurrentPluginInstance(instance);
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

  private addEventDep = (target: EventTarget, depFrom: DepFrom) => {
    switch (target.type) {
      case EventTargetType.COMPONENT: {
        return componentEventDepsMap.addEventDep((target as ComponentEventTarget).key, depFrom);
      }
      case EventTargetType.PLUGIN:
        return pluginEventDepsMap.addEventDep((target as PluginEventTarget).key, depFrom);
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
  private deleteEventDep = ({ target: { type }, key: eventInstanceKey }: EventInstance) => {
    switch (type) {
      case EventTargetType.COMPONENT: {
        const { key } = componentsStore.getCurrentComponentInstance()!;
        return componentEventDepsMap.deleteEventDep(key, DepsType.Component, eventInstanceKey);
      }
      case EventTargetType.PLUGIN: {
        const { key } = pluginsStore.getCurrentPluginInstance()!;
        return componentEventDepsMap.deleteEventDep(key, DepsType.Plugin, eventInstanceKey);
      }
    }
  };

  @action
  public deleteDepsEventInstances = (type: DepsType, key: number) => {
    let deps: Maybe<DepFrom[]>;
    switch (type) {
      case DepsType.Component:
        deps = componentEventDepsMap.getEventDep(key);
        break;
      case DepsType.Plugin:
        deps = pluginEventDepsMap.getEventDep(key);
        break;
    }

    return deps!.map(([type, parentKey, eventKey]) => {
      const deleteEvent = (instance: ComponentInstance | PluginInstance) => {
        const index = instance.events.findIndex(i => i.key === eventKey);
        instance.events.splice(index, 1);
      };

      switch (type) {
        case DepsType.Component: {
          componentsStore.setComponentInstancePropsByKey(parentKey, deleteEvent);
          break;
        }
        case DepsType.Plugin: {
          pluginsStore.setPluginInstancePropsByKey(parentKey, deleteEvent);
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
}

export const eventStore = new EventStore();
