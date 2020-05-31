import * as React from 'react';
import {
    SortableContainer as sortableContainer,
    SortableElement as sortableElement,
    SortEnd,
    SortStart,
} from 'react-sortable-hoc';
import { WithReactChildren } from 'types';
import { ComponentItem } from 'components/ComponentItem';
import { componentsStore, selectStore } from 'states';
import { observer } from 'mobx-react';
import { useCallback } from 'react';

function ISortableContainer({ children }: WithReactChildren) {
    return <>{children}</>;
}

const SortableContainer = sortableContainer(ISortableContainer);
const SortableComponentItem = sortableElement(ComponentItem);

interface Props {
    mountTarget: HTMLDivElement;
}

function IStreamLayoutRender({ mountTarget }: Props) {
    const { componentInstances } = componentsStore;

    const onSortStart = useCallback(({ index }: SortStart) => selectStore.selectComponentByIndex(index), []);

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }: SortEnd) => componentsStore.resortComponentInstance(oldIndex, newIndex),
        [],
    );

    const getContainer = useCallback(() => mountTarget, [mountTarget]);

    return (
        <SortableContainer onSortStart={onSortStart} onSortEnd={onSortEnd} getContainer={getContainer}>
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
