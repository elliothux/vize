import { QueryParams, WithKeywords } from '../../types';
import { ResourceEntity } from './resource.entity';

export type CreateResourceParams = Omit<
  ResourceEntity,
  'id' | 'createdTime' | 'user'
>;

export type QueryResourceParams = WithKeywords<
  QueryParams<{
    type?: ResourceEntity['type'];
    extension?: ResourceEntity['extension'];
  }>
>;
