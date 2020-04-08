import * as React from "react";
import { useMemo } from "react";
import { JsonSchemaProperties } from "types";
import { isFunction } from "utils";
import { OverrideForm, OverrideFormComponent } from "./OverrideForm";
import { SchemaForm } from "./SchemaForm";

interface Props {
  instanceKey: number;
  form: JsonSchemaProperties | OverrideFormComponent;
  data: object;
  onChange: (v: object) => void;
}

export function Form({ form, data, onChange, instanceKey }: Props) {
  const isOverrideForm = useMemo(() => isFunction(form), [form]);

  if (isOverrideForm) {
    return (
      <OverrideForm value={data} onChange={onChange} instanceKey={instanceKey}>
        {form as OverrideFormComponent}
      </OverrideForm>
    );
  }

  return (
    <SchemaForm
      schema={form as JsonSchemaProperties}
      value={data}
      onChange={onChange}
    />
  );
}
