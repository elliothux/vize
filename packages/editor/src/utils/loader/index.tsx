import * as R from 'ramda';
import {
  MaterialsActionMeta,
  MaterialsComponentMeta,
  MaterialsForms,
  MaterialsMeta,
  MaterialsPluginMeta,
  Maybe,
} from 'types';
import {
  getMaterialsFileInfo,
  loadFileAsString,
  loadStyle,
  loadUMDModule,
  MaterialsFileType,
  StringMaterialsFile,
} from './utils';
import { getMaterialsIdentityName, promiseWrapper } from '../common';

export async function loadMaterials(libName: string, containerName: string, debugPort?: number) {
  const [[meta, forms], containerHTML, main, entry] = await Promise.all([
    new Promise<[MaterialsMeta, Maybe<MaterialsForms>]>(async resolve => {
      const meta = await loadMeta(libName, containerName, debugPort);
      if (!meta.withForms) {
        resolve([meta, null]);
        return;
      }
      const forms = await loadForms(libName, containerName, debugPort);
      resolve([meta, forms]);
    }),
    loadContainerHTML(libName, containerName, debugPort),
    loadMain(libName, containerName, debugPort),
    loadEntry(libName, containerName, debugPort),
  ]);

  return {
    libName,
    containerHTML,
    meta,
    main,
    entry,
    forms,
  };
}

export function loadMain(libName: string, containerName: string, debugPort?: number): Promise<StringMaterialsFile> {
  return loadFileAsString(MaterialsFileType.Main, libName, containerName, debugPort);
}

export function loadEntry(libName: string, containerName: string, debugPort?: number): Promise<StringMaterialsFile> {
  return loadFileAsString(MaterialsFileType.Entry, libName, containerName, debugPort);
}

export async function loadForms(libName: string, containerName: string, debugPort?: number): Promise<MaterialsForms> {
  const info = getMaterialsFileInfo(MaterialsFileType.Form, libName, containerName, debugPort);
  const [forms, [, err]] = await Promise.all([
    loadUMDModule<MaterialsForms>(info),
    promiseWrapper(loadStyle(info, window, `${libName}-form`)),
  ]);

  if (err) {
    console.warn(`Skip load form style of materials lib "${libName}" with error: `, err);
  }

  return forms;
}

export async function loadMeta(libName: string, containerName: string, debugPort?: number): Promise<MaterialsMeta> {
  const info = getMaterialsFileInfo(MaterialsFileType.Meta, libName, containerName, debugPort);
  const [meta, [, err]] = await Promise.all([
    loadUMDModule<MaterialsMeta>(info),
    promiseWrapper(loadStyle(info, window, `${libName}-meta`)),
  ]);

  if (err) {
    console.warn(`Skip load meta style of materials lib "${libName}" with error: `, err);
  }

  const components: MaterialsMeta['components'] = {};
  R.mapObjIndexed((i, key) => {
    const item = generateMaterials(libName, i, key);
    components[item.identityName] = item;
  }, meta.components);

  const plugins: MaterialsMeta['plugins'] = {};
  R.mapObjIndexed((i, key) => {
    const item = generateMaterials(libName, i, key);
    plugins[item.identityName] = item;
  }, meta.plugins);

  const actions: MaterialsMeta['actions'] = {};
  R.mapObjIndexed((i, key) => {
    const item = generateMaterials(libName, i, key);
    actions[item.identityName] = item;
  }, meta.actions);

  return {
    components,
    actions,
    plugins,
    withForms: meta.withForms,
    lib: meta.lib,
  };

  function generateMaterials<T = MaterialsComponentMeta | MaterialsPluginMeta | MaterialsActionMeta>(
    libName: string,
    item: T,
    name: string,
  ): T {
    return {
      ...item,
      name,
      lib: libName.toLowerCase(),
      identityName: getMaterialsIdentityName(libName, name),
    };
  }
}

export function loadContainerHTML(libName: string, containerName: string, debugPort?: number) {
  const info = getMaterialsFileInfo(MaterialsFileType.HTML, libName, containerName, debugPort);
  return loadUMDModule<string>(info);
}

export * from './inject';
