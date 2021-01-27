import { ComponentType } from 'react';
import { ComponentProps, MaterialsComponent, MaterialsComponentMeta } from './component';
import { MaterialsPlugin, MaterialsPluginMeta } from './plugins';
import { MaterialsActionMeta, MaterialsAction } from './action';
import { RouterProps } from './pages';
import { JsonSchemaProperties } from './helper';

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

export interface RenderEntryParams extends Pick<ComponentProps, 'global' | 'meta'> {
  render: Function;
  implementRouterController: (CustomRouter: ComponentType<RouterProps>) => void;
}

export type ContainerRenderEntry = (params: RenderEntryParams) => void;

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
}

export interface MaterialsComponentManifestItem extends MaterialsManifestItem {
  styleForm?: JsonSchemaProperties;
}

export type MaterialsPluginManifestItem = MaterialsManifestItem;

export type MaterialsActionManifestItem = MaterialsManifestItem;

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
}
