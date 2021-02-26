import * as path from 'path';
import { VizeCGIConfig } from '../../dist/main';
import { login } from './middlewares/login';
import { user } from './middlewares/user';

export function getConfig(): VizeCGIConfig {
  const workspacePath = path.resolve(
    '/Users/huqingyang/Desktop/Proj/vize/packages/cgi',
    '../workspace',
  );
  const editorPath = path.resolve(
    '/Users/huqingyang/Desktop/Proj/vize/packages/editor/build',
  );
  const managementUIPath = path.resolve(
    '/Users/huqingyang/Desktop/Proj/vize/packages/management-ui/build',
  );

  return {
    port: 4001,
    workspacePath,
    editorPath,
    managementUIPath,
    npmRegistry: 'https://registry.npm.taobao.org',
    db: {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '2333',
      database: 'vize',
    },
    generators: {
      web: require(path.resolve(
        '/Users/huqingyang/Desktop/Proj/vize/packages/',
        'generator-web',
      )).default,
      pegasus: require(path.resolve(
        '/Users/huqingyang/Desktop/Proj/vize/packages/',
        'generator-pegasus',
      )).default,
    },
    middlewares: {
      login,
      user,
    },
  };
}
