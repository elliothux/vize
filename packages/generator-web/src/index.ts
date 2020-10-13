import * as path from 'path';
import * as fs from 'fs-extra';
import {
  ComponentInstanceDSL,
  DSL,
  EventInstance,
  EventTargetType,
  MaterialsPathMap,
  PageMode,
  PluginInstanceDSL,
  TplParams,
} from './types';
import { formatGlobalStyle, getTpl, stringifyImports, stringifyMaterialsMap } from './utils';

interface InitParams {
  dsl: DSL;
  libsPath: WebPageGenerator['libsPath'];
  depsPath: WebPageGenerator['depsPath'];
  targetPath: string;
}

export class WebPageGenerator {
  constructor({ dsl, libsPath, depsPath, targetPath }: InitParams) {
    this.dsl = dsl;
    this.libsPath = libsPath;
    this.depsPath = depsPath;
    this.targetPath = targetPath;
  }

  private readonly dsl: DSL;

  private readonly libsPath: string;

  private readonly depsPath: string;

  private readonly targetPath: string;

  private readonly componentsPathMap: MaterialsPathMap = {};

  private readonly pluginsPathMap: MaterialsPathMap = {};

  private readonly actionsPathMap: MaterialsPathMap = {};

  private getMaterialPath = (lib: string, identityName: string, type: 'component' | 'plugin' | 'action') => {
    return path.resolve(this.libsPath, `./${lib}/src/${type}s/${identityName.split('_')[1]}`);
  };

  private generateComponentImports = (componentInstances: ComponentInstanceDSL[]) => {
    return componentInstances.forEach(({ lib, component: identity, children, events }) => {
      if (children?.length) {
        this.generateComponents(children);
      }

      if (events.length) {
        this.generateActions(events);
      }

      const importPath = this.getMaterialPath(lib, identity, 'component');
      if (this.componentsPathMap[lib]) {
        this.componentsPathMap[lib][identity] = importPath;
      } else {
        this.componentsPathMap[lib] = { [identity]: importPath };
      }
    });
  };

  private generatePluginImports = (pluginInstances: PluginInstanceDSL[]) => {
    return pluginInstances.forEach(({ lib, plugin: identity, events }) => {
      if (events.length) {
        this.generateActions(events);
      }

      const importPath = this.getMaterialPath(lib, identity, 'plugin');
      if (this.pluginsPathMap[lib]) {
        this.pluginsPathMap[lib][identity] = importPath;
      } else {
        this.pluginsPathMap[lib] = { [identity]: importPath };
      }
    });
  };

  private generateComponents = (componentInstances?: ComponentInstanceDSL[]) => {
    const { pageInstances } = this.dsl;
    const components = componentInstances ? [componentInstances] : pageInstances.map(i => i.componentInstances);
    return components.forEach(i => {
      this.generateComponentImports(i);
    });
  };

  private generatePlugins = () => {
    const {
      pageInstances,
      pluginInstances,
      global: { pageMode },
    } = this.dsl;
    const plugins = pageMode === PageMode.SINGLE ? [pluginInstances] : pageInstances.map(i => i.pluginInstances);

    return plugins.forEach(i => {
      this.generatePluginImports(i);
    });
  };

  private generateActions = (events: EventInstance[]) => {
    events.forEach(({ target, events }) => {
      if (events.length) {
        this.generateActions(events);
      }

      if (target.type !== EventTargetType.ACTION) {
        return;
      }

      const { lib, id: identity } = target;
      const importPath = this.getMaterialPath(lib, identity, 'action');
      if (this.actionsPathMap[lib]) {
        this.actionsPathMap[lib][identity] = importPath;
      } else {
        this.actionsPathMap[lib] = { [identity]: importPath };
      }
    });
  };

  // TODO: multi pages
  private generateTplParams = (): TplParams => {
    const {
      dsl: {
        global: { globalProps, globalStyle, metaInfo, pageMode },
        pageInstances: [{ componentInstances, pluginInstances }],
        pluginInstances: singleModePluginInstances,
      },
      componentsPathMap,
      pluginsPathMap,
      actionsPathMap,
    } = this;

    return {
      runtimePath: path.resolve(this.depsPath, './runtime-web'),
      globalStyle: formatGlobalStyle(globalStyle),
      autoInjectedStyle: '',
      meta: JSON.stringify(metaInfo),
      global: JSON.stringify(globalProps),
      componentImports: stringifyImports(componentsPathMap),
      componentsMaterialMap: stringifyMaterialsMap(componentsPathMap),
      componentInstances: JSON.stringify(componentInstances),
      pluginImports: stringifyImports(pluginsPathMap),
      pluginsMaterialMap: stringifyMaterialsMap(pluginsPathMap),
      pluginInstances: JSON.stringify(pageMode === PageMode.SINGLE ? singleModePluginInstances : pluginInstances),
      actionImports: stringifyImports(actionsPathMap),
      actionsMaterialMap: stringifyMaterialsMap(actionsPathMap),
    };
  };

  private writeAppFile = async () => {
    const params = this.generateTplParams();
    const tpl = await getTpl();
    const content = tpl(params);
    return fs.writeFile(this.targetPath, content, { encoding: 'utf-8' });
  };

  public generatePage = async () => {
    this.generateComponents();
    this.generatePlugins();
    await this.writeAppFile();
  };
}
