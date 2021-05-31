import * as path from 'path';
import * as fs from 'fs-extra';
import { getGlobalTempPath } from './paths';

type TokenRowItem = [string, string, string];

export async function writeAccessToken(server: string, username: string, token: string) {
  const tokenFilePath = path.resolve(await getGlobalTempPath(), '.access-token');
  const tokens: TokenRowItem[] = fs.existsSync(tokenFilePath) ? await fs.readJSON(tokenFilePath) : [];
  const index = tokens.findIndex(i => i[0] === server);
  if (index < 0) {
    if (token && username) {
      tokens.push([server, username, token]);
    }
  } else {
    if (token && username) {
      tokens[index] = [server, username, token];
    } else {
      tokens.splice(index, 1);
    }
  }
  return fs.writeJSON(tokenFilePath, tokens);
}

export async function deleteAccessToken(server: string) {
  return writeAccessToken(server, '', '');
}

export async function getAccessToken(server: string): Promise<TokenRowItem | null> {
  const tokenFilePath = path.resolve(await getGlobalTempPath(), '.access-token');
  const tokens: TokenRowItem[] = fs.existsSync(tokenFilePath) ? await fs.readJSON(tokenFilePath) : [];
  return tokens.find(i => i[0] === server);
}
