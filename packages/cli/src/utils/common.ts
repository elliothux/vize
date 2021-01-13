import path from 'path';
import fs from 'fs-extra';

export function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
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

export function isRunPathValid() {
  const configPath = path.resolve(process.cwd(), './.vizerc');
  return fs.pathExists(configPath);
}
