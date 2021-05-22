import * as React from 'react';
import { ComponentProps, createElement } from 'react';
import { FormItem as FormItemComponent, FormLayout } from '@formily/antd';

export function FormItem(props: ComponentProps<typeof FormItemComponent>) {
  return <FormLayout layout="vertical">{createElement(FormItemComponent, props)}</FormLayout>;
}
