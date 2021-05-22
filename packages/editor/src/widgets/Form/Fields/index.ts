import { ComponentType, memo } from 'react';
import { withDynamicImport } from 'widgets/WithDynamicImport';
import { FormProps } from '../types';
import { updateSchemaField } from '../SchemaForm/fields';
import { Color } from './Color';
import { Image } from './Image';

export type FormFieldComponent<T = any> = ComponentType<FormProps<T>>;

export const fieldWidgets = {
  Color: memo(Color),
  Image: memo(Image),
  RichText: memo(withDynamicImport(() => import('./RichText'), 'RichText')),
};

export function registerFormFieldWidgets(widgetsMap: { [type: string]: FormFieldComponent }) {
  Object.assign(fieldWidgets, widgetsMap);
  updateSchemaField();
}
