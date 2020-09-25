import { GlobalMeta, GlobalStyle, LayoutMode } from './global';
import { PageInstance, PageMode } from './pages';
import { ComponentInstance } from './component';
import { PluginInstance } from './plugins';
import { InstanceKeyType } from './materials';
export interface ComponentInstanceDSL extends Omit<ComponentInstance, 'parent'> {
    children?: ComponentInstanceDSL[];
}
export declare type PluginInstanceDSL = PluginInstance;
export interface PageDSL extends Omit<PageInstance, 'isNameEditing'> {
    componentInstances: ComponentInstanceDSL[];
    pluginInstances?: PluginInstanceDSL[];
}
export declare type DSL = Readonly<{
    pageKey: string;
    global: {
        layoutMode: LayoutMode;
        pageMode: PageMode;
        metaInfo: GlobalMeta;
        globalProps: object;
        globalStyle: GlobalStyle;
    };
    pageInstances: PageDSL[];
    pluginInstances?: PluginInstanceDSL[];
    editInfo: {
        maxKeys: {
            [InstanceKeyType.Page]: number;
            [InstanceKeyType.Component]: number;
            [InstanceKeyType.HotArea]: number;
            [InstanceKeyType.Plugin]: number;
            [InstanceKeyType.Action]: number;
        };
    };
}>;
