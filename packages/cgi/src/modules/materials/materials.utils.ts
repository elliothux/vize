import * as path from 'path';
import * as cp from 'child_process';
import * as fs from 'fs-extra';
import * as semver from 'semver';
import * as tar from 'tar';
import { MaterialsManifest } from 'types';
import { getConfig } from 'utils';
import { ensureDir } from 'fs-extra';
import { MaterialsEntity } from './materials.entity';

export async function getLibVersions(libName: string): Promise<string[]> {
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

  return versions;
}

export async function getLibCurrentVersion(libName: string): Promise<string> {
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

export async function installLibNPMPackages(packagePath: string) {
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

export async function createLibPackageSoftLink(
  libName: string,
  packagePath: string,
) {
  const {
    paths: { materialsPath },
  } = getConfig();

  const target = path.resolve(materialsPath, libName);
  if (fs.existsSync(target)) {
    await fs.unlink(target);
  }
  return fs.symlink(packagePath, target);
}

export async function saveMaterialsPackage(
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

export async function extractMaterialsPackage(
  version: string,
  packagePath: string,
) {
  const extractTarget = path.resolve(packagePath, `../${version}`);
  await fs.ensureDir(extractTarget);
  await tar.extract({
    file: packagePath,
    cwd: extractTarget,
  });
  return extractTarget;
}

export async function getLibManifest(libName): Promise<MaterialsManifest> {
  const {
    paths: { materialsPath },
  } = getConfig();

  const target = path.resolve(
    materialsPath,
    libName,
    'dist',
    `@vize-materials-${libName}-manifest.json`,
  );
  return fs.readJSON(target);
}

export async function listLibs(): Promise<string[]> {
  const {
    paths: { materialsPath },
  } = getConfig();
  const names = await fs.readdir(materialsPath);
  return names.reduce<string[]>((accu, name) => {
    const config = path.resolve(materialsPath, name, '.vizerc');
    if (fs.existsSync(config)) {
      accu.push(name);
    }
    return accu;
  }, []);
}

export function parseLibs(libs: MaterialsEntity[]) {
  return libs.map(i => {
    i.manifest = JSON.parse(i.manifest);
    return i;
  });
}
