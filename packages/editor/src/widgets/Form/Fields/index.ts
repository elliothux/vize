import * as R from 'ramda';
import { ComponentType, memo } from 'react';
import { registerFormFields as registerFormilyFields, connect } from '@uform/antd';
import { FormProps } from '../types';
import { Color } from './Color';
import { Image } from './Image';

export type FormFieldComponent<T = any> = ComponentType<FormProps<T>>;

export function registerFormFields(fieldsMap: { [type: string]: FormFieldComponent }) {
  registerFormilyFields(R.mapObjIndexed(field => connect()(field as any), fieldsMap));
}

registerFormFields({
  color: memo(Color),
  image: memo(Image),
});
