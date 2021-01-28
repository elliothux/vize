type SchemaMessage = string;
type ValidatePatternRules = string;

export interface ISchema {
  title?: SchemaMessage;
  description?: SchemaMessage;
  default?: any;
  readOnly?: boolean;
  writeOnly?: boolean;
  type?: 'string' | 'object' | 'array' | 'number' | 'boolean' | string;
  enum?: Array<
    | string
    | number
    | {
        label: SchemaMessage;
        value: any;
        [key: string]: any;
      }
    | {
        key: any;
        title: SchemaMessage;
        [key: string]: any;
      }
  >;
  const?: any;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string | RegExp;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[] | boolean | string;
  format?: string;
  properties?: {
    [key: string]: ISchema;
  };
  items?: ISchema | ISchema[];
  additionalItems?: ISchema;
  patternProperties?: {
    [key: string]: ISchema;
  };
  additionalProperties?: ISchema;
  editable?: boolean;
  visible?: boolean | string;
  display?: boolean | string;
  triggerType?: 'onBlur' | 'onChange';
  ['x-props']?: {
    [name: string]: any;
  };
  ['x-index']?: number;
  ['x-rules']?: ValidatePatternRules;
  ['x-mega-props']?: {
    [name: string]: any;
  };
  ['x-item-props']?: {
    [name: string]: any;
  };
  ['x-component']?: string;
  ['x-component-props']?: {
    [name: string]: any;
  };
  ['x-effect']?: (
    dispatch: (type: string, payload: any) => void,
    option?: object,
  ) => {
    [key: string]: any;
  };
}
