import * as React from "react";
import * as Formily from "@formily/antd";
import { useMemo } from "react";
import { SchemaForm, SchemaFormProps } from "../SchemaForm";

export type OverrideFormComponent = React.ComponentType<{
  value: object;
  onChange: (value: object) => void;
  Formily: typeof Formily;
  JSONSchemaForm: React.ComponentType<SchemaFormProps>;
}>;

export interface OverrideFormProps {
  value: object;
  onChange: (value: object) => void;
  children: OverrideFormComponent;
  instanceKey: number;
}

function IOverrideForm({
  onChange,
  children: Form,
  value,
  instanceKey
}: OverrideFormProps) {
  const JSONSchemaForm = useMemo(
    () => (props: SchemaFormProps) => (
      <SchemaForm key={instanceKey} {...props} />
    ),
    [instanceKey]
  );

  return (
    <Form
      key={instanceKey}
      value={value}
      onChange={onChange}
      Formily={Formily}
      JSONSchemaForm={JSONSchemaForm}
    />
  );
}

export const OverrideForm = React.memo(IOverrideForm);
