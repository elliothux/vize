import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '2333',
        database: 'vize',
      },
      app: true,
      agent: false,
    },
  };
  return config;
};
