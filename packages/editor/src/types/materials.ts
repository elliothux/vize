import { ComponentProps, MaterialsComponent, MaterialsComponentMeta } from './component';
import { MaterialsPlugin, MaterialsPluginMeta } from './plugins';
import { MaterialsActionMeta, MaterialsAction } from './action';
import { RouterProps } from './pages';
import * as React from 'react';
import { FormFieldComponent } from '../widgets/Form/Fields';

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
    component: FormFieldComponent;
  }[];
}

export interface RenderEntryParams extends Pick<ComponentProps, 'global' | 'meta'> {
  render: Function;
  implementRouterController: (CustomRouter: React.ComponentType<RouterProps>) => void;
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
