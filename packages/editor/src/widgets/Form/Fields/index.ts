import { ComponentType, memo } from 'react';
import { FormProps } from '../types';
import { Color } from './Color';
import { Image } from './Image';
import { withDynamicImport } from 'widgets/WithDynamicImport';

export type FormFieldComponent<T = any> = ComponentType<FormProps<T>>;

export const fieldWidgets = {
  color: memo(Color),
  image: memo(Image),
  richtext: memo(withDynamicImport(() => import('./RichText'), 'RichText')),
};

export function registerFormFieldWidgets(widgetsMap: { [type: string]: FormFieldComponent }) {
  Object.assign(fieldWidgets, widgetsMap);
}
