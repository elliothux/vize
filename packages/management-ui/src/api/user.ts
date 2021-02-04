import { UserRecord } from 'types';
import { getCGIJSON, postCGIJSON, prefix } from './utils';

export function queryUser() {
  return getCGIJSON<UserRecord[]>(prefix('user'));
}

export type CreateUserParams = Pick<UserRecord, 'bizs' | 'name' | 'extInfo' | 'isAdmin'>;

export function createUser(user: CreateUserParams) {
  return postCGIJSON(prefix('user'), user);
}

export type UpdateUserParams = CreateUserParams;

export function updateUser(id: number, user: UpdateUserParams) {
  return postCGIJSON(prefix(`user/${id}`), user);
}
