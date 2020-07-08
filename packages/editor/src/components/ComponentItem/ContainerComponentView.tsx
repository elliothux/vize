import * as React from 'react';
import { ComponentView } from './ComponentView';
import { ComponentItem, ComponentItemProps } from './index';
import { observer } from 'mobx-react';

type Props = ComponentItemProps;

function IContainerComponentView({ instance, currentSelectedKey, containerEditMode }: Props) {
    const children = instance.children!.map(childInstance => {
        return (
            <ComponentItem
                key={childInstance.key}
                instance={childInstance}
                currentSelectedKey={currentSelectedKey}
                containerEditMode={containerEditMode}
            />
        );
    });

    return <ComponentView instance={instance}>{children}</ComponentView>;
}

export const ContainerComponentView = observer(IContainerComponentView);
