export interface BizRecord {
  id: number;
  key: string;
  name: string;
  logo: string;
  createdTime: Date;
  modifiedTime?: Date;
  libs: string[];
}
