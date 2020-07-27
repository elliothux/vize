import * as React from 'react';
import { ISchema } from '@formily/antd';

export type Maybe<T> = T | null | undefined;

export type MustBe<T> = (T extends Maybe<infer U> ? U : never) extends undefined | infer P ? P : never;

export type WithReactChildren = React.PropsWithChildren<{}>;

export type Function<T = any, U = void> = (param: T) => U;

export type ValueOfPromise<T> = T extends Promise<infer U> ? U : never;

export type FirstParameter<T extends (...args: any[]) => any> = T extends (firstArg: infer P, ...args: any[]) => any
    ? P
    : never;

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
