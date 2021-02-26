import * as path from 'path';
import * as fs from 'fs-extra';
import { v4 as uuid } from 'uuid';
import { FileInterceptorUploadedFile, Maybe } from '../../types';
import { getConfig } from '../../utils';
import { CreateResourceParams } from './resource.interface';
import { ResourceEntity } from './resource.entity';

export async function saveUploadedFile(buffer: Buffer, filename: string) {
  const {
    paths: { uploadFilesPath },
  } = getConfig();
  const saveName = `${uuid()}${path.extname(filename)}`;
  const targetPath = path.resolve(uploadFilesPath, saveName);
  await fs.writeFile(targetPath, buffer);
  return targetPath;
}

export function getCreateResourceParams(
  file: FileInterceptorUploadedFile,
  url: Maybe<string>,
): CreateResourceParams {
  const { ext, base } = path.parse(file.path);
  return {
    type: getFileType(file),
    extension: ext.split('.')[1],
    filename: base,
    url: url || undefined,
  };
}

export function getFileType({
  mimetype,
}: FileInterceptorUploadedFile): ResourceEntity['type'] {
  const [mine] = mimetype.split('/');
  switch (mine) {
    case 'image':
      return 'image';
    case 'video':
      return 'video';
    case 'audio':
      return 'audio';
    default:
      return 'other';
  }
}
