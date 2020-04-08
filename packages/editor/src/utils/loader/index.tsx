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

export async function loadMeta(
  libName: string,
  debugPort?: number
): Promise<MaterialsMeta> {
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

  const components: MaterialsMeta["components"] = {};
  R.mapObjIndexed((i, key) => {
    const item = generateMaterials(libName, i, key);
    components[item.identityName] = item;
  }, meta.components);

  const plugins: MaterialsMeta["plugins"] = {};
  R.mapObjIndexed((i, key) => {
    const item = generateMaterials(libName, i, key);
    plugins[item.identityName] = item;
  }, meta.plugins);

  const actions: MaterialsMeta["actions"] = {};
  R.mapObjIndexed((i, key) => {
    const item = generateMaterials(libName, i, key);
    actions[item.identityName] = item;
  }, meta.actions);

  return {
    components,
    actions,
    plugins
  };

  function generateMaterials<
    T = MaterialsComponentMeta | MaterialsPluginMeta | MaterialsActionMeta
  >(libName: string, item: T, name: string): T {
    const lib = libName.toLowerCase();
    return {
      ...item,
      name,
      lib: libName.toLowerCase(),
      identityName: `${lib}_${name.toLowerCase()}`
    };
  }
}

export function loadContainerHTML(libName: string, debugPort?: number) {
  const info = getMaterialsFileInfo(MaterialsFileType.HTML, libName, debugPort);
  return loadUMDModule<string>(info);
}

export * from "./inject";
