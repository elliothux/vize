import { ResourceRecord, ResourceType } from 'types';
import { deleteCGIJSON, getCGIJSON, ParsedCGIResponse, prefix, WithPagination } from './utils';

export function queryResources(
  type: ResourceType,
  startPage: number,
  pageSize = 20,
): Promise<ParsedCGIResponse<WithPagination<ResourceRecord[]>>> {
  return getCGIJSON<WithPagination<ResourceRecord[]>>(prefix('resource', { startPage, pageSize, type }));
}

export function deleteResource(id: number) {
  return deleteCGIJSON(prefix(`resource/${id}`));
}
