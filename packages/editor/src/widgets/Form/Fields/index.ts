import * as R from 'ramda';
import { ComponentType } from 'react';
import { registerFormFields as registerFormilyFields, connect } from '@formily/antd';
import { FormProps } from '../types';
import { Color } from './Color';

export type FormFieldComponent<T = any> = ComponentType<FormProps<T>>;

export function registerFormFields(fieldsMap: { [type: string]: FormFieldComponent }) {
  registerFormilyFields(R.mapObjIndexed(field => connect()(field), fieldsMap));
}

registerFormFields({
  color: Color,
});
