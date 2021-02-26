export interface UserRecord {
  id: number;
  name: string;
  createdTime: Date;
  bizs: string[];
  isAdmin: number;
  extInfo?: string;
  avatar?: string;
}
