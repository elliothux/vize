import './index.scss';
import * as React from 'react';
import { memo, useMemo } from 'react';
import { throttle } from 'throttle-debounce';
import { Button } from 'antd';
import { SchemaFormProps } from 'types';
import { createSchema } from 'libs';
import FormRender, { useForm } from 'form-render';
import { fieldWidgets } from '../Fields';

function ISchemaForm({
  schema: schemaProperties,
  value: formData,
  onChange: onValueChange,
  onSubmit,
  submitProps,
}: SchemaFormProps) {
  const schema = useMemo(() => createSchema(schemaProperties), [schemaProperties]);
  const onChange = useMemo(() => (!onSubmit && onValueChange ? throttle(200, onValueChange) : undefined), [
    onSubmit,
    onValueChange,
  ]);

  const form = useForm({
    onChange,
    formData,
  });

  return (
    <>
      <FormRender widgets={fieldWidgets} form={form} schema={schema} onFinish={onSubmit || onChange} />
      {submitProps && (
        <Button type="primary" onClick={form.submit} {...submitProps}>
          {submitProps.children}
        </Button>
      )}
    </>
  );
}

export const SchemaForm = memo(ISchemaForm);
