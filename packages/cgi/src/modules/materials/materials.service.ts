import * as fs from 'fs-extra';
import * as path from 'path';
import * as cp from 'child_process';
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

  static async extractMaterialsPackage(version: string, packagePath: string) {
    const extractTarget = path.resolve(packagePath, `../${version}`);
    await fs.ensureDir(extractTarget);
    await tar.extract({
      file: packagePath,
      cwd: extractTarget,
    });
    return extractTarget;
  }

  static async installNPMPackages(packagePath: string) {
    const { npmRegistry } = getConfig();
    const command = `npm install --prefix ${packagePath} ${
      npmRegistry ? `--registry ${npmRegistry}` : ''
    }`;

    return new Promise(resolve => {
      const process = cp.exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });

      process.on('close', resolve);
      process.on('exit', resolve);
      process.on('disconnect', resolve);
    });
  }

  static async createPackageSoftLink(libName: string, packagePath: string) {
    const {
      paths: { materialsPath },
    } = getConfig();

    const target = path.resolve(materialsPath, libName);
    if (fs.existsSync(target)) {
      await fs.unlink(target);
    }
    return fs.symlink(packagePath, target);
  }
}
