import * as React from 'react';
import { JsonSchemaProperties } from './helper';

export interface SchemaFormProps<T extends object = object> {
  schema: JsonSchemaProperties;
  value: T;
  onChange?: (value: T) => void;
  onSubmit?: (value: T) => void;
  submitProps?: any;
}

export type OverrideFormComponent<T extends object = object> = React.ComponentType<{
  value: T;
  onChange: (value: T) => void;
  Formily: any;
  JSONSchemaForm: React.ComponentType<SchemaFormProps<T>>;
}>;

export interface OverrideFormProps<T extends object = object> {
  value: T;
  onChange: (value: T) => void;
  children: OverrideFormComponent<T>;
  instanceKey: number;
}

export type MaterialsForm = JsonSchemaProperties | OverrideFormComponent;
