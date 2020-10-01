import { DSL } from 'types';
import { prefix } from './utils';

export function savePage(dsl: DSL) {
  return fetch(prefix('page'), {
    method: 'POST',
    body: JSON.stringify(dsl),
    headers: {
      'content-type': 'application/json',
    },
  });
}
