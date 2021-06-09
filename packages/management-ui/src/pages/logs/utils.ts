import { LogItem } from './types';

export function parseLogs(logs: string): LogItem[] {
  return logs.split('\n').reduce<LogItem[]>((accu, line) => {
    if (!line) {
      return accu;
    }
    try {
      const log = JSON.parse(line) as LogItem;
      accu.push(log);
    } catch (e) {
      console.error('Failed to parse log line: ', line);
    }
    return accu;
  }, []);
}
