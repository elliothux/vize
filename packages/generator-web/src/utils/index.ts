import * as fs from 'fs-extra';
import path from 'path';
import tpl from 'lodash.template';
import { mergeCommonStyle } from '@vize/runtime-web/src/libs/style';
import { ComponentInstanceDSL, MaterialsPathMap } from '../types';

export async function prepareTargetFolder(distWorkspacePath: string, pageKey: string): Promise<[string, string]> {
  if (!fs.existsSync(distWorkspacePath)) {
    await fs.mkdir(distWorkspacePath);
  }

  const p = path.resolve(distWorkspacePath, pageKey);
  if (fs.existsSync(p)) {
    fs.rmdirSync(p, { recursive: true });
  }
  await fs.mkdirp(p);

  const src = path.resolve(p, './src');
  await fs.mkdirp(src);

  return [p, src];
}

const copyIgnoreFiles = ['config.ts', 'config.js', 'config.json', 'index.html.ejs'];
export async function copyContainerTemplate(containerPath: string, targetPath: string) {
  const files = await fs.readdir(containerPath);
  await Promise.all(
    files.map(fileName => {
      if (copyIgnoreFiles.includes(fileName)) {
        return Promise.resolve();
      }
      const fromFilePath = path.resolve(containerPath, fileName);
      const targetFilePath = path.resolve(targetPath, fileName);
      console.log(`Copying ${fromFilePath}  to ${targetFilePath}`);
      return fs.copy(fromFilePath, targetFilePath);
    }),
  );
}

export async function getTpl(name: 'page' | 'multi-index' | 'single-index' | 'global') {
  const tplFile = await fs.readFile(path.resolve(__dirname, `../template/${name}.tpl`), 'utf-8');
  return tpl(tplFile);
}

export async function getContainerHTMLTpl(containerPath: string) {
  const tplFile = await fs.readFile(path.resolve(containerPath, './index.html.ejs'), 'utf-8');
  return tpl(tplFile);
}

export function stringifyUmdConstants(pathMap: MaterialsPathMap): string {
  return Object.entries(pathMap)
    .map(([, pathMap]) => {
      return Object.entries(pathMap)
        .map(([identity, { path, name }]) => {
          // return `const ${identity} = window["${name}"]`;
          return `import ${identity} from "${path}";`;
        })
        .join('\n');
    })
    .join('\n');
}

export function stringifyComponentInstances(componentInstances: ComponentInstanceDSL[]): string {
  return JSON.stringify(componentInstances.map(formatComponentInstanceDSL));
}

export function formatComponentInstanceDSL(component: ComponentInstanceDSL): ComponentInstanceDSL {
  return {
    ...component,
    commonStyle: mergeCommonStyle(component.commonStyle),
    children: component.children ? component.children.map(formatComponentInstanceDSL) : undefined,
  };
}

export function stringifyMaterialVars(pathMap: MaterialsPathMap): string {
  return Object.entries(pathMap)
    .map(([, pathMap]) => {
      return Object.entries(pathMap)
        .map(([identity]) => identity)
        .join(', ');
    })
    .join('\n');
}

export function formatGlobalStyle(style: object): string {
  const result = Object.entries(style)
    .reduce((styles, [propName, propValue]) => {
      styles.push(`${humpToMiddleLine(propName)}: ${propValue} !important;`);
      return styles;
    }, [])
    .join('\n');
  return `body {\n\t${result}\n}`;
}

const hyphenateRE = /\B([A-Z])/g;
function humpToMiddleLine(str: string): string {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}
