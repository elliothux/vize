import * as fs from 'fs-extra';
import path from 'path';
import tpl from 'lodash.template';
import { MaterialsPathMap } from '../types';

export async function getTpl() {
  const tplFile = await fs.readFile(path.resolve(__dirname, '../template/app.tpl'), 'utf-8');
  return tpl(tplFile);
}

export function stringifyImports(pathMap: MaterialsPathMap): string {
  return Object.entries(pathMap)
    .map(([, pathMap]) => {
      return Object.entries(pathMap)
        .map(([identity, path]) => {
          return `import ${identity} from "${path}";`;
        })
        .join('\n');
    })
    .join('\n');
}

export function stringifyMaterialsMap(pathMap: MaterialsPathMap): string {
  const vars = Object.entries(pathMap)
    .reduce((accu, [, pathMap]) => {
      Object.entries(pathMap).forEach(([identity]) => accu.push(identity));
      return accu;
    }, [])
    .join(', ');
  return `{ ${vars} }`;
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
