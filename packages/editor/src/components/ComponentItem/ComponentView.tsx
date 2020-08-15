import * as React from 'react';
import { ComponentInstance, WithReactChildren } from 'types';
import { useMemo } from 'react';
import { getMaterialsComponent } from 'utils';
import { observer } from 'mobx-react';
import { ComponentEventProxy } from '../ComponentEventProxy';

interface Props extends WithReactChildren {
    instance: ComponentInstance;
}

function IComponentView({ instance, children }: Props) {
    const { key, component, data } = instance;

    const ComponentRender = useMemo(() => getMaterialsComponent(component)!, [component]);

    return (
        <ComponentEventProxy instance={instance}>
            <ComponentRender componentKey={key} data={data} style={{}} instance={instance}>
                {children}
            </ComponentRender>
        </ComponentEventProxy>
    );
}

export const ComponentView = observer(IComponentView);
