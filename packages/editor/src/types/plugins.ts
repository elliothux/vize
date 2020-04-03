import { MaterialsInfo } from "./materials";

export interface MaterialsPluginMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly thumb: string;
  readonly info: MaterialsInfo;
}
