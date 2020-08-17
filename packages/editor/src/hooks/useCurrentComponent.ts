import { materialsStore, selectStore, SelectType } from 'states';
import { ComponentInstance, MaterialsComponentMeta, Maybe } from 'types';
import { useComponentInstance } from './useComponent';

export function useCurrentComponentInstance(): Maybe<ComponentInstance> {
  const { selectType, componentKey } = selectStore;

  const instance = useComponentInstance(componentKey);

  return selectType === SelectType.COMPONENT ? instance : null;
}

export function useCurrentComponentMeta(): Maybe<MaterialsComponentMeta> {
  const instance = useCurrentComponentInstance();

  if (!instance) {
    return null;
  }

  return materialsStore.getComponentMeta(instance.component);
}
