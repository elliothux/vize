import * as fs from 'fs-extra';
import * as path from 'path';
import tpl from 'lodash.template';
import { ComponentInstanceDSL } from '@vize/types';
import { mergeCommonStyle } from '@vize/runtime-web/src/libs/style';
import { MaterialsPathMap } from '../types';

export async function getContainerHTMLTpl(containerPath: string) {
  const tplFile = await fs.readFile(path.resolve(containerPath, './index.html.ejs'), 'utf-8');
  return tpl(tplFile);
}

export function stringifyUmdConstants(pathMap: MaterialsPathMap): string {
  return Object.entries(pathMap)
    .map(([, pathMap]) => {
      return Object.entries(pathMap)
        .map(([identity, { path }]) => {
          return `import ${formatIdentityVar(identity)} from "${path}";`;
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
        .map(([identity]) => {
          const formated = formatIdentityVar(identity);
          if (formated === identity) {
            return identity;
          }
          return `"${identity}": ${formated}`;
        })
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

function formatIdentityVar(identity: string) {
  return identity.split('-').join('_');
}
