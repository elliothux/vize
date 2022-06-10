import { UserRecord, Maybe } from 'types';
import { getCGIJSON, ParsedCGIResponse, postCGIJSON, prefix, WithPagination } from '@vize/utils';

export function queryUser(
  startPage: number,
  pageSize: number,
  keywords: string,
): Promise<ParsedCGIResponse<WithPagination<UserRecord[]>>> {
  return getCGIJSON<WithPagination<UserRecord[]>>(prefix('user', { startPage, pageSize, keywords }));
}

export type CreateUserParams = Pick<UserRecord, 'bizs' | 'name' | 'extInfo' | 'isAdmin' | 'isDeveloper'>;

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

  getUserPromise = getCGIJSON<UserRecord>('/user-info');
  user = await getUserPromise;
  return user;
}

export async function generateDeveloperAccessToken(id: number) {
  return postCGIJSON<{ token: string }>(prefix(`user/access_token/${id}`), {});
}
