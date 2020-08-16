import { MaterialsComponentMeta, MaterialsPluginMeta } from 'types';
import * as R from 'ramda';

export type MaterialsTagsList<T> = { tag: string; items: T[] }[];

export function generateTagsMap<T extends MaterialsComponentMeta & MaterialsPluginMeta>(
  items: T[],
): MaterialsTagsList<T> {
  const result: MaterialsTagsList<T> = [{ tag: 'All', items }];

  R.mapObjIndexed(
    (items, tag) => result.push({ tag, items }),
    items.reduce<{ [name: string]: T[] }>((accu, item) => {
      const { lib } = item;
      if (accu[lib]) {
        accu[lib].push(item);
      } else {
        accu[lib] = [item];
      }
      return accu;
    }, {}),
  );

  return result;
}
