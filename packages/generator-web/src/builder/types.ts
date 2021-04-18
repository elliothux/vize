import { DSL, WorkspacePaths } from '@vize/types';
import { GeneratorPaths } from '../types';

export interface BuildConfigParams {
  entries: string[];
  dsl: DSL;
  workspacePaths: WorkspacePaths;
  generatorPaths: GeneratorPaths;
  useSWC?: boolean;
  isProd?: boolean;
}
