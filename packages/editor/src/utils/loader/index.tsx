import * as R from "ramda";
import {
  getMaterialsFileInfo,
  loadFileAsString,
  loadStyle,
  loadUMDModule,
  MaterialsFileType,
  StringMaterialsFile
} from "./utils";
import {
  MaterialsActionMeta,
  MaterialsComponentMeta,
  MaterialsMeta,
  MaterialsPluginMeta
} from "../../types";
import { promiseWrapper } from "../common";

export async function loadMaterials(libName: string, debugPort?: number) {
  const [containerHTML, meta, main, entry] = await Promise.all([
    loadContainerHTML(libName, debugPort),
    loadMeta(libName, debugPort),
    loadMain(libName, debugPort),
    loadEntry(libName, debugPort)
  ]);

  return {
    containerHTML,
    meta,
    main,
    entry
  };
}

export function loadMain(
  libName: string,
  debugPort?: number
): Promise<StringMaterialsFile> {
  return loadFileAsString(MaterialsFileType.Main, libName, debugPort);
}

export function loadEntry(
  libName: string,
  debugPort?: number
): Promise<StringMaterialsFile> {
  return loadFileAsString(MaterialsFileType.Entry, libName, debugPort);
}

export async function loadMeta(libName: string, debugPort?: number) {
  const info = getMaterialsFileInfo(MaterialsFileType.Meta, libName, debugPort);
  const [meta, [, err]] = await Promise.all([
    loadUMDModule<MaterialsMeta>(info),
    promiseWrapper(loadStyle(info, window, `${libName}-meta`))
  ]);

  if (err) {
    console.warn(
      `Skip load meta style of materials lib "${libName}" with error: `,
      err
    );
  }

  const handler = R.partial(handleMaterials, [libName]);
  R.mapObjIndexed(handler, meta.components);
  R.mapObjIndexed(handler, meta.plugins);
  R.mapObjIndexed(handler, meta.actions);

  return meta;

  function handleMaterials(
    libName: string,
    item: MaterialsComponentMeta | MaterialsPluginMeta | MaterialsActionMeta,
    name: string
  ) {
    item.lib = libName.toLowerCase();
    item.name = name;
    item.identityName = `${item.lib}_${item.name.toLowerCase()}`;
  }
}

export function loadContainerHTML(libName: string, debugPort?: number) {
  const info = getMaterialsFileInfo(MaterialsFileType.HTML, libName, debugPort);
  return loadUMDModule<string>(info);
}
