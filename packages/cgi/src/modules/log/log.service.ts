import * as path from 'path';
import * as fs from 'fs-extra';
import { Injectable } from '@nestjs/common';
import { getConfig } from '../../utils';

@Injectable()
export class LogService {
  constructor() {
    const {
      paths: { logsPath },
    } = getConfig();
    this.allLogsPath = path.resolve(logsPath, 'all');
    this.errorLogsPath = path.resolve(logsPath, 'error');
  }

  private readonly allLogsPath: string;

  private readonly errorLogsPath: string;

  public async listLogs(type: 'all' | 'error'): Promise<string[]> {
    const files = await fs.readdir(
      type === 'error' ? this.errorLogsPath : this.allLogsPath,
    );
    return files.filter(i => i.endsWith('.log'));
  }

  public async getLogs(
    type: 'all' | 'error',
    name: string,
    startLine?: number,
  ): Promise<string> {
    const logPath = path.resolve(
      type === 'error' ? this.errorLogsPath : this.allLogsPath,
      name,
    );
    const logs = await fs.readFile(logPath, 'utf-8');
    if (!startLine) {
      return logs;
    }
    const lines = logs.split('\n');
    return lines.slice(startLine).join('\n');
  }
}
