import { MaterialsForm, MaterialsInfo } from './materials';

export interface MaterialsPluginMeta {
    identityName: string;
    lib: string;
    name: string;
    readonly info: MaterialsInfo;
    readonly dataForm?: MaterialsForm;
    readonly thumb?: string;
    readonly preview?: string;
}

export interface PluginInstance {
    key: Readonly<number>;
    plugin: Readonly<string>;
    data: { [key: string]: any };
}

// TODO
export interface PluginParams {
    data: object;
}

export type MaterialsPlugin = (params: PluginParams) => void;
