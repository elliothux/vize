import * as fs from 'fs-extra';
import * as path from 'path';
import {
  ComponentInstanceDSL,
  MaterialsManifest,
  JsonSchemaProperties,
  GeneratorResult,
  PluginInstanceDSL,
} from '../types';
import { BaseGenerator } from './base';
import { runBuild } from '../builder';
import { BuildConfigParams } from '../builder/configGenerator';
import { getTpl } from '../utils';

export class SinglePageGenerator extends BaseGenerator {
  private materialsManifestMap = new Map<string, MaterialsManifest>();

  private schema: JsonSchemaProperties = {};

  private mock: { [key: string]: object } = {};

  private preparePagesPath = (src: string) => {
    const pagesPath = path.resolve(src, 'pages');
    return fs.mkdirp(pagesPath);
  };

  private generateIndexFile = async (targetPath: string, entryPaths: BuildConfigParams['entryPaths']) => {
    const pages = this.dsl.pageInstances.map(({ key, name, isHome }) => ({
      key,
      name,
      path: key.toString(),
      isHome,
    }));
    const params = {
      entry: 'vize-main-entry',
      pages: JSON.stringify(pages),
      pageImports: entryPaths
        .map(({ pageKey }) => `import { PageRender as Page${pageKey} } from './pages/page-${pageKey}'`)
        .join(';\n'),
      dynamicImports: `{${entryPaths
        .map(({ pageKey }) => `${pageKey}: () => Promise.resolve({ PageRender: Page${pageKey} })`)
        .join(', ')}}`,
      globalFilePath: './pages/global',
    };
    const tpl = await getTpl('index');
    const content = tpl(params);
    return fs.writeFile(path.resolve(targetPath), content, { encoding: 'utf-8' });
  };

  private generatePageFiles = async (): Promise<[string, BuildConfigParams['entryPaths']]> => {
    const [target, src] = await this.prepareFiles();
    await this.preparePagesPath(src);

    const { pageInstances } = this.dsl;
    const globalFilePath = path.resolve(src, 'pages/global.ts');
    const pagePaths = await Promise.all(
      pageInstances.map(async ({ key }, index) => {
        const pagePath = path.resolve(src, `pages/page-${key}.tsx`);
        await this.generatePagesFile(index, pagePath, globalFilePath);
        return { pageKey: key, pagePath };
      }),
    );

    const entryPath = path.resolve(target, 'src/mobile/index.tsx');
    await this.generateIndexFile(entryPath, pagePaths);

    return [target, pagePaths];
  };

  private getMaterialsManifest = async (lib: string): Promise<MaterialsManifest> => {
    const manifest = this.materialsManifestMap.get(lib);
    if (manifest) {
      return manifest;
    }

    const filePath = path.resolve(this.libsPath, lib, `./dist/@vize-materials-${lib}-manifest.json`);
    const content = (await fs.readJSON(filePath, { encoding: 'utf-8' })) as MaterialsManifest;
    this.materialsManifestMap.set(lib, content);
    return content;
  };

  private generateMaterialComponentSchema = async ({ component, lib, key, data, style }: ComponentInstanceDSL) => {
    const { components } = await this.getMaterialsManifest(lib);
    const name = component.split(`${lib}_`)[1];
    const {
      dataForm,
      styleForm,
      info: { name: displayName },
    } = components[name]!;

    if (dataForm) {
      const k = `component_data_${key}`;
      this.schema[k] = {
        type: 'object',
        title: `组件数据配置[${displayName}](key=${key})`,
        properties: dataForm,
      };
      this.mock[k] = data;
    }

    if (styleForm) {
      const k = `component_style_${key}`;
      this.schema[k] = {
        type: 'object',
        title: `组件样式配置[${displayName}](key=${key})`,
        properties: styleForm,
      };
      this.mock[k] = style;
    }
  };

  private generateMaterialPluginSchema = async ({ plugin, lib, key, data }: PluginInstanceDSL) => {
    const { plugins } = await this.getMaterialsManifest(lib);
    const name = plugin.split(`${lib}_`)[1];
    const {
      dataForm,
      info: { name: displayName },
    } = plugins[name]!;

    if (dataForm) {
      const k = `plugin_data_${key}`;
      this.schema[k] = {
        type: 'object',
        title: `插件配置[${displayName}](key=${key})`,
        properties: dataForm,
      };
      this.mock[k] = data;
    }
  };

  private generateSchemaAndMock = async () => {
    const { sharedComponentInstances, pluginInstances, pageInstances } = this.dsl;
    await Promise.all([
      ...(sharedComponentInstances?.map(this.generateMaterialComponentSchema) || []),
      ...(pluginInstances?.map(this.generateMaterialPluginSchema) || []),
      ...pageInstances.map(async ({ componentInstances, pluginInstances }) => {
        await Promise.all([
          ...componentInstances.map(this.generateMaterialComponentSchema),
          ...(pluginInstances?.map(this.generateMaterialPluginSchema) || []),
        ]);
      }),
    ]);
    await Promise.all([this.writeSchemaFile(), this.writeMockFile()]);
  };

  private writeSchemaFile = () => {
    const targetPath = path.resolve(this.distPath, this.dsl.pageKey, './src/schema.json');
    return fs.writeJSON(
      targetPath,
      {
        title: 'Schema',
        type: 'object',
        properties: this.schema,
      },
      { spaces: 2 },
    );
  };

  private writeMockFile = () => {
    const targetPath = path.resolve(this.distPath, this.dsl.pageKey, './src/mock.json');
    return fs.writeJSON(targetPath, this.mock, { spaces: 2 });
  };

  public run = async (): Promise<GeneratorResult> => {
    const [root, entryPaths] = await this.generateContainerParams(-1)
      .generateSharedComponentsMap()
      .generatePageFiles();
    await this.generateSchemaAndMock();
    // return Promise.resolve(root);
    // await runBuild({
    //   root,
    //   entryPaths,
    //   isMultiPage: this.isMultiPage,
    //   containerPath: this.containerPath,
    //   containerParams: this.containerParams,
    // });
    // TODO: publish module
    return { path: path.resolve(root, 'src'), type: 'url' };
  };
}
