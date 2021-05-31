import { UserEntity } from './user.entity';

export type CreateUserParams = Pick<
  UserEntity,
  'name' | 'extInfo' | 'bizs' | 'isAdmin' | 'isDeveloper'
>;

export type UpdateUserParams = CreateUserParams;
