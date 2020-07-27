import { action, observable } from 'mobx';
import { PluginInstance } from 'types';
import { materialsStore } from './materials';
import { createPluginInstance } from '../utils';
import { selectStore } from './select';

export class PluginsStore {
    @observable
    public pluginsInstances: PluginInstance[] = [];

    @action
    public addPluginInstance = (pluginID: string) => {
        const plugin = materialsStore.plugins[pluginID];
        const instance = createPluginInstance(plugin);

        this.pluginsInstances.push(instance);

        selectStore.selectPlugin(instance.key);
    };

    @action
    public deletePluginInstance = (key: number) => {
        const index = this.pluginsInstances.findIndex(i => i.key === key);
        this.pluginsInstances.splice(index, 1);
        selectStore.selectPage(selectStore.pageIndex);
    };

    // @action
    // public resortPluginInstance = (key)
}

export const pluginsStore = new PluginsStore();
