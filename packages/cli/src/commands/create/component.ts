import * as path from 'path';
import chalk from 'chalk';
import { camelize, downloadPackage, getLibPaths, log, logWithSpinner, stopSpinner } from '../../utils';
import { checkNameValid, ensureTargetPath, processFiles } from './utils';
import { CreateParams } from './types';

const PKG_NAME = '@vize/boilerplate-component';

export async function createComponent(name: Maybe<string>, { registry }: CreateParams) {
  const n = checkNameValid(name);
  if (!n) {
    return;
  }

  const { components } = getLibPaths();
  const targetPath = path.resolve(components, camelize(n, true));
  if (!(await ensureTargetPath(targetPath))) {
    return;
  }

  logWithSpinner('🚚', ` Downloading component boilerplate: ${chalk.yellow(PKG_NAME)}\n`);
  const templateDir = await downloadPackage(PKG_NAME, registry);
  stopSpinner();

  await processFiles(targetPath, templateDir, { name });
  log('Done', '✨');
}
