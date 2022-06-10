import { MaterialsContainerMeta, Maybe } from '@vize/types';

let containerMeta: Maybe<MaterialsContainerMeta> = null;

export function setMaterialsContainerMeta(meta: MaterialsContainerMeta) {
  containerMeta = meta;
}

export function getMaterialsContainerMeta() {
  return containerMeta;
}
