import { QueryParams } from '../../types';
import { ResourceEntity } from './resource.entity';

export type CreateResourceParams = Omit<
  ResourceEntity,
  'id' | 'createdTime' | 'user'
>;

export type QueryResourceParams = QueryParams<{ type: ResourceEntity['type'] }>;
