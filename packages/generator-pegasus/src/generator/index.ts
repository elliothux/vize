import * as path from 'path';
import { GeneratorParams, PageMode } from '@vize/types';
import { BaseGenerator } from './base';
import { SinglePageGenerator } from './single';

export function generate({ dsl, workspacePath }: GeneratorParams): Promise<any> {
  const params: ConstructorParameters<typeof BaseGenerator>[0] = {
    dsl,
    libsPath: path.resolve(workspacePath, 'materials'),
    distPath: path.resolve(workspacePath, 'build'),
  };

  if (dsl.editInfo.pageMode === PageMode.MULTI) {
    throw new Error('Multi page mode are node supported by pegasus');
  }

  const generator = new SinglePageGenerator(params);
  return generator.run();
}
