import * as path from 'path';
import chalk from 'chalk';
import { downloadBoilerplate, log, logWithSpinner, stopSpinner } from '../../utils';
import { checkNameValid, ensureTargetPath, processFiles } from './utils';
import { CreateParams } from './types';

const PKG_NAME = '@vize/boilerplate-materials-lib';

export async function createLib(name: Maybe<string>, { registry }: CreateParams) {
  const n = checkNameValid(name);
  if (!n) {
    return;
  }

  const targetPath = path.resolve(process.cwd(), `materials-${n.toLocaleLowerCase()}`);
  if (!(await ensureTargetPath(targetPath))) {
    return;
  }

  logWithSpinner('🚚', ` Downloading materials boilerplate: ${chalk.yellow(PKG_NAME)}\n`);
  const templateDir = await downloadBoilerplate(PKG_NAME, registry);
  stopSpinner();

  await processFiles(targetPath, templateDir, { libName: name, name });
  log('Done', '✨');
}
