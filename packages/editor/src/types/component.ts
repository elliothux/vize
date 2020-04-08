import { MaterialsInfo } from "./materials";
import { ActionInstance } from "./actions";
import { JsonSchemaProperties } from "./helper";
import { OverrideFormComponent } from "../components/Form/OverrideForm";

export interface MaterialsComponentMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly thumb: string;
  readonly info: MaterialsInfo;
  readonly dataForm?: JsonSchemaProperties | OverrideFormComponent;
}

export interface ComponentInstance {
  key: Readonly<number>;
  component: Readonly<string>;
  data: { [key: string]: any };
  style: { [key: string]: any };
  actions: ActionInstance[];
  children?: ComponentInstance[];
  parent?: ComponentInstance;
}
