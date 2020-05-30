import { PluginInstance } from 'types';
import { getMaterialsPlugin } from '../../utils';
import { pluginsStore } from '../../states';

class PluginExecutor {
    constructor(plugins: PluginInstance[]) {
        this.plugins = plugins;
    }

    private plugins: PluginInstance[];

    public execute = (win: Window) => {
        this.plugins.forEach(({ plugin, data }) => {
            const pluginFunction = getMaterialsPlugin(plugin)!.bind(win);
            const params = { data };
            try {
                pluginFunction(params);
            } catch (e) {
                console.error('Plugin throw error: ', e);
            }
        });
    };
}

export function executePlugins(win: Window) {
    const executor = new PluginExecutor(pluginsStore.pluginsInstances);
    return executor.execute(win);
}
