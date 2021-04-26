import * as React from 'react';
import { useMemo } from 'react';
import { SchemaForm } from '../SchemaForm';
import { OverrideFormProps, SchemaFormProps } from 'types';

function IOverrideForm({ onChange, children: Form, value, instanceKey }: OverrideFormProps) {
  const JSONSchemaForm = useMemo(
    () =>
      function MemoriesdOverrideForm(props: SchemaFormProps) {
        return <SchemaForm key={instanceKey} {...props} />;
      },
    [instanceKey],
  );

  return <Form key={instanceKey} value={value} onChange={onChange} JSONSchemaForm={JSONSchemaForm} />;
}

export const OverrideForm = React.memo(IOverrideForm);
