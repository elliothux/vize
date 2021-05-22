import { createElement } from 'react';
import { createSchemaField, Schema, ObjectField } from '@formily/react';
import { ArrayItems, NumberPicker, Input, DatePicker } from '@formily/antd';
import { FormItem } from './WithLayout';

Schema.enablePolyfills(['1.0']);

Schema.registerTypeDefaultComponents({
  string: 'Input',
  number: 'NumberPicker',
  array: 'ArrayItems',
});

export const SchemaField = createSchemaField({
  components: {
    FormItem,
    ObjectField,
    ArrayItems,
    NumberPicker,
    Input,
    TextArea: Input.TextArea!,
  },
  scope: {},
});
