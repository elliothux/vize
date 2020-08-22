import * as R from 'ramda';
import { action } from 'mobx';
import {
  EventInstance,
  ComponentUniversalEventTriggers,
  EventTarget,
  EventTargetType,
  EventTrigger,
  EventTriggerName,
  EventTriggerType,
  PluginUniversalEventTrigger,
} from '../types';
import { createEventInstance } from '../utils';
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
        return this.addEventInstanceToCurrentPluginInstance(instance);
      }
    }
  };

  @action
  private addEventInstanceToCurrentComponentInstance = (instance: EventInstance) => {
    return componentsStore.setCurrentComponentInstanceEvents(events => {
      events.push(instance);
      return events;
    });
  };

  @action
  private addEventInstanceToCurrentPluginInstance = (instance: EventInstance) => {
    return pluginsStore.setCurrentPluginInstanceEvents(events => {
      events.push(instance);
      return events;
    });
  };

  @action
  public deleteEventInstance = (index: number) => {
    switch (selectStore.selectType) {
      case SelectType.COMPONENT: {
        return this.deleteEventInstanceFromCurrentComponentInstance(index);
      }
      case SelectType.PLUGIN: {
        return this.deleteEventInstanceFromCurrentPluginInstance(index);
      }
    }
  };

  @action
  private deleteEventInstanceFromCurrentComponentInstance = (index: number) => {
    return componentsStore.setCurrentComponentInstanceEvents(events => {
      return events.splice(index, 1);
    });
  };

  @action
  private deleteEventInstanceFromCurrentPluginInstance = (index: number) => {
    return pluginsStore.setCurrentPluginInstanceEvents(events => {
      return events.splice(index, 1);
    });
  };

  @action
  public setEventInstanceDataOfCurrentComponentInstance = (data: object, index: number) => {
    return componentsStore.setCurrentComponentInstanceEvents(events => {
      events[index]!.data = data;
      return events;
    });
  };

  @action
  public setEventInstanceDataOfCurrentPluginInstance = (data: object, index: number) => {
    return pluginsStore.setCurrentPluginInstanceEvents(events => {
      events[index]!.data = data;
      return events;
    });
  };
}

export const eventStore = new EventStore();
