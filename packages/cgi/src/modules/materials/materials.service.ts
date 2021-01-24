import * as fs from 'fs-extra';
import * as path from 'path';
import * as semver from 'semver';
import * as tar from 'tar';
import { Injectable } from '@nestjs/common';
import { getConfig } from 'utils';
import { Maybe } from 'types';
import { ensureDir } from 'fs-extra';

@Injectable()
export class MaterialsService {
  public async listVersions(libName: string) {
    const {
      paths: { materialsVersionsPath },
    } = getConfig()!;
    const libPath = path.resolve(materialsVersionsPath, libName);

    let versions = [];
    if (fs.existsSync(libPath)) {
      versions = (await fs.readdir(libPath))
        .map(i => semver.valid(i))
        .filter(i => !!i);
    }

    return {
      current: await MaterialsService.getCurrentVersion(libName),
      versions: versions,
    };
  }

  static async getCurrentVersion(libName: string): Promise<Maybe<string>> {
    const {
      paths: { materialsPath },
    } = getConfig()!;
    const packageJsonPath = path.resolve(
      materialsPath,
      libName,
      './package.json',
    );

    if (!fs.existsSync(packageJsonPath)) {
      return null;
    }

    return (await fs.readJSON(packageJsonPath, { encoding: 'utf-8' })).version;
  }

  static async saveMaterialsPackage(
    libName: string,
    version: string,
    buffer: Buffer,
  ) {
    const {
      paths: { materialsVersionsPath },
    } = getConfig();
    const targetFolder = path.resolve(materialsVersionsPath, libName);
    await ensureDir(targetFolder);

    const targetPath = path.resolve(targetFolder, `${version}.tgz`);
    await fs.writeFile(targetPath, buffer);
    return targetPath;
  }

  static async extractMaterialsPackage(packagePath: string) {
    await tar.extract({
      file: packagePath,
      cwd: path.resolve(packagePath, './'),
    });
  }
}
