import * as path from 'path';
import * as tar from 'tar';
import * as semver from 'semver';
import { MaterialsLibConfig } from '@vize/types';
import { dist } from '../dist';
import { curl, error, getLibPaths, getLibVersion, getLibConfig, LibPaths } from '../../utils';

export function release() {
  const releaser = new Releaser();
  return releaser.runRelease();
}

class Releaser {
  constructor() {
    this.paths = getLibPaths();
    this.config = getLibConfig(this.paths);
  }

  private readonly paths: LibPaths;

  private readonly config: MaterialsLibConfig;

  private getURI(suffix = '') {
    return `${this.config.releaseTo}/cgi/materials/versions/${this.config.libName}${suffix}`;
  }

  private checkVersionValid = async (): Promise<Maybe<string>> => {
    const currentVersion = getLibVersion(this.paths.root);
    const uri = this.getURI();
    let data;
    try {
      const result = await curl(uri, {
        method: 'GET',
        timeout: 10 * 1000,
        contentType: 'application/json',
      });
      data = result.data;
    } catch (e) {
      console.error(e);
      throw new Error('Get versions failed');
    }

    const {
      code,
      data: { current: onlineVersion },
    } = JSON.parse(data);
    if (code !== 0) {
      throw new Error(`Request "${uri}" error: code = ${code}`);
    }

    if (!onlineVersion) {
      return currentVersion;
    }

    return semver.gt(currentVersion, onlineVersion) ? currentVersion : null;
  };

  private createReleasePackage = async (version: string) => {
    const targetPath = path.resolve(this.paths.temp, `${this.config.libName}_${version}.tgz`);

    await tar.c(
      {
        gzip: true,
        file: targetPath,
        preservePaths: false,
      },
      ['src', 'dist', './.vizerc', './package.json'],
    );
    return targetPath;
  };

  private uploadReleasePackage = async (version: string, packagePath: string) => {
    const uri = this.getURI(`/${version}`);
    const { data } = await curl(uri, {
      method: 'POST',
      files: packagePath,
    });
    console.log(data.toString());
  };

  public runRelease = async () => {
    const version = await this.checkVersionValid();
    if (!version) {
      return error(`Materials version already exists.`);
    }

    await dist();
    const packagePath: string = await this.createReleasePackage(version);
    await this.uploadReleasePackage(version, packagePath);
  };
}
