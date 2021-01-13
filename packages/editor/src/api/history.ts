import { DSL } from 'types';
import { postCGIJSON, prefix } from './utils';

export function savePageHistory(dsl: DSL) {
  return postCGIJSON<{}>(prefix('history'), dsl);
}
