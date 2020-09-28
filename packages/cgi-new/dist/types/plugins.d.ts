import { MaterialsInfo } from './materials';
import { MaterialsForm } from './form';
import { MaterialsCustomEvent, EventInstance } from './events';
export interface MaterialsPluginMeta {
    identityName: string;
    lib: string;
    name: string;
    readonly info: MaterialsInfo;
    readonly dataForm?: MaterialsForm;
    readonly thumb?: string;
    readonly preview?: string;
    readonly onEvents?: MaterialsCustomEvent[];
    readonly emitEvents?: MaterialsCustomEvent[];
    readonly isBuildIn?: boolean;
}
export interface PluginInstance {
    key: Readonly<number>;
    plugin: Readonly<string>;
    data: {
        [key: string]: any;
    };
    events: EventInstance[];
}
export interface PluginParams {
    data: object;
}
export declare type MaterialsPlugin = (params: PluginParams) => void;
