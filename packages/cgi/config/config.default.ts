import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    keys: appInfo.name + '_1600853785999_340',
    middleware: [],
  } as PowerPartial<EggAppConfig>;

  const bizConfig = {};

  return {
    ...config,
    ...bizConfig,
  };
};
