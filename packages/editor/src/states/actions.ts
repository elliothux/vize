import * as R from 'ramda';
import { action } from 'mobx';
import {
  ActionInstance,
  ComponentUniversalEventTriggers,
  EventTarget,
  EventTargetType,
  EventTrigger,
  EventTriggerName,
  EventTriggerType,
  PluginUniversalEventTrigger,
} from '../types';
import { createActionInstance } from '../utils';
import { selectStore, SelectType } from './select';
import { componentsStore } from './components';
import { pluginsStore } from './plugins';
import { materialsStore } from './materials';

export class ActionStore {
  @action
  public addActionInstance = (triggerName: EventTriggerName, target: EventTarget) => {
    const actions = target.type === EventTargetType.ACTION ? materialsStore.getActionMeta(target.id) : undefined;

    switch (selectStore.selectType) {
      case SelectType.COMPONENT: {
        const trigger: EventTrigger = {
          type: R.values(ComponentUniversalEventTriggers).includes(triggerName as ComponentUniversalEventTriggers)
            ? EventTriggerType.ComponentUniversalTrigger
            : EventTriggerType.Custom,
          triggerName,
        };
        const instance = createActionInstance(trigger, target, actions);
        return this.addActionsInstanceToCurrentComponentInstance(instance);
      }

      case SelectType.PLUGIN: {
        const trigger: EventTrigger = {
          type: R.values(PluginUniversalEventTrigger).includes(triggerName as PluginUniversalEventTrigger)
            ? EventTriggerType.PluginUniversalTrigger
            : EventTriggerType.Custom,
          triggerName,
        };
        const instance = createActionInstance(trigger, target, actions);
        return this.addActionsInstanceToCurrentPluginInstance(instance);
      }
    }
  };

  @action
  private addActionsInstanceToCurrentComponentInstance = (instance: ActionInstance) => {
    return componentsStore.setCurrentComponentInstanceActions(actions => {
      actions.push(instance);
      return actions;
    });
  };

  @action
  private addActionsInstanceToCurrentPluginInstance = (instance: ActionInstance) => {
    return pluginsStore.setCurrentPluginInstanceActions(actions => {
      actions.push(instance);
      return actions;
    });
  };

  @action
  public deleteActionsInstance = (index: number) => {
    switch (selectStore.selectType) {
      case SelectType.COMPONENT: {
        return this.deleteActionsInstanceFromCurrentComponentInstance(index);
      }
      case SelectType.PLUGIN: {
        return this.deleteActionsInstanceFromCurrentPluginInstance(index);
      }
    }
  };

  @action
  private deleteActionsInstanceFromCurrentComponentInstance = (index: number) => {
    return componentsStore.setCurrentComponentInstanceActions(actions => {
      return actions.splice(index, 1);
    });
  };

  @action
  private deleteActionsInstanceFromCurrentPluginInstance = (index: number) => {
    return pluginsStore.setCurrentPluginInstanceActions(actions => {
      return actions.splice(index, 1);
    });
  };

  @action
  public setActionsInstanceDataOfCurrentComponentInstance = (data: object, index: number) => {
    return componentsStore.setCurrentComponentInstanceActions(actions => {
      actions[index]!.data = data;
      return actions;
    });
  };

  @action
  public setActionsInstanceDataOfCurrentPluginInstance = (data: object, index: number) => {
    return pluginsStore.setCurrentPluginInstanceActions(actions => {
      actions[index]!.data = data;
      return actions;
    });
  };
}

export const actionStore = new ActionStore();
