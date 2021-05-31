import * as semver from 'semver';
import * as path from 'path';
import * as tar from 'tar';
import { curl, done, error, getAccessToken, getLibConfig, getLibPaths, getLibVersion, LibPaths } from '../../utils';
import { MaterialsLibConfig } from '@vize/types';
import { dist } from '../dist';

export class Releaser {
  constructor() {
    this.paths = getLibPaths();
    this.config = getLibConfig(this.paths);
  }

  private readonly paths: LibPaths;

  private readonly config: MaterialsLibConfig;

  private getURI(suffix = '') {
    return `${this.config.server}/cgi/materials/versions/${this.config.libName}${suffix}`;
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
    } = data;
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
      ['src', 'dist', './.vizerc', './package.json', './package-lock.json'],
    );
    return targetPath;
  };

  private uploadReleasePackage = async (
    version: string,
    packagePath: string,
    username: string,
    accessToken: string,
  ) => {
    const uri = this.getURI(`/${version}`);
    const { data } = await curl(uri, {
      method: 'POST',
      files: packagePath,
      data: { username, accessToken },
    });
    if (data?.code !== 0) {
      return error(data?.message || `Release failed with error code: ${data?.code}`);
    }
    return done('Relase success');
  };

  public runRelease = async () => {
    const tokenItem = await getAccessToken(this.config.server);
    if (!tokenItem) {
      return error('Not logged in. Run "vize login" and try again.');
    }

    const version = await this.checkVersionValid();
    if (!version) {
      return error(`Materials version already exists.`);
    }

    await dist();
    const [, username, token] = tokenItem;
    const packagePath: string = await this.createReleasePackage(version);
    return this.uploadReleasePackage(version, packagePath, username, token);
  };
}
