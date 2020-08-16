import { materialsStore } from '../states';
import { MaterialsComponentMeta, Maybe } from '../types';
import { useCurrentComponentInstance } from './useCurrentComponentInstance';

export function useCurrentComponentMeta(): Maybe<MaterialsComponentMeta> {
  const instance = useCurrentComponentInstance();

  if (!instance) {
    return null;
  }

  return materialsStore.getComponentMeta(instance.component);
}
