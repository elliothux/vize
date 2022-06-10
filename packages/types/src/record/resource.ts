import { UserRecord } from './user';

export interface ResourceRecord {
  id: number;
  type: ResourceType;
  extension: string;
  filename: string;
  url?: string;
  createdTime: Date;
  user: UserRecord;
}

export enum ResourceType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  OTHER = 'other',
}
