import * as React from 'react';
import { useMemo } from 'react';
import { OverrideFormProps, SchemaFormProps } from 'types';
import { SchemaForm, Formily } from '../SchemaForm';

function IOverrideForm({ onChange, children: Form, value, instanceKey }: OverrideFormProps) {
  const JSONSchemaForm = useMemo(
    () =>
      function MemoriesdOverrideForm(props: SchemaFormProps) {
        return <SchemaForm key={instanceKey} {...props} />;
      },
    [instanceKey],
  );

  return <Form key={instanceKey} value={value} onChange={onChange} JSONSchemaForm={JSONSchemaForm} Formily={Formily} />;
}

export const OverrideForm = React.memo(IOverrideForm);
