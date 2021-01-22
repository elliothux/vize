import * as path from 'path';
import chalk from 'chalk';
import { camelize, downloadPackage, getLibPaths, log, logWithSpinner, stopSpinner } from '../../utils';
import { checkNameValid, ensureTargetPath, processFiles } from './utils';
import { CreateParams } from './types';

const PKG_NAME = '@vize/boilerplate-plugin';

export async function createPlugin(name: Maybe<string>, { registry }: CreateParams) {
  const n = checkNameValid(name);
  if (!n) {
    return;
  }

  const { plugins } = getLibPaths(process.cwd());
  const targetPath = path.resolve(plugins, camelize(n, true));
  if (!(await ensureTargetPath(targetPath))) {
    return;
  }

  logWithSpinner('🚚', ` Downloading plugins boilerplate: ${chalk.yellow(PKG_NAME)}\n`);
  const templateDir = await downloadPackage(PKG_NAME, registry);
  stopSpinner();

  await processFiles(targetPath, templateDir, { name });
  log('Done', '✨');
}
