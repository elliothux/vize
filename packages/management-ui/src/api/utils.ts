import { Maybe } from 'types';

export function prefix(path: string, params?: { [key: string]: string | number | boolean | undefined | null }) {
  const p = params
    ? '?' +
      Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&')
    : '';
  return `/cgi/${path}${p}`;
}

export async function fetchCGIJSON<T = any>(...params: Parameters<typeof fetch>): Promise<ParsedCGIResponse<T>> {
  const response = await fetch(...params);
  const result = await response.json();
  return parseResponse<T>(result);
}

interface CGIResponse<T> {
  t: Date;
  status: 'success' | 'failed';
  message: string;
  code: number;
  data?: T;
}

export type ParsedCGIResponse<T> = [boolean, Maybe<T>, CGIResponse<T>];

export function parseResponse<T>(response: CGIResponse<T>): ParsedCGIResponse<T> {
  return [response.status === 'success', response.data, response];
}
