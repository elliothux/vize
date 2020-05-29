import * as fs from 'fs';
import { LibPaths } from '../utils';

export interface LibConfig {
    libName: string;
}

export function getLibConfig({ config: configPath }: LibPaths): LibConfig {
    if (!fs.existsSync(configPath)) {
        throw 'no config';
    }

    const { libName } = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as Partial<LibConfig>;

    return { libName: libName! };
}
