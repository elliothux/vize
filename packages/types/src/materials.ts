import { ComponentType } from 'react';
import { MaterialsComponent, MaterialsComponentMeta } from './component';
import { MaterialsPlugin, MaterialsPluginMeta } from './plugins';
import { MaterialsActionMeta, MaterialsAction } from './action';
import { JsonSchemaProperties } from './helper';
import { MaterialsContainerMeta } from './container';

export interface MaterialsInfo {
  name: string;
  desc: string;
  author: string;
  tags?: string[];
}

export interface MaterialsMeta {
  components: {
    [name: string]: MaterialsComponentMeta;
  };
  plugins: {
    [name: string]: MaterialsPluginMeta;
  };
  actions: {
    [name: string]: MaterialsActionMeta;
  };
  containers: {
    [name: string]: MaterialsContainerMeta;
  };
  lib: MaterialsLibConfig;
  withForms?: boolean;
}

export interface MaterialsMain {
  components: {
    [name: string]: MaterialsComponent;
  };
  plugins: {
    [name: string]: MaterialsPlugin;
  };
  actions: {
    [name: string]: MaterialsAction;
  };
}

export interface MaterialsForms {
  fields?: {
    field: string;
    component: ComponentType;
  }[];
}

export enum InstanceKeyType {
  Page = 'page',
  Component = 'component',
  HotArea = 'hot-area',
  Plugin = 'plugin',
  Action = 'action',
  ComponentAction = 'component_action',
  PluginAction = 'plugin_action',
}

interface MaterialsManifestItem {
  info: MaterialsInfo;
  dataForm?: JsonSchemaProperties;
  thumb?: string;
  preview?: string;
}

export interface MaterialsComponentManifestItem extends MaterialsManifestItem {
  styleForm?: JsonSchemaProperties;
}

export type MaterialsPluginManifestItem = MaterialsManifestItem;

export type MaterialsActionManifestItem = MaterialsManifestItem;

export interface MaterialsContainerManifestItem extends Pick<MaterialsManifestItem, 'info'> {
  globalDataForm?: JsonSchemaProperties;
  globalStyleForm?: JsonSchemaProperties;
  pageDataForm?: JsonSchemaProperties;
  pageStyleForm?: JsonSchemaProperties;
}

export interface MaterialsManifest {
  components: {
    [name: string]: MaterialsComponentManifestItem;
  };
  plugins: {
    [name: string]: MaterialsPluginManifestItem;
  };
  actions: {
    [name: string]: MaterialsActionManifestItem;
  };
  containers: {
    [name: string]: MaterialsContainerManifestItem;
  };
  lib: MaterialsLibConfig;
}

export enum MaterialsLibRuntime {
  REACT = 'react',
  RAX = 'rax',
}

export interface MaterialsLibConfig {
  libName: string;
  displayName: string;
  desc?: string;
  thumb?: string;
  author: string;
  runtime: MaterialsLibRuntime;
  releaseTo: string;
  __isBuildIn?: boolean;
}
