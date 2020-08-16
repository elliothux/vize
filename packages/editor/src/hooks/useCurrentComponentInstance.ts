import { componentsStore, selectStore, SelectType } from '../states';
import { ComponentInstance, Maybe } from '../types';
import { useMemo } from 'react';
import { getCurrentPageComponentIndex } from '../utils/indexMap';

export function useCurrentComponentInstance(): Maybe<ComponentInstance> {
  const { selectType } = selectStore;
  const { componentInstances } = componentsStore;
  const { componentKey } = selectStore;
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
