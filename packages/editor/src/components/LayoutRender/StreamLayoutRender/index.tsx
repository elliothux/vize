import * as React from 'react';
import {
    SortableContainer as sortableContainer,
    SortableElement as sortableElement,
    SortEnd,
    SortStart,
} from 'react-sortable-hoc';
import { ComponentInstance, WithReactChildren } from 'types';
import { ComponentItem } from 'components/ComponentItem';
import { componentsStore, selectStore } from 'states';
import { observer } from 'mobx-react';
import { useCallback, useMemo } from 'react';

function ISortableContainer({ children }: WithReactChildren) {
    return <>{children}</>;
}

const SortableContainer = sortableContainer(ISortableContainer);
const SortableComponentItem = sortableElement(ComponentItem);

interface Props {
    mountTarget?: HTMLDivElement;
    componentInstances: ComponentInstance[];
    containerComponentInstance?: ComponentInstance;
}

function IStreamLayoutRender({ containerComponentInstance, componentInstances, mountTarget }: Props) {
    const { selectType, componentKey, containerComponentKey } = selectStore;

    const onSortStart = useCallback(
        ({ index }: SortStart) => {
            selectStore.selectComponent(componentInstances[index].key);
        },
        [componentInstances],
    );

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }: SortEnd) => {
            componentsStore.resortComponentInstance(componentInstances[oldIndex].key, oldIndex, newIndex);
        },
        [componentInstances],
    );

    const getContainer = useMemo(() => (mountTarget ? () => mountTarget : undefined), [mountTarget]);

    const children = componentInstances.map((instance, index) => (
        <SortableComponentItem
            key={instance.key}
            index={index}
            instance={instance}
            currentSelectedKey={componentKey}
            currentSelectedType={selectType}
            currentSelectedContainerKey={containerComponentKey}
        />
    ));

    const content = containerComponentInstance ? (
        <ComponentItem
            instance={containerComponentInstance}
            currentSelectedType={selectType}
            currentSelectedKey={componentKey}
            currentSelectedContainerKey={containerComponentKey}
        >
            {children}
        </ComponentItem>
    ) : (
        children
    );

    return (
        <SortableContainer onSortStart={onSortStart} onSortEnd={onSortEnd} getContainer={getContainer}>
            {content}
        </SortableContainer>
    );
}

export const StreamLayoutRender = observer(IStreamLayoutRender);
