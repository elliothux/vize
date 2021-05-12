import * as path from 'path';
import chalk from 'chalk';
import { downloadPackage, log, logWithSpinner, stopSpinner } from '../../utils';
import { checkNameValid, checkRuntime, ensureTargetPath, processFiles } from './utils';
import { CreateParams } from './types';

const PKG_NAME = '@vize/boilerplate-materials-lib';
const RAX_PKG_NAME = '@vize/boilerplate-materials-lib-rax';

export async function createLib(name: Maybe<string>, { registry, runtime }: CreateParams) {
  const r = checkRuntime(runtime);
  if (!r) {
    return;
  }

  const n = checkNameValid(name);
  if (!n) {
    return;
  }

  const targetPath = path.resolve(process.cwd(), `materials-${n.toLocaleLowerCase()}`);
  if (!(await ensureTargetPath(targetPath))) {
    return;
  }

  logWithSpinner('🚚', ` Downloading materials boilerplate: ${chalk.yellow(PKG_NAME)}\n`);
  const templateDir = await downloadPackage(r === 'rax' ? RAX_PKG_NAME : PKG_NAME, registry);
  stopSpinner();

  await processFiles(targetPath, templateDir, { name, runtime });
  log('Done', '✨');
}
