import { MaterialsManifest } from 'types';

export interface MaterialsRecord {
  id: number;
  createdTime: Date;
  modifiedTime?: Date;
  author: string;
  libName: string;
  displayName: string;
  desc?: string;
  thumb?: string;
  version: string;
  runtime: 'react' | 'rax';
  manifest: MaterialsManifest;
}
