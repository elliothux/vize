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
import { Maybe, FormilySchemaField } from 'types';
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
  ArrayCards,
  ArrayItems,
  ArrayTable,
  ArrayTabs,
  Checkbox,
  CheckboxGroup: Checkbox.Group!,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker!,
  Editable,
  EditablePopover: Editable.Popover!,
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
  ObjectField,
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

let schemaField: Maybe<FormilySchemaField> = null;

export function getSchemaField(): FormilySchemaField {
  if (!schemaField) {
    schemaField = createSchemaField<{}>({
      components: { ...defaultFieldsComponents, ...fieldWidgets },
      scope: {},
    });
  }
  return schemaField!;
}

export function updateSchemaField(): FormilySchemaField {
  schemaField = null;
  return getSchemaField();
}
