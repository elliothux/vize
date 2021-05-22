import './index.scss';
import * as React from 'react';
import { memo, useMemo } from 'react';
import { throttle } from 'throttle-debounce';
import { SchemaFormProps } from 'types';
import { createSchema } from 'libs';
import { createForm, onFormValuesChange, onFormSubmit } from '@formily/core';
import { Submit } from '@formily/antd';
import { FormProvider, ISchema } from '@formily/react';
import { getSchemaField } from './fields';

function ISchemaForm({ schema: schemaProperties, value, onChange, onSubmit, submitProps }: SchemaFormProps) {
  const SchemaField = getSchemaField();

  const schema = useMemo(() => createSchema(schemaProperties) as ISchema, [schemaProperties]);

  const form = useMemo(() => {
    return createForm({
      initialValues: value,
      effects: () => {
        if (onSubmit) {
          onFormSubmit(form => onSubmit(form.values));
        } else if (onChange) {
          const onValueChange = throttle(200, onChange);
          onFormValuesChange(form => onValueChange(form.values));
        }
      },
    });
  }, [schemaProperties]);

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      {submitProps && <Submit type="primary" onClick={form.submit} {...submitProps} />}
    </FormProvider>
  );
}

export const SchemaForm = memo(ISchemaForm);
