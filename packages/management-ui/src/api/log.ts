import { getCGIJSON, ParsedCGIResponse, prefix } from './utils';

export function queryLogFiles(type: 'error' | 'all'): Promise<ParsedCGIResponse<string[]>> {
  return getCGIJSON(prefix(`log/${type}`));
}

export function getLog(
  type: 'error' | 'all',
  filename: string,
  startLine?: number,
): Promise<ParsedCGIResponse<string>> {
  return getCGIJSON(prefix(`log/${type}/${filename}`, { startLine }));
}
