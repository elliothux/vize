import * as fs from 'fs-extra';
import * as path from 'path';
import tpl from 'lodash.template';
import { PageDSL } from 'types';

interface InitParams {
  dsl: PageDSL;
  libPaths: WebPageGenerator['libPaths'];
  targetPath: string;
}

export class WebPageGenerator {
  constructor({ dsl, libPaths, targetPath }: InitParams) {
    this.dsl = dsl;
    this.libPaths = libPaths;
    this.targetPath = targetPath;
  }

  private readonly dsl: PageDSL;

  private readonly libPaths: { [lib: string]: string };

  private readonly targetPath: string;

  private getTpl = () => {
    const tplFile = await fs.readFile(path.resolve(__dirname, './app.tpl'), 'utf-8');
    return tpl(tplFile);
  };
}
