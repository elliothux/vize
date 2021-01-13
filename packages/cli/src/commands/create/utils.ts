import * as fs from 'fs-extra';
import { error, log } from '../../utils';
import path from 'path';
import * as glob from 'glob';
import chalk from 'chalk';
import { isText } from 'istextorbinary';
import * as inquirer from 'inquirer';

export function checkNameValid(name: Maybe<string>): string | void {
  if (!name) {
    return error('Missing required params "name". Try again with "vize create-lib <name>".');
  }

  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    return error('Invalid params "name", make sure your name match with /[a-zA-Z0-9]/');
  }

  return name;
}

export async function ensureTargetPath(target: string): Promise<boolean> {
  if (await fs.pathExists(target)) {
    error(`Path "${target}" exists.`);
    return false;
  }

  await fs.mkdir(target);
  return true;
}

export interface BoilerplateQuestions {
  [key: string]: {
    desc: string;
    required?: boolean;
    default?: string;
  };
}

export async function processFiles(targetDir: string, templateDir: string, appendParams?: { [key: string]: string }) {
  const templateSrc = path.join(templateDir, 'boilerplate');
  const answers = await askTemplateQuestions<{
    desc: string;
    author: string;
  }>(templateDir);
  const templateData = { ...answers, ...appendParams };

  const files = glob.sync('**/*.*', { cwd: templateSrc, dot: true });
  files.forEach((fileName: string) => {
    const from = path.join(templateSrc, fileName);
    const to = formatTargetPath(replaceTemplate(path.join(targetDir, fileName), templateData));
    fs.ensureDirSync(path.dirname(to));
    log(`write template file from "${chalk.green(from)}" to "${chalk.green(to)}"`);

    console.log(isText(from), /^\..+rc$/.test(path.basename(from)));
    if (isText(from) || /^\..+rc$/.test(path.basename(to))) {
      const content = fs.readFileSync(from, { encoding: 'utf-8' });
      const result = replaceTemplate(content, templateData);
      fs.writeFileSync(to, result);
    } else {
      fs.copyFileSync(from, to);
    }
  });
  return files;
}

async function askTemplateQuestions<T = object>(templateDir: string): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const questions = require(templateDir) as BoilerplateQuestions;
  return inquirer.prompt(
    Object.entries(questions).map(([key, question]) => ({
      type: 'input',
      name: key,
      message: question.desc,
      default: question.default,
    })),
  );
}

function replaceTemplate(content: string, vars: { [key: string]: string }) {
  return content.replace(/(\\)?{{ *(\w+) *}}/g, (block, skip, key) => {
    if (skip) {
      return block.substring(skip.length);
    }
    return vars.hasOwnProperty(key) ? vars[key] : block;
  });
}

function formatTargetPath(filePath: string): string {
  const fileName = path.basename(filePath);
  if (!/^_\./.test(fileName)) {
    return filePath;
  }

  return path.resolve(path.dirname(filePath), fileName.replace('_', ''));
}
