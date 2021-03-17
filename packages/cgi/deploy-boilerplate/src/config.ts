import * as path from 'path';
import { VizeCGIConfig } from '../../dist/main';
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
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      web: require(path.resolve(__dirname, '../../../../../generator-web'))
        .default,
    },
    publishers: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      web: require(path.resolve(__dirname, '../../../../../publisher-web'))
        .default,
    },
    middlewares: {
      user,
    },
  };
}
