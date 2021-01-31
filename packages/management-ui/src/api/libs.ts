import { GeneratorInfo } from 'types';
import { MaterialsRecord } from '../types';
import { getCGIJSON, ParsedCGIResponse, postCGIJSON, prefix } from './utils';

export function queryLibs(): Promise<ParsedCGIResponse<MaterialsRecord[]>> {
  return getCGIJSON<MaterialsRecord[]>(prefix('materials'));
}

export function getLibById(id: number | string): Promise<ParsedCGIResponse<MaterialsRecord>> {
  return getCGIJSON<MaterialsRecord>(prefix(`materials/${id}`));
}

export function syncLibManifest(libName: string) {
  return postCGIJSON(prefix(`materials/sync/${libName}`), {});
}

export interface GeneratorCGIInfo extends GeneratorInfo {
  key: string;
}

export function getGenerators(): Promise<ParsedCGIResponse<GeneratorCGIInfo[]>> {
  return getCGIJSON(prefix('materials/generators/all'));
}
