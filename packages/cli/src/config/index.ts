import * as fs from 'fs';
import { LibPaths } from '../utils';

export enum LibConfigRuntime {
    REACT = 'react',
    RAX = 'rax',
}

export interface LibConfig {
    libName: string;
    author?: string;
    runtime: LibConfigRuntime;
}

export function getLibConfig({ config: configPath }: LibPaths): LibConfig {
    if (!fs.existsSync(configPath)) {
        throw `no config file "${configPath}"`;
    }

    const { libName, author, runtime } = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as Partial<LibConfig>;

    if (typeof libName !== 'string') {
        throw `invalid libName: ${libName} in "${configPath}"`;
    }

    if (!Object.values(LibConfigRuntime).includes(runtime)) {
        throw `invalid runtime: ${runtime} in "${configPath}"`;
    }

    return { libName, runtime, author };
}
