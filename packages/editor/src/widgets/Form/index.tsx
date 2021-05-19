import * as React from 'react';
import { useMemo } from 'react';
import { MaterialsForm, JsonSchemaProperties, OverrideFormComponent } from 'types';
import { isFunction } from 'utils';
import { i18n } from 'i18n';
import { OverrideForm } from './OverrideForm';
import { SchemaForm as ISchemaForm } from './SchemaForm';

interface Props {
  instanceKey?: number;
  form: MaterialsForm;
  data: object;
  onChange: (v: object) => void;
  submitProps?: boolean | React.ReactChild;
}

export function SchemaForm({ form, data, onChange, instanceKey, submitProps }: Props) {
  const isOverrideForm = useMemo(() => isFunction(form), [form]);

  if (isOverrideForm) {
    return (
      <OverrideForm value={data} onChange={onChange} instanceKey={instanceKey}>
        {form as OverrideFormComponent}
      </OverrideForm>
    );
  }

  if (submitProps) {
    return (
      <ISchemaForm
        key={instanceKey}
        schema={form as JsonSchemaProperties}
        value={data}
        onSubmit={onChange}
        submitProps={{ children: typeof submitProps === 'boolean' ? i18n.t('Confirm') : submitProps }}
      />
    );
  }

  return <ISchemaForm key={instanceKey} schema={form as JsonSchemaProperties} value={data} onChange={onChange} />;
}

export * from './OverrideForm';
