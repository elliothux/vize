import * as path from 'path';
import chalk from 'chalk';
import { camelize, downloadPackage, getLibConfig, getLibPaths, log, logWithSpinner, stopSpinner } from '../../utils';
import { checkNameValid, ensureTargetPath, processFiles } from './utils';
import { CreateParams } from './types';

const PKG_NAME = '@vize/boilerplate-component';
const RAX_PKG_NAME = '@vize/boilerplate-component-rax';

export async function createComponent(name: Maybe<string>, { registry }: CreateParams) {
  const n = checkNameValid(name);
  if (!n) {
    return;
  }

  const paths = getLibPaths();
  const { components } = paths;
  const { runtime } = getLibConfig(paths);

  const targetPath = path.resolve(components, camelize(n, true));
  if (!(await ensureTargetPath(targetPath))) {
    return;
  }

  const pkg = runtime === 'rax' ? RAX_PKG_NAME : PKG_NAME;
  logWithSpinner('🚚', ` Downloading component boilerplate: ${chalk.yellow(pkg)}\n`);
  const templateDir = await downloadPackage(pkg, registry);
  stopSpinner();

  await processFiles(targetPath, templateDir, { name });
  log('Done', '✨');
}
