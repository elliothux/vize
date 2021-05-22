import { ComponentType } from 'react';
import { MaterialsForm } from './form';
import { MaterialsCustomEvent } from './events';
import { MaterialsInfo } from './materials';
import { ComponentProps } from './component';
import { RouterProps } from './pages';

export interface MaterialsContainerMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly info: MaterialsInfo;
  readonly pageDataForm?: MaterialsForm;
  readonly pageStyleForm?: MaterialsForm;
  readonly globalDataForm?: MaterialsForm;
  readonly globalStyleForm?: MaterialsForm;
  readonly globalOnEvents?: MaterialsCustomEvent[];
  readonly globalEmitEvents?: MaterialsCustomEvent[];
  readonly pageOnEvents?: MaterialsCustomEvent[];
  readonly pageEmitEvents?: MaterialsCustomEvent[];
  readonly isBuildIn?: boolean;
}

export interface RenderEntryParams extends Pick<ComponentProps, 'meta' | 'on' | 'cancel' | 'emit'> {
  globalData: object;
  globalStyle: object;
  render: Function;
  implementRouterController: (CustomRouter: ComponentType<RouterProps>) => void;
}

export type ContainerRenderEntry = (params: RenderEntryParams) => void;

export type RenderTemplateParams = Pick<RenderEntryParams, 'meta' | 'globalData' | 'globalStyle'>;
