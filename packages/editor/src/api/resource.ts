import { Maybe } from 'types';
import { ResourceRecord, ResourceType } from 'sharedTypes';
import { deleteCGIJSON, getCGIJSON, ParsedCGIResponse, prefix, WithPagination } from './utils';

export function queryResources(
  type: ResourceType,
  extension: Maybe<string>,
  startPage: number,
  pageSize: number,
  keywords: string,
): Promise<ParsedCGIResponse<WithPagination<ResourceRecord[]>>> {
  return getCGIJSON<WithPagination<ResourceRecord[]>>(
    prefix('resource', { startPage, pageSize, type, keywords, extension: extension || undefined }),
  );
}

export function deleteResource(id: number) {
  return deleteCGIJSON(prefix(`resource/${id}`));
}
