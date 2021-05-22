import { createSchemaField, Schema, ObjectField } from '@formily/react';
import {
  ArrayCards,
  ArrayItems,
  ArrayTable,
  ArrayTabs,
  Checkbox,
  DatePicker,
  Editable,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormStep,
  FormTab,
  Input,
  NumberPicker,
  Password,
  Radio,
  Select,
  Space,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
} from '@formily/antd';
import { Maybe } from 'types';
import { FormItem } from './WithLayout';
import { fieldWidgets } from '../Fields';

Schema.enablePolyfills(['1.0']);

Schema.registerTypeDefaultComponents({
  string: 'Input',
  number: 'NumberPicker',
  boolean: 'Switch',
  array: 'ArrayItems',
});

const defaultFieldsComponents = {
  ObjectField,
  ArrayCards,
  ArrayItems,
  ArrayTable,
  ArrayTabs,
  Checkbox,
  CheckboxGroup: Checkbox.Group!,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker!,
  Editable,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormStep,
  FormStepPanel: FormStep.StepPane!,
  FormTab,
  FormTabPanel: FormTab.TabPane!,
  Input,
  TextArea: Input.TextArea!,
  NumberPicker,
  Password,
  Radio,
  RadioGroup: Radio.Group!,
  Select,
  Space,
  Switch,
  TimePicker,
  TimeRangePicker: TimePicker.RangePicker!,
  Transfer,
  TreeSelect,
};

type SchemaField = ReturnType<typeof createSchemaField>;

let schemaField: Maybe<SchemaField> = null;

export function getSchemaField(): SchemaField {
  if (!schemaField) {
    schemaField = createSchemaField<{}>({
      components: { ...defaultFieldsComponents, ...fieldWidgets },
      scope: {},
    });
  }
  return schemaField!;
}

export function updateSchemaField(): SchemaField {
  schemaField = null;
  return getSchemaField();
}
