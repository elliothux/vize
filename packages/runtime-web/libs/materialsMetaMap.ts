import { MaterialsActionMeta, MaterialsComponentMeta, MaterialsMeta, MaterialsPluginMeta, Maybe } from '../types';
import { getMaterialsIdentityName } from '../utils';

// Component Materials Meta

type ComponentID = MaterialsComponentMeta['identityName'];

export const materialsComponentMetaMap = new Map<ComponentID, MaterialsComponentMeta>();

export function getMaterialsComponentMeta(id: ComponentID): Maybe<MaterialsComponentMeta> {
  return materialsComponentMetaMap.get(id);
}

// Plugin Materials Meta

type PluginID = MaterialsPluginMeta['identityName'];

export const materialsPluginMetaMap = new Map<PluginID, MaterialsPluginMeta>();

export function getMaterialsPluginMeta(id: PluginID): Maybe<MaterialsPluginMeta> {
  return materialsPluginMetaMap.get(id);
}

// Action Materials Meta

type ActionID = MaterialsActionMeta['identityName'];

export const materialsActionMetaMap = new Map<ActionID, MaterialsActionMeta>();

export function getMaterialsActionMeta(id: ActionID): Maybe<MaterialsActionMeta> {
  return materialsActionMetaMap.get(id);
}

export function setMaterialsMetaMap(libName: string, { components, plugins, actions }: MaterialsMeta) {
  materialsComponentMetaMap.clear();
  Object.entries(components).map(([, component]) => {
    const id = getMaterialsIdentityName(libName, component.name);
    materialsComponentMetaMap.set(id, component);
  });

  materialsPluginMetaMap.clear();
  Object.entries(plugins).map(([, plugin]) => {
    const id = getMaterialsIdentityName(libName, plugin.name);
    materialsPluginMetaMap.set(id, plugin);
  });

  materialsActionMetaMap.clear();
  Object.entries(actions).map(([, action]) => {
    const id = getMaterialsIdentityName(libName, action.name);
    materialsActionMetaMap.set(id, action);
  });
}
