import { Maybe } from 'types';
import { UserRecord } from 'sharedTypes';
import { getCGIJSON, ParsedCGIResponse, prefix } from './utils';

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
