import { MaterialsInfo } from "./materials";
import {JsonSchemaProperties} from "./helper";
import {OverrideFormComponent} from "../components/Form/OverrideForm";

export interface MaterialsPluginMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly thumb: string;
  readonly info: MaterialsInfo;
  readonly dataForm?: JsonSchemaProperties | OverrideFormComponent;
}

export interface PluginInstance {
  key: Readonly<number>;
  plugin: Readonly<string>;
  data: { [key: string]: any };
}
