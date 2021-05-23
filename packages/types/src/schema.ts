/**
 * @desc JSONSchema
 */
import { StyleInjectSchema } from './styles';

export type JSONSchemaDefinition = ISchema;

export interface JsonSchemaProperties {
  [key: string]: ISchema;
}

export type SchemaTypes = 'string' | 'object' | 'array' | 'number' | 'boolean' | 'void' | 'date' | 'datetime';

type BaseSchemaValueTypes = string | number | boolean | Date;

export type SchemaValueTypes = BaseSchemaValueTypes | BaseSchemaValueTypes[] | { [key: string]: BaseSchemaValueTypes };

type BaseWidgetTypes = 'image' | 'textarea' | 'color' | 'email' | 'url' | 'dateTime' | 'date' | 'time' | 'upload';

export type SchemaWidgetTypes = 'color' | 'image' | BaseWidgetTypes | string;

export interface SchemaRule {
  pattern: string;
  message: string;
}

export interface ISchema<T = SchemaTypes, V = SchemaValueTypes> {
  type: T;
  title?: string;
  description?: string;
  default?: V;
  placeholder?: string;
  required?: boolean;
  widget?: SchemaWidgetTypes;
  enum?: V[];
  enumNames?: string[];
  displayType?: 'column' | 'row' | 'inline';
  labelWidth?: number;
  width?: number;
  min?: number;
  max?: number;
  rules?: SchemaRule[];
  props?: { [key: string]: any };
  properties?: JsonSchemaProperties;
  inject?: StyleInjectSchema | StyleInjectSchema[];
}
