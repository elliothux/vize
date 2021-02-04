import { UserEntity } from './user.entity';

export type CreateUserParams = Pick<
  UserEntity,
  'name' | 'extInfo' | 'avatar' | 'bizIds' | 'isAdmin'
>;

export type UpdateUserParams = CreateUserParams;
