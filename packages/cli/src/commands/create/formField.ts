import * as path from 'path';
import chalk from 'chalk';
import { camelize, downloadPackage, getLibPaths, log, logWithSpinner, stopSpinner } from '../../utils';
import { checkNameValid, ensureTargetPath, processFiles } from './utils';
import { CreateParams } from './types';
import { getLibConfig } from '../../config';

const PKG_NAME = '@vize/boilerplate-form-field';

export async function createFormField(name: Maybe<string>, { registry }: CreateParams) {
  const n = checkNameValid(name);
  if (!n) {
    return;
  }

  const paths = getLibPaths(process.cwd());
  const { formFields } = paths;
  const { libName } = getLibConfig(paths);

  const targetPath = path.resolve(formFields, camelize(n));
  if (!(await ensureTargetPath(targetPath))) {
    return;
  }

  logWithSpinner('🚚', ` Downloading form-field boilerplate: ${chalk.yellow(PKG_NAME)}\n`);
  const templateDir = await downloadPackage(PKG_NAME, registry);
  stopSpinner();

  console.log('libName: ', libName);
  await processFiles(targetPath, templateDir, { name, libName });
  log('Done', '✨');
}
