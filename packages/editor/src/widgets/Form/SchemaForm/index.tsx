import './index.scss';
import * as React from 'react';
import { useCallback, useMemo, useEffect } from 'react';
import { throttle } from 'throttle-debounce';
import { Button } from 'antd';
import { SchemaFormProps } from 'types';
import { noop, getSchemaDefaultValue, isEmpty } from 'utils';
import { createSchema } from 'libs';
import FormRender, { connectForm, ConnectedForm } from 'form-render';

function ISchemaForm({
  schema: schemaProperties,
  value,
  onChange,
  onSubmit,
  submitProps,
  form,
}: ConnectedForm<SchemaFormProps>) {
  const schema = useMemo(() => createSchema(schemaProperties), [schemaProperties]);
  const onValueChange = useCallback(throttle(200, onChange || noop), [onChange]);

  useEffect(() => {
    const initValue = isEmpty(value) ? getSchemaDefaultValue(schemaProperties) : value;
    form.setValues(initValue);
  }, [schemaProperties]);

  const watch = useMemo(() => (onSubmit ? undefined : { '#': onValueChange }), [onValueChange, onSubmit]);

  return (
    <>
      <FormRender form={form} schema={schema} watch={watch} onFinish={onSubmit || onValueChange} />
      {submitProps && (
        <Button type="primary" onClick={form.submit} {...submitProps}>
          {submitProps.children}
        </Button>
      )}
    </>
  );
}

const SchemaForm: React.ComponentType<SchemaFormProps> = React.memo(connectForm(ISchemaForm));

export { SchemaForm };
