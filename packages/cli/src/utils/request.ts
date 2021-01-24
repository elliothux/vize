import urllib, { HttpClientResponse, HttpClient } from 'urllib';

const httpClient: HttpClient = urllib.create();

export function curl<T = any>(url: string, options: {}): Promise<HttpClientResponse<T>> {
  return httpClient.request<T>(url, {
    ...options,
    enableProxy: !!process.env.HTTP_PROXY,
    proxy: process.env.HTTP_PROXY,
  });
}
