import * as React from 'react';
import * as Formily from '@formily/antd';
import { ISubmitProps } from '@formily/antd';
import { JsonSchemaProperties } from './helper';
export interface SchemaFormProps {
    schema: JsonSchemaProperties;
    value: object;
    onChange?: (value: object) => void;
    onSubmit?: (value: object) => void;
    submitProps?: ISubmitProps;
}
export declare type OverrideFormComponent = React.ComponentType<{
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
export declare type MaterialsForm = JsonSchemaProperties | OverrideFormComponent;
