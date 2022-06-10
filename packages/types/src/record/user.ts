export interface UserRecord {
  id: number;
  name: string;
  createdTime: Date;
  bizs: string[];
  isAdmin: number;
  isDeveloper: number;
  extInfo?: string;
  avatar?: string;
}
