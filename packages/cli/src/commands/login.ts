import * as inquirer from 'inquirer';
import { curl, error, getLibConfig, getLibPaths, writeAccessToken, deleteAccessToken, done } from '../utils';

export async function login() {
  const root = process.cwd();
  const paths = getLibPaths(root, '');
  const { server } = getLibConfig(paths);

  const { username, accessToken } = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'username',
      required: true,
    },
    {
      type: 'input',
      name: 'accessToken',
      message: 'access-token',
      required: true,
    },
  ]);

  const { data } = await curl(`${server}/cgi/user/access_token?username=${username}&token=${accessToken}`, {
    method: 'GET',
    timeout: 10 * 1000,
    contentType: 'application/json',
  });

  if (data.code !== 0) {
    error(data.message || `Unknown error with code: "${data.code}"`);
    process.exit();
  }

  if (!data?.data?.tokenValid) {
    error('Invalid access-token');
    process.exit();
  }

  await writeAccessToken(server, username, accessToken);
  done(`User "${username}" login success for "${server}"`);
}

export async function logout() {
  const root = process.cwd();
  const paths = getLibPaths(root, '');
  const { server } = getLibConfig(paths);
  await deleteAccessToken(server);
  done('logged out');
}
