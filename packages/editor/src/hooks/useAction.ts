import { materialsStore } from 'states';
import { MaterialsActionMeta, Maybe } from 'types';

export function useActionMetaById(id: string): Maybe<MaterialsActionMeta> {
  return materialsStore.getActionMeta(id);
}
