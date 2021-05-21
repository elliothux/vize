import * as React from 'react';
import {
  SortableContainer as sortableContainer,
  SortableElement as sortableElement,
  SortEnd,
  SortStart,
} from 'react-sortable-hoc';
import { ComponentInstance, WithReactChildren } from 'types';
import { ComponentItem } from 'components/ComponentItem';
import { componentsStore, editStore, pagesStore, selectStore } from 'states';
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
  sharedComponentInstances?: ComponentInstance[];
  containerComponentInstance?: ComponentInstance;
}

function IStreamLayoutRender({
  containerComponentInstance,
  componentInstances,
  sharedComponentInstances,
  mountTarget,
}: Props) {
  const {
    selectType,
    componentKey,
    containerComponentKey,
    selectMode,
    selectModeSelectedComponent,
    pageIndex,
  } = selectStore;
  const { pages } = pagesStore;

  const onSortStart = useCallback(
    ({ index }: SortStart) => {
      if (selectStore.selectMode) {
        return;
      }

      const { key, parent } = componentInstances[index];
      selectStore.selectComponent(false, key, parent?.key);
    },
    [componentInstances, componentKey, containerComponentKey],
  );

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: SortEnd) => {
      componentsStore.resortComponentInstance(componentInstances[oldIndex].key, oldIndex, newIndex);
    },
    [componentInstances],
  );

  const shouldCancelStart = useCallback(() => editStore.previewMode, []);

  const getContainer = useMemo(() => (mountTarget ? () => mountTarget : undefined), [mountTarget]);

  const sharedChildren = sharedComponentInstances?.length
    ? sharedComponentInstances.map(instance => (
        <ComponentItem
          key={instance.key}
          instance={instance}
          currentSelectedKey={componentKey}
          currentSelectedType={selectType}
          currentSelectedContainerKey={containerComponentKey}
          selectMode={selectMode}
          selectModeSelectedComponent={selectModeSelectedComponent}
          isCurrentSelectedContainerShared
          pages={pages}
          currentPageIndex={pageIndex}
        />
      ))
    : null;

  const children = componentInstances?.length
    ? componentInstances.map((instance, index) => (
        <SortableComponentItem
          key={instance.key}
          index={index}
          instance={instance}
          currentSelectedKey={componentKey}
          currentSelectedType={selectType}
          currentSelectedContainerKey={containerComponentKey}
          selectMode={selectMode}
          selectModeSelectedComponent={selectModeSelectedComponent}
          isCurrentSelectedContainerShared={false}
          pages={pages}
          currentPageIndex={pageIndex}
        />
      ))
    : null;

  const content = containerComponentInstance ? (
    <ComponentItem
      instance={containerComponentInstance}
      currentSelectedType={selectType}
      currentSelectedKey={componentKey}
      currentSelectedContainerKey={containerComponentKey}
      selectMode={selectMode}
      selectModeSelectedComponent={selectModeSelectedComponent}
      isCurrentSelectedContainerShared={false}
      pages={pages}
      currentPageIndex={pageIndex}
    >
      {sharedChildren}
      {children}
    </ComponentItem>
  ) : (
    <>
      {sharedChildren}
      {children}
    </>
  );

  return (
    <SortableContainer
      shouldCancelStart={shouldCancelStart}
      onSortStart={onSortStart}
      onSortEnd={onSortEnd}
      getContainer={getContainer}
      pressDelay={200}
      helperClass="dragging-component-item"
    >
      {content}
    </SortableContainer>
  );
}

export const StreamLayoutRender = observer(IStreamLayoutRender);
