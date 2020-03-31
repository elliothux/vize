export interface MaterialsComponentInfo {
  name: string;
  desc: string;
  author: string;
}

export interface MaterialsComponent {
  id: number;
  name: string;
  thumb: string;
  info: MaterialsComponentInfo;
}
