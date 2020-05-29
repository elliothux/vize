import * as React from 'react';
import { SortableContainer as sortableContainer, SortableElement as sortableElement } from 'react-sortable-hoc';
import { WithReactChildren } from 'types';
import { ComponentItem } from 'components/ComponentItem';
import { componentsStore, selectStore } from 'states';
import { observer } from 'mobx-react';

function ISortableContainer({ children }: WithReactChildren) {
    return <>{children}</>;
}

const SortableContainer = sortableContainer(ISortableContainer);
const SortableComponentItem = sortableElement(ComponentItem);

function IStreamLayoutRender() {
    const { componentInstances } = componentsStore;

    return (
        <SortableContainer>
            {componentInstances.map((instance, index) => (
                <SortableComponentItem
                    key={instance.key}
                    index={index}
                    instance={instance}
                    currentSelectedKey={selectStore.componentKey}
                />
            ))}
        </SortableContainer>
    );
}

export const StreamLayoutRender = observer(IStreamLayoutRender);
