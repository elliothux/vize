import { BaseGenerator } from './base';
import { PageMode } from '../../types';
import { MultiPageGenerator } from './multi';
import { SinglePageGenerator } from './single';

export function generate(...[params]: ConstructorParameters<typeof BaseGenerator>): Promise<any> {
  const generator =
    params.dsl.editInfo.pageMode === PageMode.SINGLE ? new SinglePageGenerator(params) : new MultiPageGenerator(params);
  return generator.run();
}
