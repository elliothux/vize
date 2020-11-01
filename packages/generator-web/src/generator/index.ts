import { BaseGenerator } from './base';
import { PageMode } from '../../types';
import { MultiPageGenerator } from './multi';
import { SinglePageGenerator } from './single';

export function generate(...[params]: ConstructorParameters<typeof BaseGenerator>) {
  const generator =
    params.dsl.editInfo.pageMode === PageMode.MULTI ? new MultiPageGenerator(params) : new SinglePageGenerator(params);
  return generator.run();
}
