export interface MaterialsItem {
    name: string;
    entry: string;
    mainPath: string;
    metaPath: string;
}

export type MaterialsList = MaterialsItem[];

export type ComponentsList = MaterialsList;

export type PluginsList = MaterialsList;

export type ActionsList = MaterialsList;
