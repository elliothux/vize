import * as R from "ramda";
import {
  getMaterialsFileInfo,
  loadUMDModule,
  MaterialsFileType
} from "./utils";
import {
  MaterialsActionMeta,
  MaterialsComponentMeta,
  MaterialsMeta,
  MaterialsPluginMeta
} from "../../types";

export async function loadMaterials(libName: string, debugPort?: number) {
  const [containerHTML, meta] = await Promise.all([
    loadContainerHTML(libName, debugPort),
    loadMeta(libName, debugPort)
  ]);

  debugger;
}

export function loadContainerHTML(libName: string, debugPort?: number) {
  const info = getMaterialsFileInfo(MaterialsFileType.HTML, libName, debugPort);
  return loadUMDModule<string>(info);
}

export async function loadMeta(libName: string, debugPort?: number) {
  const info = getMaterialsFileInfo(MaterialsFileType.Meta, libName, debugPort);
  const meta = await loadUMDModule<MaterialsMeta>(info);

  const handler = R.partial(handleMaterials, [libName]);
  R.mapObjIndexed(handler, meta.components);
  R.mapObjIndexed(handler, meta.plugins);
  R.mapObjIndexed(handler, meta.actions);

  return meta;
}

function handleMaterials(
  libName: string,
  item: MaterialsComponentMeta | MaterialsPluginMeta | MaterialsActionMeta
) {
  item.lib = libName;
  item.identityName = `${item.lib.toLowerCase()}_${item.name.toLowerCase()}`;
}
