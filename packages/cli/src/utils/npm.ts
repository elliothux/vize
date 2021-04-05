import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import assert from 'assert';
import compressing from 'compressing';
import { log } from './logger';
import { curl } from './request';

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
  main: string;
  dist: {
    shasum: string;
    size: number;
    key: string;
    tarball: string;
  };
  config: { [key: string]: { name: string; from: PackageInfo } };
}

export async function getCLITempPath() {
  const TEMP_PATH = path.resolve(os.homedir(), '.vize-cli-temp');
  if (!(await fs.pathExists(TEMP_PATH))) {
    await fs.mkdir(TEMP_PATH);
  }
  return TEMP_PATH;
}

export async function getPackageInfo(pkgName: string, registry: string): Promise<PackageInfo> {
  log(`fetching npm info of ${pkgName}`);
  const result = await curl(`${registry}/${pkgName}`, {
    dataType: 'json',
    followRedirect: true,
  });
  log(`Download result: ${result.status}`);
  assert(result.status === 200, `npm info ${pkgName} got error: ${result.status}, ${result.data.reason}`);
  const latestVersion = result.data['dist-tags'].latest;

  return result.data.versions[latestVersion] as PackageInfo;
}

async function checkExistence(packagePath: string, onlineVersion: string) {
  const existed = await fs.pathExists(packagePath);
  if (!existed) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const localVersion = require(path.join(packagePath, 'package', 'package.json')).version;
  if (localVersion === onlineVersion) {
    return true;
  }
  await fs.emptyDir(packagePath);
  return false;
}

export async function downloadPackage(pkgName: string, registry = 'https://registry.npmjs.org') {
  const {
    dist: { tarball: tgzUrl },
    version,
  } = await getPackageInfo(pkgName, registry);
  const saveDir = path.join(await getCLITempPath(), 'packages', pkgName);
  const existed = await checkExistence(saveDir, version);

  if (!existed) {
    log(`下载中：${tgzUrl}`);
    const response = await curl(tgzUrl, {
      streaming: true,
      followRedirect: true,
    });
    log(`解压到：${saveDir}`);
    await compressing.tgz.uncompress(response.res as any, saveDir);
  } else {
    log(`Package 已存在，跳过下载`);
  }

  return path.join(saveDir, 'package');
}

export async function getPackageLocalPath(pkgName: string): Promise<Maybe<string>> {
  const packagePath = path.join(await getCLITempPath(), 'packages', pkgName);
  return (await fs.pathExists(packagePath)) ? packagePath : null;
}
