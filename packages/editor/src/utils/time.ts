export function getDateTimeString(appendTime: string | number = 0) {
  const date = typeof appendTime === 'number' ? new Date(Date.now() + appendTime) : new Date(appendTime);
  return date.toISOString().split('T')[0];
}
