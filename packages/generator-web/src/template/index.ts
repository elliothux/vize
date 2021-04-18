import * as fs from 'fs-extra';
import * as path from 'path';
import tpl from 'lodash.template';

export async function getTpl(type: 'page' | 'global' | 'entry' | 'html', tplPath?: string) {
  const templatePath = type === 'html' ? tplPath! : path.resolve(__dirname, `./tpl/${type}.tpl`);
  const tplFile = await fs.readFile(templatePath, 'utf-8');
  return tpl(tplFile);
}
