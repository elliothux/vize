import * as path from 'path';
import chalk from 'chalk';
import { downloadBoilerplate, log, logWithSpinner, stopSpinner } from '../../utils';
import { checkNameValid, ensureTargetPath, processFiles } from './utils';

interface CreateParams {
  name: string;
}

const PKG_NAME = '@vize/boilerplate-materials-lib';

export async function createLib(name: Maybe<string>, _params: CreateParams) {
  const n = checkNameValid(name);
  if (!n) {
    return;
  }

  const targetPath = path.resolve(process.cwd(), `materials-${n}`);
  if (!(await ensureTargetPath(targetPath))) {
    return;
  }

  logWithSpinner('🚚', ` Downloading template: ${chalk.yellow(PKG_NAME)}\n`);
  const templateDir = await downloadBoilerplate(PKG_NAME, 'https://registry.npm.taobao.org');
  stopSpinner();

  await processFiles(targetPath, templateDir, { libName: name, name });
  log('Done', '✨');
}
