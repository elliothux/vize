import * as path from 'path';
import * as fs from 'fs-extra';
import open from 'open';
import { Stats } from 'webpack';
import { JSDOM } from 'jsdom';
import {
  MaterialsMeta,
  MaterialsManifest,
  MaterialsComponentManifestItem,
  MaterialsPluginManifestItem,
  MaterialsActionManifestItem,
  MaterialsContainerManifestItem,
  MaterialsLibConfig,
} from '@vize/types';
import {
  downloadPackage,
  error,
  getCLITempPath,
  getPackageLocalPath,
  LibPaths,
  logWithSpinner,
  stopSpinner,
} from '../utils';

export function findThumb(entry: string) {
  const svg = path.join(entry, './thumb.svg');
  if (fs.existsSync(svg)) return svg;

  const png = path.join(entry, './thumb.png');
  if (fs.existsSync(png)) return png;

  const jpg = path.join(entry, './thumb.jpg');
  if (fs.existsSync(jpg)) return jpg;

  const jpeg = path.join(entry, './thumb.jpeg');
  if (fs.existsSync(jpeg)) return jpeg;

  return undefined;
}

export function findPreview(entry: string) {
  const png = path.join(entry, './preview.png');
  if (fs.existsSync(png)) return png;

  const jpg = path.join(entry, './preview.jpg');
  if (fs.existsSync(jpg)) return jpg;

  const jpeg = path.join(entry, './preview.jpeg');
  if (fs.existsSync(jpeg)) return jpeg;

  return undefined;
}

export function webpackCallback(resolve: Function, reject: Function) {
  return (err: Error, stats: Stats) => {
    if (err) {
      error('fatal webpack errors:', (err.stack.toString() || err.toString()).trim());
      if ((err as any).details) {
        error('fatal webpack errors:', (err as any).details.trim());
      }
      reject();
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
      info.errors.forEach((e: string) => {
        if (e.trim()) {
          error('\n\nWebpack compilation errors:', e.trim());
        }
      });
      return reject();
    }
    return resolve();
  };
}

const TEMP_CLEAR_IGNORE = ['editor'];

export async function clearTemp(libPaths: LibPaths) {
  logWithSpinner('💭', '清除缓存');

  const { temp, dist } = libPaths;
  if (!(await fs.existsSync(temp))) {
    await fs.mkdir(temp);
  }

  const files = await fs.readdir(temp);
  await Promise.all([
    ...files.map(file => {
      if (TEMP_CLEAR_IGNORE.includes(file)) {
        return Promise.resolve();
      }
      return fs.remove(path.join(temp, file));
    }),
    fs.emptyDir(dist),
  ]);

  stopSpinner();
}

const EDITOR_PKG_NAME = '@vize/editor';

export async function prepareEditor(local: boolean, registry?: string): Promise<string> {
  if (local) {
    const localPath = getPackageLocalPath(EDITOR_PKG_NAME);
    if (localPath) {
      return localPath;
    }
    throw 'Cannot find a local version of editor';
  }

  const packagePath = await downloadPackage(EDITOR_PKG_NAME, registry);
  const filesPath = path.resolve(packagePath, 'build');
  const tempPath = await getCLITempPath();

  const staticPath = path.resolve(tempPath, 'static');
  const target = path.resolve(staticPath, 'editor');
  if (fs.existsSync(target)) {
    await fs.unlink(target);
  }
  await fs.ensureDir(staticPath);
  await fs.symlink(filesPath, target);

  return staticPath;
}

interface OpenParams {
  debugPorts: string;
  libs: string;
  container: string;
}

export function openEditor({ debugPorts, libs, container }: OpenParams) {
  const url = `http://127.0.0.1:${debugPorts}/editor/index.html?debugPorts=${debugPorts}&libs=${libs}&key=vize_debug_page&container=${container}`;
  console.log('url: ', url);
  open(url);
}

export async function generateMaterialsManifest(libConfig: MaterialsLibConfig, libPaths: LibPaths) {
  const { libName } = libConfig;
  const { components, plugins, actions, containers } = await getMaterialsMeta(libName, libPaths.dist);
  const meta: MaterialsManifest = {
    components: generateComponentsManifest(components, libPaths),
    plugins: generatePluginManifest(plugins, libPaths),
    actions: generateActionManifest(actions),
    containers: generateContainerManifest(containers),
    lib: libConfig,
  };

  const outputPath = path.resolve(libPaths.dist, `./@vize-materials-${libName}-manifest.json`);
  await fs.writeFile(outputPath, JSON.stringify(meta, undefined, 2));
  return outputPath;
}

function generateComponentsManifest(components: MaterialsMeta['components'], libPaths: LibPaths) {
  return Object.entries(components).reduce<{ [name: string]: MaterialsComponentManifestItem }>(
    (accu, [name, { info, dataForm, styleForm }]) => {
      const entry = path.resolve(libPaths.components, name);
      const thumb = findThumb(entry);
      const preview = findPreview(entry);
      accu[name] = <MaterialsComponentManifestItem>{
        info,
        dataForm: typeof dataForm === 'object' ? dataForm : undefined,
        styleForm: typeof styleForm === 'object' ? styleForm : undefined,
        thumb: thumb ? path.extname(thumb) : undefined,
        preview: preview ? path.extname(preview) : undefined,
      };
      return accu;
    },
    {},
  );
}

function generatePluginManifest(plugins: MaterialsMeta['plugins'], libPaths: LibPaths) {
  return Object.entries(plugins).reduce<{ [name: string]: MaterialsPluginManifestItem }>(
    (accu, [name, { info, dataForm }]) => {
      const entry = path.resolve(libPaths.plugins, name);
      const thumb = findThumb(entry);
      const preview = findPreview(entry);
      accu[name] = <MaterialsPluginManifestItem>{
        info,
        dataForm: typeof dataForm === 'object' ? dataForm : undefined,
        thumb: thumb ? path.extname(thumb) : undefined,
        preview: preview ? path.extname(preview) : undefined,
      };
      return accu;
    },
    {},
  );
}

function generateActionManifest(actions: MaterialsMeta['actions']) {
  return Object.entries(actions).reduce<{ [name: string]: MaterialsActionManifestItem }>(
    (accu, [name, { info, dataForm }]) => {
      accu[name] = {
        info,
        dataForm: typeof dataForm === 'object' ? dataForm : undefined,
      };
      return accu;
    },
    {},
  );
}

function generateContainerManifest(containers: MaterialsMeta['containers']) {
  return Object.entries(containers).reduce<{ [name: string]: MaterialsContainerManifestItem }>(
    (accu, [name, { info, dataForm, styleForm }]) => {
      accu[name] = <MaterialsContainerManifestItem>{
        info,
        dataForm: typeof dataForm === 'object' ? dataForm : undefined,
        styleForm: typeof styleForm === 'object' ? styleForm : undefined,
      };
      return accu;
    },
    {},
  );
}

export async function getMaterialsMeta(libName: string, distPath: string): Promise<MaterialsMeta> {
  const name = `@vize-materials-${libName}-meta`;
  const script = await fs.readFile(path.resolve(distPath, `${name}.js`), { encoding: 'utf8' });
  const html = `<body><script>${script}</script></body>`;
  const { window } = new JSDOM(html, {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    url: 'https://vize.com/',
    contentType: 'text/html',
  });
  return window[name].default as MaterialsMeta;
}
