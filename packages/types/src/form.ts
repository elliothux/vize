import * as React from 'react';
import * as Formily from '@formily/antd';
import { ISubmitProps } from '@formily/antd';
import { JsonSchemaProperties } from './helper';

export interface SchemaFormProps<T extends object = object> {
  schema: JsonSchemaProperties;
  value: T;
  onChange?: (value: T) => void;
  onSubmit?: (value: T) => void;
  submitProps?: ISubmitProps;
}

export type OverrideFormComponent<T extends object = object> = React.ComponentType<{
  value: T;
  onChange: (value: T) => void;
  Formily: typeof Formily;
  JSONSchemaForm: React.ComponentType<SchemaFormProps<T>>;
}>;

export interface OverrideFormProps<T extends object = object> {
  value: T;
  onChange: (value: T) => void;
  children: OverrideFormComponent<T>;
  instanceKey: number;
}

export type MaterialsForm = JsonSchemaProperties | OverrideFormComponent;
