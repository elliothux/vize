import { JsonSchemaProperties, StyleInjectSchema } from '@vize/types';
import { pxWithAuto, percent } from './style';
import { withMemo } from '../utils';

interface InjectMap {
  key: string;
  attr: string[];
  selector: string;
  format: (v: any) => string;
}

function getInjectSchema(schema: JsonSchemaProperties): InjectMap[] {
  return Object.entries(schema).reduce<InjectMap[]>((maps: InjectMap[], [key, { inject }]) => {
    if (!inject) {
      return maps;
    }
    const items: StyleInjectSchema[] = Array.isArray(inject) ? inject : [inject];
    items.forEach(({ attr, selector, formatter }) => {
      const iAttr: string[] = Array.isArray(attr) ? attr : [attr || key];
      const iSelector: string = Array.isArray(selector) ? selector.join(', ') : selector;

      let iFormat: (v: any) => string = typeof formatter === 'function' ? formatter : (i: any) => i.toString();
      if (formatter === 'px') {
        iFormat = pxWithAuto;
      } else if (formatter === 'percent') {
        iFormat = percent;
      }

      maps.push({ key, attr: iAttr, selector: iSelector, format: iFormat } as InjectMap);
    });
    return maps;
  }, []);
}

const memoGetInjectSchema = withMemo(getInjectSchema, 30);

export function formatInjectedStyles(scope: string, style: object, schema: JsonSchemaProperties): string {
  return memoGetInjectSchema(schema)
    .reduce<string[]>((accu, { key, attr, selector, format }) => {
      const v = (style as any)[key];
      if (!v) {
        return accu;
      }

      const value = format(v);
      accu.push(`\t${scope} ${selector} { ${attr.map(i => `${i}: ${value}`).join('; ')} }`);
      return accu;
    }, [])
    .join('\n');
}
