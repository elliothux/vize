import { Maybe } from './index';
import { ResourceEntity } from '../modules/resource/resource.entity';

export interface FileInterceptorUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  path: string;
}

export type UploadResourceCallback = (
  file: FileInterceptorUploadedFile,
) => Promise<Maybe<{ url: string }>>;

export type DeleteResourceCallback = (file: ResourceEntity) => Promise<void>;
