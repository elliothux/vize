import * as React from 'react';
import { ISchema } from '@formily/antd';
export declare type Maybe<T> = T | null | undefined;
export declare type MustBe<T> = (T extends Maybe<infer U> ? U : never) extends undefined | infer P ? P : never;
export declare type WithReactChildren<T = {}> = React.PropsWithChildren<T>;
export declare type Function<T = any, U = void> = (param: T) => U;
export declare type ValueOfPromise<T> = T extends Promise<infer U> ? U : never;
export declare type FirstParameter<T extends (...args: any[]) => any> = T extends (firstArg: infer P, ...args: any[]) => any ? P : never;
export declare enum RequestStatus {
    LOADING = "loading",
    SUCCESS = "success",
    FAILED = "failed"
}
export declare type JSONSchemaDefinition = ISchema;
export interface JsonSchemaProperties {
    [key: string]: ISchema;
}
