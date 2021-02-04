export interface UserRecord {
  id: number;
  name: string;
  createdTime: Date;
  bizIds: string;
  isAdmin: number;
  extInfo?: string;
  avatar?: string;
}
