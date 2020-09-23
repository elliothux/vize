import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'test_user',
        password: 'test_password',
        database: 'test',
      },
      app: true,
      agent: false,
    },
  };
  return config;
};
