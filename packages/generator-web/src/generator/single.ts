import { BaseGenerator } from './base';
import * as fs from 'fs-extra';
import path from 'path';
import { runBuild } from '../builder';
import { BuildConfigParams } from '../builder/configGenerator';
import { getTpl } from '../utils';

export class SinglePageGenerator extends BaseGenerator {
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
      dynamicImports: `{${entryPaths
        .map(({ pageKey, pagePath }) => `${pageKey}: () => import('${pagePath}')`)
        .join(', ')}}`,
    };
    const tpl = await getTpl('single-index');
    const content = tpl(params);
    return fs.writeFile(path.resolve(targetPath), content, { encoding: 'utf-8' });
  };

  private generatePageFiles = async (): Promise<[string, BuildConfigParams['entryPaths']]> => {
    const [target, src] = await this.prepareFiles();
    await this.preparePagesPath(src);

    const { pageInstances } = this.dsl;
    const pagePaths = await Promise.all(
      pageInstances.map(async ({ key }, index) => {
        const pagePath = path.resolve(src, `pages/page-${key}.tsx`);
        const globalPath = path.resolve(src, 'pages/global.ts');
        await this.generatePagesFile(index, pagePath, globalPath);
        return { pageKey: key, pagePath };
      }),
    );

    const entryPath = path.resolve(target, 'index.tsx');
    await this.generateIndexFile(entryPath, pagePaths);

    return [target, pagePaths];
  };

  public run = async () => {
    this.generateContainerParams(-1);
    const [root, entryPaths] = await this.generatePageFiles();
    // return Promise.resolve(root);
    await runBuild({
      root,
      entryPaths,
      isMultiPage: this.isMultiPage,
      containerPath: this.containerPath,
      containerParams: this.containerParams,
    });
  };
}
