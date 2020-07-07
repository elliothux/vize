import * as path from 'path';
import * as fs from 'fs-extra';
import inquirer from 'inquirer';
import { getLibPaths } from '../utils';
import { getLibConfig } from '../config';
import { Builder } from '../builder';

export async function dev(options: object) {
    const root = process.cwd();
    const containerName = await chooseContainer(root);
    const paths = getLibPaths(root, containerName);
    const config = getLibConfig(paths);

    const builder = new Builder(paths, config, false);
    builder.dev();
}

export async function dist(options: object) {
    const root = process.cwd();
    const paths = getLibPaths(root);
    const config = getLibConfig(paths);

    const builder = new Builder(paths, config, true);
    return builder.dist();
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
