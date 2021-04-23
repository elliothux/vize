declare type SchemaEnum<Message> = Array<
  | string
  | number
  | {
      label: Message;
      value: any;
      [key: string]: any;
    }
  | {
      key: any;
      title: Message;
      [key: string]: any;
    }
>;
declare type SchemaTypes =
  | 'string'
  | 'object'
  | 'array'
  | 'number'
  | 'boolean'
  | 'void'
  | 'date'
  | 'datetime'
  | (string & {});
declare type SchemaProperties<
  Decorator,
  Component,
  DecoratorProps,
  ComponentProps,
  Pattern,
  Display,
  Validator,
  Message
> = Record<string, ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>>;
declare type SchemaKey = string | number;
declare type SchemaItems<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message> =
  | ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>
  | ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>[];
declare type Stringify<
  P extends {
    [key: string]: any;
  }
> = {
  [key in keyof P]?: P[key] | string;
};

export declare type ISchema<
  Decorator = any,
  Component = any,
  DecoratorProps = any,
  ComponentProps = any,
  Pattern = any,
  Display = any,
  Validator = any,
  Message = any,
  ReactionField = any
> = Stringify<{
  version?: string;
  name?: SchemaKey;
  title?: Message;
  description?: Message;
  default?: any;
  readOnly?: boolean;
  writeOnly?: boolean;
  type?: SchemaTypes;
  enum?: SchemaEnum<Message>;
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
  properties?: SchemaProperties<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;
  items?: SchemaItems<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
  additionalItems?: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
  patternProperties?: SchemaProperties<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;
  additionalProperties?: ISchema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;
  widget?: string;
}>;
