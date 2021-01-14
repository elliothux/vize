import path from 'path';
import fs from 'fs-extra';

export function camelize(str: string, upper = false) {
  const result = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
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

export function isRunPathValid(runPath: string) {
  const configPath = path.resolve(runPath, './.vizerc');
  return fs.existsSync(configPath);
}
