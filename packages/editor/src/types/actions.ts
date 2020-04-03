import { MaterialsInfo } from "./materials";

export interface MaterialsActionMeta {
  identityName: string;
   lib: string;
  readonly name: string;
  readonly thumb: string;
  readonly info: MaterialsInfo;
}
