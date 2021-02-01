import * as path from 'path';
import { GeneratorParams, PageMode } from '../types';
import { BaseGenerator } from './base';
import { SinglePageGenerator } from './single';

export function generate(generatorParams: GeneratorParams) {
  const { dsl, workspacePath, isPreview } = generatorParams;
  if (isPreview) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const WebGenerator = require('../../../../generator-web').default;
    return WebGenerator.generator(generatorParams);
  }

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
