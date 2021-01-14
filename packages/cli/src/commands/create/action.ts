import * as path from 'path';
import chalk from 'chalk';
import { camelize, downloadBoilerplate, getLibPaths, log, logWithSpinner, stopSpinner } from '../../utils';
import { checkNameValid, ensureTargetPath, processFiles } from './utils';
import { CreateParams } from './types';

const PKG_NAME = '@vize/boilerplate-action';

export async function createAction(name: Maybe<string>, { registry }: CreateParams) {
  const n = checkNameValid(name);
  if (!n) {
    return;
  }

  const { actions } = getLibPaths(process.cwd());
  const targetPath = path.resolve(actions, camelize(n, true));
  if (!(await ensureTargetPath(targetPath))) {
    return;
  }

  logWithSpinner('🚚', ` Downloading actions boilerplate: ${chalk.yellow(PKG_NAME)}\n`);
  const templateDir = await downloadBoilerplate(PKG_NAME, registry);
  stopSpinner();

  await processFiles(targetPath, templateDir, { name });
  log('Done', '✨');
}
