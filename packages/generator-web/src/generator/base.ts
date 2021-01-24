/* eslint-disable max-lines */
import path from 'path';
import * as fs from 'fs-extra';
import { ComponentInstanceDSL, DSL, EventInstance, EventTargetType, PageMode, PluginInstanceDSL } from '../../types';
import {
  formatGlobalStyle,
  getTpl,
  prepareTargetFolder,
  stringifyComponentInstances,
  stringifyUmdConstants,
  stringifyMaterialVars,
} from '../utils';
import { GlobalTplParams, MaterialsPathMap, PageMaterialsPathMap, PageTplParams } from '../types';
import { BaseConfigParams } from '../builder/base';

interface InitParams {
  dsl: DSL;
  libsPath: BaseGenerator['libsPath'];
  runtimePath: BaseGenerator['runtimePath'];
  distPath: string;
}

export class BaseGenerator {
  constructor({ dsl, libsPath, runtimePath, distPath }: InitParams) {
    this.dsl = dsl;
    this.libsPath = libsPath;
    this.runtimePath = runtimePath;
    this.distPath = distPath;
  }

  public readonly dsl: DSL;

  public readonly distPath: string;

  private readonly libsPath: string;

  private readonly runtimePath: string;

  private readonly pageComponentsPathMaps: PageMaterialsPathMap = [];

  private readonly pagePluginsPathMaps: PageMaterialsPathMap = [];

  private readonly pageComponentActionsPathMaps: PageMaterialsPathMap = [];

  private readonly pagePluginActionsPathMaps: PageMaterialsPathMap = [];

  private readonly sharedComponentPathMap: MaterialsPathMap = {};

  private readonly sharedComponentActionsPathMap: MaterialsPathMap = {};

  public readonly containerParams: { [key: string]: BaseConfigParams['containerParams'] } = {};

  public get isMultiPage() {
    return this.dsl.editInfo.pageMode === PageMode.MULTI;
  }

  public get containerPath() {
    const {
      container: { name, lib },
    } = this.dsl;
    return path.resolve(this.libsPath, `./${lib}/src/containers/${name}`);
  }

  public generateSharedComponentsMap() {
    const { sharedComponentInstances } = this.dsl;
    if (sharedComponentInstances) {
      this.generateComponentImports(sharedComponentInstances);
    }
    return this;
  }

  public generateContainerParams(pageIndex: number) {
    const { global, pageInstances } = this.dsl;
    const { globalProps, metaInfo } = this.isMultiPage ? pageInstances[pageIndex].global : global;
    this.containerParams[this.isMultiPage ? pageInstances[pageIndex].key.toString() : 'single'] = {
      global: globalProps,
      meta: metaInfo,
    };
    return this;
  }

  public prepareFiles = async () => {
    const {
      pageKey,
      container: { name, lib },
    } = this.dsl;
    const [target, src] = await prepareTargetFolder(this.distPath, pageKey);

    const containerPath = path.resolve(this.libsPath, `./${lib}/src/containers/${name}`);
    await this.copyContainerTemplate(containerPath, src);
    await this.createDepsSoftLink(target);

    return [target, src];
  };

  private copyContainerTemplate = async (containerPath: string, targetPath: string) => {
    const files = await fs.readdir(containerPath);
    await Promise.all(
      files.map(fileName => {
        if (BaseGenerator.copyIgnoreFiles.includes(fileName)) {
          return Promise.resolve();
        }
        const fromFilePath = path.resolve(containerPath, fileName);
        const targetFilePath = path.resolve(targetPath, fileName);
        console.log(`Copying ${fromFilePath}  to ${targetFilePath}`);
        return fs.copy(fromFilePath, targetFilePath);
      }),
    );
  };

  private createDepsSoftLink = async (targetPath: string) => {
    const depsPath = path.resolve(targetPath, './deps/');
    await fs.ensureDir(depsPath);
    return Promise.all([
      fs.symlink(this.libsPath, path.resolve(targetPath, './libs')),
      fs.symlink(this.runtimePath, path.resolve(depsPath, 'runtime-web')),
    ]);
  };

  public generatePagesFile = async (pageIndex: number, pagePath: string, globalPath: string) => {
    await this.generatePageMaterialsMap(pageIndex);
    await this.generatePageFile(pageIndex, pagePath, globalPath);
    await this.generateGlobalFile(pageIndex, globalPath);
  };

  private generateGlobalFile = async (pageIndex: number, globalPath: string) => {
    const params = this.generateGlobalTplParams(pageIndex);
    const tpl = await getTpl('global');
    const content = tpl(params);
    return fs.writeFile(globalPath, content, { encoding: 'utf-8', flag: 'w+' });
  };

  private generateGlobalTplParams = (pageIndex: number): GlobalTplParams => {
    const {
      dsl: { pageInstances, pluginInstances: singleModePluginInstances, global: singleModeGlobal },
      pagePluginsPathMaps,
      pagePluginActionsPathMaps,
    } = this;
    const { pluginInstances, global } = pageInstances[pageIndex];
    const { globalProps, globalStyle, metaInfo } = this.isMultiPage ? global : singleModeGlobal;

    const pluginsPathMap = pagePluginsPathMaps[pageIndex];
    const actionsPathMap = { ...pagePluginActionsPathMaps[pageIndex], ...this.sharedComponentActionsPathMap };

    console.log(this.dsl.sharedComponentInstances, stringifyComponentInstances(this.dsl.sharedComponentInstances));

    return {
      globalStyle: formatGlobalStyle(globalStyle),
      autoInjectedStyle: '',
      meta: JSON.stringify(metaInfo),
      global: JSON.stringify(globalProps),
      pluginVars: stringifyMaterialVars(pluginsPathMap),
      pluginImports: stringifyUmdConstants(pluginsPathMap),
      pluginInstances: JSON.stringify(this.isMultiPage ? pluginInstances : singleModePluginInstances),
      actionVars: stringifyMaterialVars(actionsPathMap),
      actionImports: stringifyUmdConstants(actionsPathMap),
      sharedComponentVars: stringifyMaterialVars(this.sharedComponentPathMap),
      sharedComponentImports: stringifyUmdConstants(this.sharedComponentPathMap),
      sharedComponentInstances: stringifyComponentInstances(this.dsl.sharedComponentInstances),
    };
  };

  private generatePageFile = async (pageIndex: number, pagePath: string, globalFilePath: string) => {
    const params = this.generatePageTplParams(pageIndex, globalFilePath);
    const tpl = await getTpl('page');
    const content = tpl(params);
    return fs.writeFile(pagePath, content, { encoding: 'utf-8' });
  };

  private generatePageTplParams = (pageIndex: number, globalFilePath: string): PageTplParams => {
    const {
      dsl: { pageInstances },
      pageComponentsPathMaps,
      pageComponentActionsPathMaps,
    } = this;
    const { componentInstances } = pageInstances[pageIndex];

    const componentsPathMap = pageComponentsPathMaps[pageIndex];
    const actionsPathMap = pageComponentActionsPathMaps[pageIndex];

    return {
      globalFilePath,
      componentVars: stringifyMaterialVars(componentsPathMap),
      componentImports: stringifyUmdConstants(componentsPathMap),
      componentInstances: stringifyComponentInstances(componentInstances),
      actionVars: stringifyMaterialVars(actionsPathMap),
      actionImports: stringifyUmdConstants(actionsPathMap),
    };
  };

  public generatePageMaterialsMap = (pageIndex: number) => {
    this.pageComponentsPathMaps[pageIndex] = {};
    this.pagePluginsPathMaps[pageIndex] = {};
    this.pageComponentActionsPathMaps[pageIndex] = {};
    this.pagePluginActionsPathMaps[pageIndex] = {};

    this.generateComponents(pageIndex);
    this.generatePlugins(pageIndex);
  };

  private generateComponents = (pageIndex: number, componentInstances?: ComponentInstanceDSL[]) => {
    const { pageInstances } = this.dsl;
    const components = componentInstances || pageInstances[pageIndex].componentInstances;
    return this.generateComponentImports(components, pageIndex);
  };

  private generatePlugins = (pageIndex: number) => {
    const { pageInstances, pluginInstances } = this.dsl;
    this.generatePluginImports(
      pageIndex,
      this.isMultiPage ? pageInstances[pageIndex].pluginInstances : pluginInstances,
    );
  };

  private generateActions = (
    from: 'component' | 'plugin' | 'sharedComponent',
    events: EventInstance[],
    pageIndex?: number,
  ) => {
    events.forEach(({ target, events }) => {
      if (events.length) {
        this.generateActions(from, events, pageIndex);
      }

      if (target.type !== EventTargetType.ACTION) {
        return;
      }

      const { lib, id: identity } = target;
      const importPath = this.getMaterialPathAndName(lib, identity, 'action');
      const pathMap =
        from === 'component'
          ? this.pageComponentActionsPathMaps[pageIndex]
          : from === 'sharedComponent'
          ? this.sharedComponentActionsPathMap
          : this.pagePluginActionsPathMaps[pageIndex];

      if (pathMap[lib]) {
        pathMap[lib][identity] = importPath;
      } else {
        pathMap[lib] = { [identity]: importPath };
      }
    });
  };

  private generateComponentImports = (componentInstances: ComponentInstanceDSL[], pageIndex?: number) => {
    const isShared = typeof pageIndex !== 'number';
    return componentInstances.forEach(({ lib, component: identity, children, events }) => {
      if (children?.length) {
        isShared ? this.generateComponentImports(children) : this.generateComponents(pageIndex, children);
      }

      if (events.length) {
        this.generateActions(isShared ? 'sharedComponent' : 'component', events, pageIndex);
      }

      const importPath = this.getMaterialPathAndName(lib, identity, 'component');
      const pathMap = isShared ? this.sharedComponentPathMap : this.pageComponentsPathMaps[pageIndex];
      if (pathMap[lib]) {
        pathMap[lib][identity] = importPath;
      } else {
        pathMap[lib] = { [identity]: importPath };
      }
    });
  };

  private generatePluginImports = (pageIndex: number, pluginInstances: PluginInstanceDSL[]) => {
    return pluginInstances.forEach(({ lib, plugin: identity, events }) => {
      if (events.length) {
        this.generateActions('plugin', events, pageIndex);
      }

      const importPath = this.getMaterialPathAndName(lib, identity, 'plugin');
      const pathMap = this.pagePluginsPathMaps[pageIndex];
      if (pathMap[lib]) {
        pathMap[lib][identity] = importPath;
      } else {
        pathMap[lib] = { [identity]: importPath };
      }
    });
  };

  private getMaterialPathAndName = (lib: string, identityName: string, type: 'component' | 'plugin' | 'action') => {
    const identity = identityName.split('_')[1];
    return {
      path: path.resolve(this.libsPath, `./${lib}/src/${type}s/${identity}`),
      name: `@vize-materials-${lib}-${identity}`,
    };
  };

  static copyIgnoreFiles = ['config.ts', 'config.js', 'config.json', 'index.html.ejs'];
}
