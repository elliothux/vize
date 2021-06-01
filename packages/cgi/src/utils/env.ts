export function getEnv() {
  return process.env.NODE_ENV;
}

export function isDev() {
  return getEnv() === 'development';
}
