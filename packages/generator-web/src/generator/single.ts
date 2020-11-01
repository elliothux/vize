import { BaseGenerator } from './base';
import * as fs from 'fs-extra';
import path from 'path';
import { runBuild } from '../builder';
import { BuildConfigParams } from '../builder/configGenerator';

export class SinglePageGenerator extends BaseGenerator {
  private preparePages = (src: string) => {
    const pagesPath = path.resolve(src, 'pages');
    return fs.mkdirp(pagesPath);
  };

  private generatePageFiles = async (): Promise<[string, BuildConfigParams['entryPaths']]> => {
    const [target, src] = await this.prepareFiles();
    await this.preparePages(src);

    return [
      target,
      await Promise.all(
        this.dsl.pageInstances.map(async ({ key }, index) => {
          const pagePath = path.resolve(src, `pages/page-${key}.tsx`);
          const entryPath = path.resolve(target, `./index-${key}.tsx`);
          await this.generatePage(index, pagePath, entryPath);
          return { pageKey: key, entryPath };
        }),
      ),
    ];
  };

  private generateHtmlFiles = (root: string, entryPaths: BuildConfigParams['entryPaths']) => {
    return Promise.all(
      entryPaths.map(async ({ pageKey }, index) => {
        const pageDistPath =
          entryPaths.length > 1 ? path.resolve(root, `./dist/${pageKey}`) : path.resolve(root, './dist/');
        await this.generateHTMLFile(index, pageDistPath);
        return pageDistPath;
      }),
    );
  };

  public run = async () => {
    const [root, entryPaths] = await this.generatePageFiles();
    await runBuild({ root, entryPaths });
    return this.generateHtmlFiles(root, entryPaths);
  };
}
