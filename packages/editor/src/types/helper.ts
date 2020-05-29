import * as React from 'react';
import { ISchema } from '@formily/antd';

export type Maybe<T> = T | null | undefined;

export interface WithReactChildren {
    children: React.ReactNode;
}

export type Function<T = any, U = void> = (param: T) => U;

export enum RequestStatus {
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILED = 'failed',
}

/**
 * @desc JSONSchema
 */

export type JSONSchemaDefinition = ISchema;

export interface JsonSchemaProperties {
    [key: string]: ISchema;
}
