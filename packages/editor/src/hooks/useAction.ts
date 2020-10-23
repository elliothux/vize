import { MaterialsActionMeta, Maybe } from 'types';
import { getMaterialsActionMeta } from 'runtime';

export function useActionMetaById(id: string): Maybe<MaterialsActionMeta> {
  return getMaterialsActionMeta(id);
}
