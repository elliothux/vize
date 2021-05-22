import './index.scss';
import * as React from 'react';
import { memo, ReactChild, useCallback, useMemo } from 'react';
import { throttle } from 'throttle-debounce';
import { Button } from 'antd';
import { SchemaFormProps } from 'types';
import { createSchema } from 'libs';
import { createForm, onFormValuesChange } from '@formily/core';
import { Form, Submit } from '@formily/antd';
import { FormProvider, FormConsumer } from '@formily/react';
import { SchemaField } from './fields';

type FormCore = ReturnType<typeof createForm>;

function ISchemaForm({ schema: schemaProperties, value, onChange, onSubmit, submitProps }: SchemaFormProps) {
  const schema = useMemo(() => createSchema(schemaProperties), [schemaProperties]);
  const form = useMemo(() => {
    const onValueChange = !onSubmit && onChange ? throttle(200, onChange) : null;
    return createForm({
      initialValues: value,
      effects: onValueChange
        ? () => {
            onFormValuesChange(form => {
              onValueChange(form.values);
            });
          }
        : undefined,
    });
  }, [schemaProperties]);

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema as any} />
      {submitProps && (
        <Submit type="primary" onClick={form.submit} {...submitProps}>
          {submitProps.children}
        </Submit>
      )}
    </FormProvider>
  );
}

export const SchemaForm = memo(ISchemaForm);
