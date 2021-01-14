import os from 'os';
import assert from 'assert';
import path from 'path';
import fs from 'fs-extra';
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

async function checkExistence(route: string, onlineVersion: string) {
  const existed = await fs.pathExists(route);
  if (!existed) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const localVersion = require(path.join(route, 'package.json')).version;
  if (localVersion === onlineVersion) {
    return true;
  }
  await fs.emptyDir(route);
  return false;
}

export async function downloadBoilerplate(pkgName: string, registry = 'https://registry.npmjs.org') {
  const result = await getPackageInfo(pkgName, registry);
  const tgzUrl = result.dist.tarball;
  const saveDir = path.join(await getCLITempPath(), 'boilerplates', pkgName);
  const existed = await checkExistence(path.join(saveDir, 'package'), result.version);
  if (!existed) {
    log(`下载中：${tgzUrl}`);
    const response = await curl(tgzUrl, {
      streaming: true,
      followRedirect: true,
    });
    log(`解压到：${saveDir}`);
    await compressing.tgz.uncompress(response.res as any, saveDir);
  } else {
    log(`模板已存在，跳过下载`);
  }

  return path.join(saveDir, 'package');
}
