/* eslint-disable max-lines */
import path from 'path';
import * as fs from 'fs-extra';
import { ComponentInstanceDSL, DSL, EventInstance, EventTargetType, PageMode, PluginInstanceDSL } from '../../types';
import {
  formatGlobalStyle,
  getContainerHTMLTpl,
  getTpl,
  prepareTargetFolder,
  stringifyImports,
  stringifyMaterialVars,
} from '../utils';
import { PageMaterialsPathMap, PageTplParams } from '../types';
import { BaseConfigParams } from '../builder/base';

interface InitParams {
  dsl: DSL;
  libsPath: BaseGenerator['libsPath'];
  depsPath: BaseGenerator['depsPath'];
  distWorkspacePath: string;
}

export class BaseGenerator {
  constructor({ dsl, libsPath, depsPath, distWorkspacePath }: InitParams) {
    this.dsl = dsl;
    this.libsPath = libsPath;
    this.depsPath = depsPath;
    this.distWorkspacePath = distWorkspacePath;
  }

  public readonly dsl: DSL;

  public readonly distWorkspacePath: string;

  private readonly libsPath: string;

  private readonly depsPath: string;

  private readonly pageComponentsPathMaps: PageMaterialsPathMap = [];

  private readonly pagePluginsPathMaps: PageMaterialsPathMap = [];

  private readonly pageActionsPathMaps: PageMaterialsPathMap = [];

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

  public generateContainerParams(pageIndex: number) {
    const { global, pageInstances } = this.dsl;
    const { globalProps, metaInfo } = this.isMultiPage ? pageInstances[pageIndex].global : global;
    this.containerParams[this.isMultiPage ? pageInstances[pageIndex].key.toString() : 'single'] = {
      global: globalProps,
      meta: metaInfo,
    };
  }

  public prepareFiles = async () => {
    const {
      pageKey,
      container: { name, lib },
    } = this.dsl;
    const [target, src] = await prepareTargetFolder(this.distWorkspacePath, pageKey);

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

  private createDepsSoftLink = (targetPath: string) => {
    return Promise.all([
      fs.symlink(this.libsPath, path.resolve(targetPath, './libs')),
      fs.symlink(this.depsPath, path.resolve(targetPath, './deps')),
    ]);
  };

  public generatePagesFile = async (pageIndex: number, pagePath: string) => {
    await this.generatePageMaterialsMap(pageIndex);
    await this.generatePageFile(pageIndex, pagePath);
  };

  private generatePageFile = async (pageIndex: number, pagePath: string) => {
    const params = this.generatePageTplParams(pageIndex);
    const tpl = await getTpl('page');
    const content = tpl(params);
    return fs.writeFile(pagePath, content, { encoding: 'utf-8' });
  };

  private generatePageTplParams = (pageIndex: number): PageTplParams => {
    const {
      dsl: { pageInstances, pluginInstances: singleModePluginInstances, global: singleModeGlobal },
      pageComponentsPathMaps,
      pagePluginsPathMaps,
      pageActionsPathMaps,
    } = this;
    const { componentInstances, pluginInstances, global } = pageInstances[pageIndex];
    const { globalProps, globalStyle, metaInfo } = this.isMultiPage ? global : singleModeGlobal;

    const componentsPathMap = pageComponentsPathMaps[pageIndex];
    const pluginsPathMap = pagePluginsPathMaps[pageIndex];
    const actionsPathMap = pageActionsPathMaps[pageIndex];

    return {
      globalStyle: formatGlobalStyle(globalStyle),
      autoInjectedStyle: '',
      meta: JSON.stringify(metaInfo),
      global: JSON.stringify(globalProps),
      componentVars: stringifyMaterialVars(componentsPathMap),
      componentImports: stringifyImports(componentsPathMap),
      componentInstances: JSON.stringify(componentInstances),
      pluginVars: stringifyMaterialVars(pluginsPathMap),
      pluginImports: stringifyImports(pluginsPathMap),
      pluginInstances: JSON.stringify(this.isMultiPage ? pluginInstances : singleModePluginInstances),
      actionVars: stringifyMaterialVars(actionsPathMap),
      actionImports: stringifyImports(actionsPathMap),
    };
  };

  public generatePageMaterialsMap = (pageIndex: number) => {
    this.pageComponentsPathMaps[pageIndex] = {};
    this.pagePluginsPathMaps[pageIndex] = {};
    this.pageActionsPathMaps[pageIndex] = {};

    this.generateComponents(pageIndex);
    this.generatePlugins(pageIndex);
  };

  private generateComponents = (pageIndex: number, componentInstances?: ComponentInstanceDSL[]) => {
    const { pageInstances } = this.dsl;
    const components = componentInstances || pageInstances[pageIndex].componentInstances;
    return this.generateComponentImports(pageIndex, components);
  };

  private generatePlugins = (pageIndex: number) => {
    const { pageInstances, pluginInstances } = this.dsl;
    this.generatePluginImports(
      pageIndex,
      this.isMultiPage ? pageInstances[pageIndex].pluginInstances : pluginInstances,
    );
  };

  private generateActions = (pageIndex: number, events: EventInstance[]) => {
    events.forEach(({ target, events }) => {
      if (events.length) {
        this.generateActions(pageIndex, events);
      }

      if (target.type !== EventTargetType.ACTION) {
        return;
      }

      const { lib, id: identity } = target;
      const importPath = this.getMaterialPath(lib, identity, 'action');
      const pathMap = this.pageActionsPathMaps[pageIndex];
      if (pathMap[lib]) {
        pathMap[lib][identity] = importPath;
      } else {
        pathMap[lib] = { [identity]: importPath };
      }
    });
  };

  private generateComponentImports = (pageIndex: number, componentInstances: ComponentInstanceDSL[]) => {
    return componentInstances.forEach(({ lib, component: identity, children, events }) => {
      if (children?.length) {
        this.generateComponents(pageIndex, children);
      }

      if (events.length) {
        this.generateActions(pageIndex, events);
      }

      const importPath = this.getMaterialPath(lib, identity, 'component');
      const pathMap = this.pageComponentsPathMaps[pageIndex];
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
        this.generateActions(pageIndex, events);
      }

      const importPath = this.getMaterialPath(lib, identity, 'plugin');
      const pathMap = this.pagePluginsPathMaps[pageIndex];
      if (pathMap[lib]) {
        pathMap[lib][identity] = importPath;
      } else {
        pathMap[lib] = { [identity]: importPath };
      }
    });
  };

  private getMaterialPath = (lib: string, identityName: string, type: 'component' | 'plugin' | 'action') => {
    return path.resolve(this.libsPath, `./${lib}/src/${type}s/${identityName.split('_')[1]}`);
  };

  static copyIgnoreFiles = ['config.ts', 'config.js', 'config.json', 'index.html.ejs'];
}
