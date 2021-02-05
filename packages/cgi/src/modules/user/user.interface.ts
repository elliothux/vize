import { UserEntity } from './user.entity';

export type CreateUserParams = Pick<
  UserEntity,
  'name' | 'extInfo' | 'avatar' | 'bizs' | 'isAdmin'
>;

export type UpdateUserParams = CreateUserParams;

// export interface LoginParams =
