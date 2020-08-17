import { useMemo } from 'react';
import { componentsStore, materialsStore } from 'states';
import { ComponentInstance, MaterialsComponentMeta, Maybe } from 'types';
import { getCurrentPageComponentIndex } from 'utils';

export function useComponentInstance(key: number): Maybe<ComponentInstance> {
  const { componentInstances } = componentsStore;

  const instanceIndex = useMemo(() => getCurrentPageComponentIndex(key), [key, componentInstances]);

  if (!instanceIndex) {
    return null;
  }

  const { index, parentIndex } = instanceIndex;

  return parentIndex ? componentInstances[parentIndex].children![index] : componentInstances[index];
}

export function useComponentMeta(key: number): Maybe<MaterialsComponentMeta> {
  const instance = useComponentInstance(key);

  if (!instance) {
    return null;
  }

  return materialsStore.getComponentMeta(instance.component);
}
