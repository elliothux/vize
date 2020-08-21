import { action } from 'mobx';
import { ActionInstance, EventTarget, EventTargetType, EventTriggerType } from '../types';
import { createActionInstance } from '../utils';
import { selectStore, SelectType } from './select';
import { componentsStore } from './components';
import { pluginsStore } from './plugins';
import { materialsStore } from './materials';

export class ActionStore {
  @action
  public addActionInstance = (trigger: EventTriggerType, target: EventTarget) => {
    const actions = target.type === EventTargetType.ACTION ? materialsStore.getActionMeta(target.id) : undefined;
    const instance = createActionInstance(trigger, target, actions);

    switch (selectStore.selectType) {
      case SelectType.COMPONENT: {
        return this.addActionsInstanceToCurrentComponentInstance(instance);
      }
      case SelectType.PLUGIN: {
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
}

export const actionStore = new ActionStore();
