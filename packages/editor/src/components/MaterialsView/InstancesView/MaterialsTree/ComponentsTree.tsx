import * as React from 'react';
import * as R from 'ramda';
import { ComponentProps, useCallback, useMemo } from 'react';
import { Tree } from 'antd';
import { FiArchive, FiFolder, FiLayers, FiSquare } from 'react-icons/fi';
import { observer } from 'mobx-react';
import { componentsStore, selectStore, SelectType, sharedStore } from 'states';
import { ComponentInstance, FirstParameter, HotArea, Maybe, MustBe } from 'types';
import { showComponentContextMenu, showHotAreaContextMenu } from 'components/ContextMenu';
import { ComponentIndex, findComponentInstanceByIndex, isString, isNumber } from 'utils';
import { getMaterialsComponentMeta } from 'runtime';

const { DirectoryTree } = Tree;

type TreeData = ComponentProps<typeof DirectoryTree>['treeData'];

interface Props {
  shared?: boolean;
}

function IComponentsTree({ shared }: Props) {
  const { componentInstances } = componentsStore;
  const { sharedComponentInstances } = sharedStore;
  const { selectType, componentKey, hotAreaIndex } = selectStore;

  // const treeData = useMemo<TreeData>(() => getTreeData(componentInstances), [componentInstances]);
  const treeData = getTreeData(shared ? sharedComponentInstances : componentInstances, !!shared);
  const selectedKeys = useMemo<(number | string)[]>(() => {
    if (selectType === SelectType.COMPONENT) {
      return [componentKey];
    }
    if (selectType === SelectType.HOTAREA) {
      return [`hotarea-${componentKey}-${hotAreaIndex}`];
    }
    return [];
  }, [hotAreaIndex, componentKey, selectType]);

  const onSelectTree = useCallback(R.partial(onSelect, [shared]), [shared]);
  const onRightClickTree = useCallback(R.partial(onRightClick, [shared]), [shared]);
  const onDragStartTree = useCallback(R.partial(onDragStart, [shared]), [shared]);

  return (
    <DirectoryTree
      className="components-tree"
      defaultExpandAll
      // draggable // TODO
      treeData={treeData}
      selectedKeys={selectedKeys}
      onSelect={onSelectTree}
      onRightClick={onRightClickTree}
      onDragStart={onDragStartTree}
      onDrop={onDrop}
    />
  );
}

export const ComponentsTree = observer(IComponentsTree);

function onSelect(shared: boolean, ...params: Parameters<MustBe<ComponentProps<typeof DirectoryTree>['onSelect']>>) {
  const [
    ,
    {
      node: { key },
    },
  ] = params;
  if (isString(key)) {
    const [prefix, componentKey, index] = key.toString().split('-');
    if (prefix !== 'hotarea') {
      return;
    }
    return selectStore.selectHotArea(parseInt(index, 10), parseInt(componentKey, 10));
  }

  const instance = componentsStore.getCurrentPageComponentInstance(key as number);
  selectStore.selectComponent(shared, instance.key, instance.parent?.key);
}

function onRightClick(
  shared: boolean,
  { event, node: { key } }: FirstParameter<MustBe<ComponentProps<typeof DirectoryTree>['onRightClick']>>,
) {
  if (isString(key)) {
    const [prefix, componentKey, index] = key.toString().split('-');
    if (prefix !== 'hotarea') {
      return;
    }
    return showHotAreaContextMenu(event, parseInt(index, 10), parseInt(componentKey, 10));
  }
  showComponentContextMenu(event, shared, key as number);
}

function onDragStart(
  shared: boolean,
  { node: { key } }: FirstParameter<MustBe<ComponentProps<typeof DirectoryTree>['onDragStart']>>,
) {
  if (key === 'components') {
    return;
  }
  selectStore.selectComponent(shared, key as number);
}

// TODO
function onDrop({ node, dropToGap, dragNode }: FirstParameter<MustBe<ComponentProps<typeof DirectoryTree>['onDrop']>>) {
  if (!node || !dragNode || dragNode.key === 'components') {
    return;
  }

  const oldIndex = parseTreeNodeIndex(dragNode.pos)!;
  const newIndex = parseTreeNodeIndex(node.pos);

  // drop to root
  if (!newIndex) {
    // drop outer instance to root
    if (!isNumber(oldIndex.parentIndex)) {
      return;
    }
    // drop child to root
    return componentsStore.moveComponentInstance(oldIndex, { index: 0 });
  }

  const dropInstance = findComponentInstanceByIndex(componentsStore.componentInstances, newIndex!);

  if (dropToGap) {
    return componentsStore.moveComponentInstance(oldIndex, newIndex);
  } else {
    // drop to not-container instance
    if (!dropInstance.children) {
      return;
    }

    // drop instance to container
    return componentsStore.moveComponentInstance(oldIndex, newIndex);
  }
}

function parseTreeNodeIndex(i: string): Maybe<ComponentIndex> {
  const indexes = i
    .split('-')
    .slice(2)
    .map(i => parseInt(i, 10));

  if (indexes.length === 0) {
    return null;
  }

  if (indexes.length === 1) {
    return { index: indexes[0] };
  }

  return { index: indexes[1], parentIndex: indexes[0] };
}

function getTreeData(componentInstances: ComponentInstance[], shared: boolean): TreeData {
  return [
    {
      title: shared ? '跨页面共享的组件' : '已添加的组件',
      key: 'components',
      isLeaf: false,
      icon: <FiFolder />,
      selectable: false,
      className: 'tree-root-node components-tree-root-node',
      children: generateTreeData(componentInstances),
    },
  ];
}

function generateTreeData(componentInstances: ComponentInstance[], isChildren = false): TreeData {
  return componentInstances.map(({ key, children, component, hotAreas }) => {
    const {
      info: { name },
    } = getMaterialsComponentMeta(component)!;
    const isContainer = !!children;
    const hasHotArea = !!hotAreas?.length;

    return {
      key,
      title: `${name} (key=${key})`,
      isLeaf: !(isContainer || hasHotArea),
      icon: isContainer || hasHotArea ? <FiArchive /> : <FiLayers />,
      children: isContainer
        ? generateTreeData(children!, true)
        : hasHotArea
        ? generateHotAreaTreeData(key, hotAreas!)
        : undefined,
      className: isChildren ? 'child-component-tree-node' : undefined,
    };
  });
}

function generateHotAreaTreeData(componentKey: number, hotAreas: HotArea[]): TreeData {
  return hotAreas.map(({ key }, index) => {
    return {
      key: `hotarea-${componentKey}-${index}`,
      title: `热区（key=${key}）`,
      isLeaf: true,
      icon: <FiSquare />,
      className: 'child-component-tree-node',
    };
  });
}
