import { MaterialsForm, MaterialsInfo } from './materials';
import { MaterialsCustomEvent } from './events';
import { PageMeta } from './pages';

export interface MaterialsActionMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly thumb: string;
  readonly info: MaterialsInfo;
  readonly dataForm?: MaterialsForm;
  readonly emitEvents?: MaterialsCustomEvent[];
  readonly isBuildIn?: boolean;
}

// TODO
export interface ActionParams {
  data: object;
  global: object;
  meta: PageMeta;
}

export type MaterialsAction = (params: ActionParams) => void;
