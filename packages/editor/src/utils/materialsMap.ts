import {
  MaterialsAction,
  MaterialsActionMeta,
  MaterialsComponent,
  MaterialsComponentMeta,
  MaterialsMain,
  MaterialsPlugin,
  MaterialsPluginMeta,
  Maybe,
} from '../types';
import { getMaterialsIdentityName } from './common';

// Component Materials

type ComponentID = MaterialsComponentMeta['identityName'];

export const materialsComponentsMap = new Map<ComponentID, MaterialsComponent>();

export function getMaterialsComponent(id: ComponentID): Maybe<MaterialsComponent> {
  return materialsComponentsMap.get(id);
}

// Plugin Materials

type PluginID = MaterialsPluginMeta['identityName'];

export const materialsPluginsMap = new Map<PluginID, MaterialsPlugin>();

export function getMaterialsPlugin(id: PluginID): Maybe<MaterialsPlugin> {
  return materialsPluginsMap.get(id);
}

// Action Materials

type ActionID = MaterialsActionMeta['identityName'];

export const materialsActionsMap = new Map<ActionID, MaterialsAction>();

export function getMaterialsAction(id: ActionID): Maybe<MaterialsAction> {
  return materialsActionsMap.get(id);
}

export function setMaterialsMap(libName: string, { components, plugins, actions }: MaterialsMain) {
  materialsComponentsMap.clear();
  Object.entries(components).map(([name, component]) => {
    const id = getMaterialsIdentityName(libName, name);
    materialsComponentsMap.set(id, component);
  });

  materialsPluginsMap.clear();
  Object.entries(plugins).map(([name, plugin]) => {
    const id = getMaterialsIdentityName(libName, name);
    materialsPluginsMap.set(id, plugin);
  });

  materialsActionsMap.clear();
  Object.entries(actions).map(([name, action]) => {
    const id = getMaterialsIdentityName(libName, name);
    materialsActionsMap.set(id, action);
  });
}
