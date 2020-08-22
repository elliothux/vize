import { componentsStore, materialsStore, selectStore, SelectType } from 'states';
import { ComponentInstance, MaterialsComponentMeta, Maybe } from 'types';
import { useMemo } from 'react';
import { getCurrentPageComponentIndex } from '../utils';

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

export function useCurrentComponentInstance(): Maybe<ComponentInstance> {
  const { selectType, componentKey } = selectStore;

  const instance = useComponentInstance(componentKey);

  return selectType === SelectType.COMPONENT ? instance : null;
}

export function useCurrentComponentMeta(): Maybe<MaterialsComponentMeta> {
  const instance = useCurrentComponentInstance();
  return useComponentMeta(instance?.key || -1);
}

export function useCurrentContainerComponentInstance(): Maybe<ComponentInstance> {
  const { selectType, containerComponentKey } = selectStore;

  const instance = useComponentInstance(containerComponentKey);

  return selectType === SelectType.COMPONENT ? instance : null;
}

export function useCurrentContainerComponentMeta(): Maybe<MaterialsComponentMeta> {
  const instance = useCurrentContainerComponentInstance();
  return useComponentMeta(instance?.key || -1);
}
