import { useMemo } from 'react';
import { componentsStore, materialsStore, selectStore, SelectType } from 'states';
import { ComponentInstance, MaterialsComponentMeta, Maybe } from 'types';
import { getCurrentPageComponentIndex } from 'utils';

export function useCurrentComponent(): Maybe<ComponentInstance> {
  const { selectType, componentKey } = selectStore;
  const { componentInstances } = componentsStore;
  const isComponentSelected = selectType === SelectType.COMPONENT;

  const { index, parentIndex } = useMemo(() => {
    if (!isComponentSelected) {
      return { index: -1 };
    }
    return getCurrentPageComponentIndex(componentKey)!;
  }, [componentKey, componentInstances]);

  if (!isComponentSelected) {
    return null;
  }

  return parentIndex ? componentInstances[parentIndex].children![index] : componentInstances[index];
}

export function useCurrentComponentMeta(): Maybe<MaterialsComponentMeta> {
  const instance = useCurrentComponent();

  if (!instance) {
    return null;
  }

  return materialsStore.getComponentMeta(instance.component);
}
