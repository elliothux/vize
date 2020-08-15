import * as React from 'react';
import { MaterialsForm, MaterialsInfo } from './materials';
import { MaterialsCustomEvent } from './events';
import { ActionInstance, ComponentActionsInstance } from './actions';

export interface MaterialsComponentMeta {
    identityName: string;
    lib: string;
    name: string;
    readonly info: MaterialsInfo;
    readonly dataForm?: MaterialsForm;
    readonly styleForm?: MaterialsForm;
    readonly thumb?: string;
    readonly preview?: string;
    readonly isContainer?: boolean;
    readonly runtime?: 'react' | 'rax';
    readonly onEvents?: MaterialsCustomEvent[];
    readonly emitEvents?: MaterialsCustomEvent[];
}

export interface ComponentPosition {
    x: number;
    y: number;
}

export interface ComponentSize {
    width: number;
    height: number;
}

export interface ComponentInstance {
    key: Readonly<number>;
    component: Readonly<string>;
    data: { [key: string]: any };
    style: { [key: string]: any };
    actions: ActionInstance[];
    componentActions: ComponentActionsInstance[];
    children?: ComponentInstance[];
    parent?: ComponentInstance;
    layout?: {
        position: ComponentPosition;
        size?: ComponentSize;
    };
}

export interface ComponentProps extends Pick<ComponentInstance, 'data' | 'style'> {
    componentKey: Readonly<number>;
    instance: ComponentInstance;
}

export type MaterialsComponent = React.ComponentType<ComponentProps>;
