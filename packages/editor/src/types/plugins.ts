import { MaterialsInfo } from './materials';
import { JsonSchemaProperties } from './helper';
import { OverrideFormComponent } from '../components/Form/OverrideForm';

export interface MaterialsPluginMeta {
    identityName: string;
    lib: string;
    name: string;
    readonly info: MaterialsInfo;
    readonly dataForm?: JsonSchemaProperties | OverrideFormComponent;
    readonly thumb?: string;
    readonly preview?: string;
}

export interface PluginInstance {
    key: Readonly<number>;
    plugin: Readonly<string>;
    data: { [key: string]: any };
}

// TODO
export type MaterialsPlugin = () => void;
