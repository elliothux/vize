import * as path from 'path';
import { GeneratorParams, PageMode } from 'types';
import { BaseGenerator } from './base';
import { MultiPageGenerator } from './multi';
import { SinglePageGenerator } from './single';

export function generate({ dsl, workspacePath }: GeneratorParams): Promise<any> {
  const params: ConstructorParameters<typeof BaseGenerator>[0] = {
    dsl,
    libsPath: path.resolve(workspacePath, 'materials'),
    distPath: path.resolve(workspacePath, 'build'),
  };
  const generator =
    dsl.editInfo.pageMode === PageMode.SINGLE ? new SinglePageGenerator(params) : new MultiPageGenerator(params);
  return generator.run();
}
