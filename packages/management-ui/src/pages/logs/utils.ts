export enum LogLevel {
  info = 'info',
  error = 'error',
}

export interface LogItem {
  context: string;
  level: LogLevel;
  message: string;
  timestamp: string;
  result?: object;
  [key: string]: any;
}

export function parseLogs(logs: string): LogItem[] {
  return logs.split('\n').reduce<LogItem[]>((accu, line) => {
    try {
      const log = JSON.parse(line) as LogItem;
      accu.push(log);
    } catch (e) {
      console.error('Failed to parse log line: ', line);
    }
    return accu;
  }, []);
}
