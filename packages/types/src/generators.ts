import { DSL } from './dsl';
import { Maybe } from './helper';
import { MaterialsInfo } from './materials';

export interface GeneratorParams {
  dsl: DSL;
  workspacePath: string;
  isPreview: boolean;
}

export interface GeneratorResult {
  type: 'url' | 'file';
  path: string;
  url?: string;
}

export type GeneratorFunction = (params: GeneratorParams) => Promise<Maybe<GeneratorResult>>;

export type GeneratorInfo = MaterialsInfo;

export interface Generator {
  info: GeneratorInfo;
  generator: GeneratorFunction;
}
