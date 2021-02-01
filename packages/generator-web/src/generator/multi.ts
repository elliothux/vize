import { BaseGenerator } from './base';
import * as fs from 'fs-extra';
import * as path from 'path';
import { runBuild } from '../builder';
import { BuildConfigParams } from '../builder/configGenerator';
import { getTpl } from '../utils';

export class MultiPageGenerator extends BaseGenerator {
  private preparePagesFolder = (src: string) => {
    const pagesPath = path.resolve(src, 'pages');
    return fs.mkdirp(pagesPath);
  };

  private generateIndexFile = async (pageIndex: number, targetPath: string, globalFilePath: string) => {
    const params = { entry: 'vize-main-entry', pageKey: this.dsl.pageInstances[pageIndex].key, globalFilePath };
    const tpl = await getTpl('multi-index');
    const content = tpl(params);
    return fs.writeFile(path.resolve(targetPath), content, { encoding: 'utf-8' });
  };

  private generatePageFiles = async (): Promise<[string, BuildConfigParams['entryPaths']]> => {
    const [target, src] = await this.prepareFiles();
    await this.preparePagesFolder(src);

    const { pageInstances } = this.dsl;
    const moreThanOnePage = pageInstances.length > 1;
    return [
      target,
      await Promise.all(
        pageInstances.map(async ({ key }, index) => {
          this.generateContainerParams(index);

          const pagePath = path.resolve(src, `pages/page-${key}.tsx`);
          const globalFilePath = path.resolve(src, `pages/global-${key}.tsx`);
          await this.generatePagesFile(index, pagePath, globalFilePath);

          const entryPath = path.resolve(target, moreThanOnePage ? `index-${key}.tsx` : 'index.tsx');
          await this.generateIndexFile(index, entryPath, globalFilePath);

          return { pageKey: key, entryPath, pagePath };
        }),
      ),
    ];
  };

  public run = async () => {
    const [root, entryPaths] = await this.generateSharedComponentsMap().generatePageFiles();
    await runBuild({
      root,
      entryPaths,
      isMultiPage: this.isMultiPage,
      containerPath: this.containerPath,
      containerParams: this.containerParams,
    });
  };
}
