import { DSL } from './dsl';
import { Maybe } from './helper';

export interface GeneratorParams {
  dsl: DSL;
  workspacePath: string;
}

export interface GeneratorResult {
  path: string;
}

export type Generator = (params: GeneratorParams) => Promise<Maybe<GeneratorResult>>;
