import { MaterialsInfo } from './materials';
import { MaterialsForm } from './form';
import { MaterialsCustomEvent } from './events';
import { GlobalMeta } from './global';
import { PageRouter } from './pages';

export interface MaterialsActionMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly thumb: string;
  readonly info: MaterialsInfo;
  readonly dataForm?: MaterialsForm;
  readonly emitEvents?: MaterialsCustomEvent[];
  readonly isBuildIn?: boolean;
  readonly maxTimeout?: 'infinity' | number;
}

// TODO
export interface ActionParams {
  data: { [key: string]: any };
  global: object;
  meta: GlobalMeta;
  router: PageRouter;
}

export type MaterialsAction = (params: ActionParams) => void | Promise<void>;
