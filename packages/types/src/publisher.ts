import { Maybe } from './helper';
import { MaterialsInfo } from './materials';
import { GeneratorResult } from './generators';
import { DSL } from './dsl';

export interface PublisherParams {
  dsl: DSL;
  workspacePath: string;
  generatorResult: GeneratorResult;
}

export interface PublisherResult {
  type: 'url' | 'file';
  path?: string;
  url?: string;
}

export type PublisherFunction = (params: PublisherParams) => Promise<Maybe<PublisherResult>>;

export type PublisherInfo = MaterialsInfo;

export interface Publisher {
  info: PublisherInfo;
  publisher: PublisherFunction;
}
