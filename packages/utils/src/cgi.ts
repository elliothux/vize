import { Maybe } from '@vize/types';

export function prefix(path: string, params?: { [key: string]: string | number | boolean | undefined | null }) {
  const p = params
    ? '?' +
      Object.entries(params)
        .map(([k, v]) => (v ? `${k}=${v}` : ''))
        .filter(i => !!i)
        .join('&')
    : '';
  return `/cgi/${path}${p}`;
}

export interface CGIIDResponse {
  id: number;
}

export interface CGIResponse<T> {
  t: Date;
  status: 'success' | 'failed';
  message: string;
  code: number;
  data?: T;
}

export type ParsedCGIResponse<T> = [boolean, Maybe<T>, CGIResponse<T>];

function parseResponse<T>(response: CGIResponse<T>): ParsedCGIResponse<T> {
  return [response.status === 'success', response.data, response];
}

export async function getCGIJSON<T = any>(...params: Parameters<typeof window.fetch>): Promise<ParsedCGIResponse<T>> {
  const response = await window.fetch(...params);
  const result = await response.json();
  return parseResponse<T>(result);
}

export async function postCGIJSON<T = any>(url: string, params: object): Promise<ParsedCGIResponse<T>> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const result = await response.json();
  return parseResponse<T>(result);
}

export async function deleteCGIJSON<T = any>(url: string): Promise<ParsedCGIResponse<T>> {
  const response = await fetch(url, {
    method: 'DELETE',
  });
  const result = await response.json();
  return parseResponse<T>(result);
}

export interface WithPagination<T> {
  total: number;
  data: T;
}
