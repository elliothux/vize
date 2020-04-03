import template from 'lodash.template';
import {
  EditorAction,
  EditorComponent,
  EditorMaterialAction,
  EditorMaterialActionHooks,
  EditorMaterialActionWithHooks,
  EditorMaterialComponent,
  EditorMaterialPlugin,
  EditorPlugin,
  JimuEditorComponent,
  MaterialsMain,
  Maybe,
  ReactEditorComponent,
} from 'types';
import { state } from '../store';
import { emitComponentEvent, isEmitComponentEventActionId } from './emitComponentEvent';

type ID = number;

export const materialsComponentMap = new Map<ID, EditorMaterialComponent>();
export function getMaterialsComponent(id: ID): Maybe<EditorMaterialComponent> {
  return materialsComponentMap.get(id);
}

export const materialsPluginMap = new Map<ID, EditorMaterialPlugin>();
export function getMaterialsPlugin(id: ID): Maybe<EditorMaterialPlugin> {
  return materialsPluginMap.get(id);
}

export const materialsActionMap = new Map<ID, EditorMaterialAction>();
export function getMaterialsAction(id: ID): Maybe<EditorMaterialAction> {
  if (isEmitComponentEventActionId(id)) {
    return emitComponentEvent;
  }
  return materialsActionMap.get(id);
}

export const materialsActionHooksMap = new Map<ID, EditorMaterialActionHooks>();
export function getMaterialsActionHooks(id: ID): Maybe<EditorMaterialActionHooks> {
  return materialsActionHooksMap.get(id);
}

export function setMaterialsMap(maps: { [proj: string]: MaterialsMain }) {
  const { materials } = state.getState();
  materialsComponentMap.clear();
  materialsPluginMap.clear();
  materialsActionMap.clear();
  materialsActionHooksMap.clear();

  Object.entries(maps).forEach(([proj, { components, plugins, actions }]) => {
    Object.entries(components).forEach(([name, component]) => {
      if (!component) {
        return;
      }

      const componentMeta = materials.components.find(
        i => i.projKey === proj && i.name === name
      ) as EditorComponent;
      materialsComponentMap.set(componentMeta.id, handleComponent(componentMeta, component));
    });

    Object.entries(plugins).forEach(([name, plugin]) => {
      if (!plugin) {
        return;
      }

      const { id } = materials.plugins.find(
        i => i.projKey === proj && i.name === name
      ) as EditorPlugin;
      materialsPluginMap.set(id, plugin);
    });

    Object.entries(actions).forEach(([name, iAction]) => {
      if (!iAction) {
        return;
      }

      const { id } = materials.actions.find(
        i => i.projKey === proj && i.name === name
      ) as EditorAction;

      if (typeof iAction === 'function') {
        materialsActionMap.set(id, iAction);
        return;
      }

      const { action, ...hooks } = iAction as EditorMaterialActionWithHooks;
      materialsActionMap.set(id, action);
      materialsActionHooksMap.set(id, hooks);
    });
  });
}

function handleComponent(
  componentMeta: EditorComponent,
  component: EditorMaterialComponent
): EditorMaterialComponent {
  if (componentMeta.runtime === 'jimu') {
    const { template: t, component: c } = component as JimuEditorComponent;
    return {
      component: c,
      template: template(`${t}`),
    } as JimuEditorComponent;
  }

  if (componentMeta.runtime === 'vue') {
    return component;
  }

  return component as ReactEditorComponent;
  // return React.memo(component as ReactEditorComponent);
}

// TODO: Remove
Object.defineProperty(window, '__materialsComponentMap', { value: materialsComponentMap });
Object.defineProperty(window, '__materialsPluginMap', { value: materialsPluginMap });
Object.defineProperty(window, '__materialsActionMap', { value: materialsActionMap });
Object.defineProperty(window, '__materialsActionHooksMap', { value: materialsActionHooksMap });
