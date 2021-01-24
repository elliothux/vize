import path from 'path';
import fs from 'fs-extra';
import { error } from './logger';

export function camelize(str: string, upper = false) {
  const result = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
  if (!upper) {
    return result;
  }
  return `${result[0].toUpperCase()}${result.substring(1)}`;
}

export function cleanArgs(cmd: any) {
  const args: { [key: string]: string } = {};
  cmd.options.forEach((o: any) => {
    const key = camelize(o.long.replace(/^--/, ''));
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  return args;
}

export function ensureRunPathValid(runPath: string) {
  const configPath = path.resolve(runPath, './.vizerc');
  if (!fs.existsSync(configPath)) {
    error('this command must run in root dir of materials lib');
    process.exit();
  }
}

export function getLibVersion(runPath: string): string {
  const packagePath = path.resolve(runPath, './package.json');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(packagePath).version as string;
}
