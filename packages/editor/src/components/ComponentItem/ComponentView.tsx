import * as React from 'react';
import { ComponentInstance, WithReactChildren } from 'types';
import { useMemo } from 'react';
import { getMaterialsComponent } from 'utils';
import { observer } from 'mobx-react';

interface Props extends WithReactChildren {
    instance: ComponentInstance;
}

function IComponentView({ instance, children }: Props) {
    const { key, component, data } = instance;

    const ComponentRender = useMemo(() => getMaterialsComponent(component)!, [component]);

    return (
        <ComponentRender componentKey={key} data={data} style={{}} instance={instance}>
            {children}
        </ComponentRender>
    );
}

export const ComponentView = observer(IComponentView);
