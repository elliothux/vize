import { ComponentType } from 'react';
import { createSchemaField } from '@formily/react';
import { JsonSchemaProperties } from './schema';

export interface SchemaFormProps<T extends object = object> {
  schema: JsonSchemaProperties;
  value: T;
  onChange?: (value: T) => void;
  onSubmit?: (value: T) => void;
  submitProps?: any;
}

export type FormilySchemaField = ReturnType<typeof createSchemaField>;

export type OverrideFormComponent<T extends object = object> = ComponentType<{
  value: T;
  onChange: (value: T) => void;
  JSONSchemaForm: ComponentType<SchemaFormProps<T>>;
  Formily: {
    getSchemaField: () => FormilySchemaField;
  };
}>;

export interface OverrideFormProps<T extends object = object> {
  value: T;
  onChange: (value: T) => void;
  children: OverrideFormComponent<T>;
  instanceKey?: number;
}

export type MaterialsForm = JsonSchemaProperties | OverrideFormComponent;
