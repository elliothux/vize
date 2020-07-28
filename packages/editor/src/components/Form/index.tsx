import * as React from 'react';
import { useMemo } from 'react';
import { MaterialsForm, JsonSchemaProperties } from 'types';
import { isFunction } from 'utils';
import { OverrideForm, OverrideFormComponent } from './OverrideForm';
import { SchemaForm as ISchemaForm } from './SchemaForm';

interface Props {
    instanceKey: number;
    form: MaterialsForm;
    data: object;
    onChange: (v: object) => void;
}

export function SchemaForm({ form, data, onChange, instanceKey }: Props) {
    const isOverrideForm = useMemo(() => isFunction(form), [form]);

    if (isOverrideForm) {
        return (
            <OverrideForm value={data} onChange={onChange} instanceKey={instanceKey}>
                {form as OverrideFormComponent}
            </OverrideForm>
        );
    }

    return <ISchemaForm schema={form as JsonSchemaProperties} value={data} onChange={onChange} />;
}
