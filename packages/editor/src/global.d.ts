declare module 'json-schema-defaults' {
  export function getDefaults(schema: string | object): object;

  export = getDefaults;
}

declare module 'form-render/lib/antd' {
  import * as React from 'react';
  export interface FRProps {
    schema: object;
    formData: object;
    onChange(data?: object): void;
    onMount?: () => void;
    name?: string;
    column?: number;
    uiSchema?: object;
    widgets?: any;
    FieldUI?: any;
    fields?: any;
    mapping?: object;
    showDescIcon?: boolean;
    showValidate?: boolean;
    displayType?: string;
    onValidate?: any;
    readOnly?: boolean;
    labelWidth?: number | string;
  }
  class FormRender extends React.Component<FRProps, void> {}
  export default FormRender;
}
