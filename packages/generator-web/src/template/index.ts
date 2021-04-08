import * as fs from 'fs-extra';
import * as path from 'path';
import tpl from 'lodash.template';

export async function getTpl(name: 'page' | 'global' | 'singleEntry') {
  const tplFile = await fs.readFile(path.resolve(__dirname, `./${name}.tpl`), 'utf-8');
  return tpl(tplFile);
}
