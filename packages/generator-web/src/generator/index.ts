import { GeneratorParams, PageMode } from '../types';
import { BaseGenerator } from './base';
import { MultiPageGenerator } from './multi';
import { SinglePageGenerator } from './single';

export function generate({ dsl, workspacePaths: { materialsPath, buildPath }, isPreview }: GeneratorParams) {
  const params: ConstructorParameters<typeof BaseGenerator>[0] = {
    dsl,
    libsPath: materialsPath,
    distPath: buildPath,
  };
  const generator =
    dsl.editInfo.pageMode === PageMode.SINGLE ? new SinglePageGenerator(params) : new MultiPageGenerator(params);
  return generator.run(isPreview);
}
