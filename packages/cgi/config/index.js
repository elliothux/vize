const fs = require('fs');
const path = require('path');

let c = null;

export function getConfig() {
  if (c) {
    return c;
  }

  const env = process.env.ENV || process.env.NODE_ENV || 'dev';
  const defaultConfig = require('./default');
  const devConfig = require('./dev');
  const preConfig = require('./dev');
  const prodConfig = require('./prod');

  let config = { ...defaultConfig };
  if (env === 'prod') {
    config = { ...config, ...prodConfig };
  } else if (env === 'pre') {
    config = { ...config, ...preConfig };
  } else {
    config = { ...config, ...devConfig };
  }

  c = config;
  return config;
}
