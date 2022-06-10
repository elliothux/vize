import { MaterialsActionMeta, Maybe } from '@vize/types';
import { getMaterialsActionMeta } from '@vize/runtime-web';

export function useActionMetaById(id: string): Maybe<MaterialsActionMeta> {
  return getMaterialsActionMeta(id);
}
