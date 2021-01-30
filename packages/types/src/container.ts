import { MaterialsForm } from './form';
import { MaterialsCustomEvent } from './events';
import { MaterialsInfo } from './materials';

export interface MaterialsContainerMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly info: MaterialsInfo;
  readonly dataForm?: MaterialsForm;
  readonly styleForm?: MaterialsForm;
  readonly onEvents?: MaterialsCustomEvent[];
  readonly emitEvents?: MaterialsCustomEvent[];
  readonly isBuildIn?: boolean;
}
