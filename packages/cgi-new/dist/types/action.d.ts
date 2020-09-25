import { MaterialsInfo } from './materials';
import { MaterialsForm } from './form';
import { MaterialsCustomEvent } from './events';
import { GlobalMeta } from './global';
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
export interface ActionParams {
    data: object;
    global: object;
    meta: GlobalMeta;
}
export declare type MaterialsAction = (params: ActionParams) => void;
