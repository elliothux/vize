import { MaterialsRecord } from '../types';
import { getCGIJSON, ParsedCGIResponse, postCGIJSON, prefix } from './utils';

export function queryLibs(): Promise<ParsedCGIResponse<MaterialsRecord[]>> {
  return getCGIJSON<MaterialsRecord[]>(prefix('materials'));
}

export function syncLibManifest(libName: string) {
  return postCGIJSON(prefix(`materials/sync/${libName}`), {});
}
