import { ResourceRecord } from '@vize/types';

export function getResourceURL({ url, filename }: ResourceRecord) {
  return url || `/resource/${filename}`;
}
