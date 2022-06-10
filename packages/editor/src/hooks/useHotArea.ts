import { selectStore } from 'states';
import { HotArea, Maybe } from '@vize/types';
import { useCurrentComponentInstance } from './useComponent';

export function useCurrentHotArea(): Maybe<HotArea> {
  const component = useCurrentComponentInstance();

  if (!component) {
    return null;
  }

  const { hotAreaIndex } = selectStore;
  if (hotAreaIndex < 0) {
    return null;
  }

  return component.hotAreas?.[hotAreaIndex];
}
