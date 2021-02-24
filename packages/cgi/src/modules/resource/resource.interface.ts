import { ResourceEntity } from './resource.entity';

export type CreateResourceParams = Omit<
  ResourceEntity,
  'id' | 'createdTime' | 'user'
>;
