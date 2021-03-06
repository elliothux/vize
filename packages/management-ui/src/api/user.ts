import { UserRecord, Maybe } from 'types';
import { getCGIJSON, ParsedCGIResponse, postCGIJSON, prefix } from './utils';

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

let user: Maybe<ParsedCGIResponse<UserRecord>> = null;
let getUserPromise: Maybe<Promise<ParsedCGIResponse<UserRecord>>> = null;

export async function getCurrentUser() {
  if (user) {
    return user;
  }

  if (getUserPromise) {
    return await getUserPromise;
  }

  getUserPromise = getCGIJSON<UserRecord>(prefix('user/my'));
  user = await getUserPromise;
  return user;
}