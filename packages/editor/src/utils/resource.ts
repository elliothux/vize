import { ResourceRecord } from 'sharedTypes';

export function getResourceURL({ url, filename }: ResourceRecord) {
  return url || `/resource/${filename}`;
}
