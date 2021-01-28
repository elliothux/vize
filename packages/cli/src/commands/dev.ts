import * as path from 'path';
import * as fs from 'fs-extra';
import inquirer from 'inquirer';
import { getLibPaths, getLibConfig } from '../utils';
import { Builder } from '../builder';

interface DevOptions {
  port?: string;
  open?: string;
  registry?: string;
}

export async function dev({ port, open, registry }: DevOptions) {
  const root = process.cwd();
  const containerName = await chooseContainer(root);
  const paths = getLibPaths(root, containerName);
  const config = getLibConfig(paths);

  const builder = new Builder({
    libPaths: paths,
    libConfig: config,
    idProd: false,
    open: open !== 'false',
    port: port ? parseInt(port, 10) : undefined,
    registry,
  });
  return builder.dev();
}

async function chooseContainer(root: string): Promise<string> {
  const names = await getContainerNames(root);

  if (names.length === 0) {
    throw new Error('Container not exists');
  }

  if (names.length === 1) {
    return names[0];
  } else {
    const { container } = await inquirer.prompt([
      {
        type: 'list',
        name: 'container',
        message: '选择页面容器',
        default: names[0],
        choices: names,
      },
    ]);
    return container;
  }
}

async function getContainerNames(root: string): Promise<string[]> {
  const containersPath = path.resolve(root, './src/containers');
  const names = await fs.readdir(containersPath);
  const filterResult: boolean[] = await Promise.all(
    names.map(async name => {
      const stat = await fs.stat(path.resolve(containersPath, name));
      return stat.isDirectory();
    }),
  );
  return names.filter((name, index) => filterResult[index]);
}
