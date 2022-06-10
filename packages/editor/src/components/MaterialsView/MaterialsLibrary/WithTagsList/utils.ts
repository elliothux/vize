import * as R from 'ramda';
import { getMaterialsLibInfo } from '@vize/runtime-web';
import { MaterialsComponentMeta, MaterialsPluginMeta } from '@vize/types';
import { i18n } from '@vize/i18n';

export type MaterialsTagsList<T> = { tag: string; items: T[] }[];

export function generateTagsMap<T extends MaterialsComponentMeta & MaterialsPluginMeta>(
  items: T[],
): MaterialsTagsList<T> {
  const result: MaterialsTagsList<T> = [{ tag: i18n.t('All'), items }];

  R.mapObjIndexed(
    (items, tag) => {
      const { displayName, libName } = getMaterialsLibInfo(tag)!;
      result.push({ tag: displayName || libName, items });
    },
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
