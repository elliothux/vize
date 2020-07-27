import * as React from 'react';
import { ComponentProps, useMemo } from 'react';
import { Tree } from 'antd';
import { FiFolder, FiLayers } from 'react-icons/fi';
import { observer } from 'mobx-react';
import { componentsStore, materialsStore, selectStore, SelectType } from 'states';
import { ComponentInstance, FirstParameter, Maybe, MustBe } from 'types';
import { showComponentContextMenu } from 'components/ContextMenu';
import { ComponentIndex, findComponentInstanceByIndex, isNumber } from '../../../../utils';

const { DirectoryTree } = Tree;

type TreeData = ComponentProps<typeof DirectoryTree>['treeData'];

export function IComponentsTree() {
    const { componentInstances } = componentsStore;
    const { selectType, componentKey } = selectStore;

    // const treeData = useMemo<TreeData>(() => getTreeData(componentInstances), [componentInstances]);
    const treeData = getTreeData(componentInstances);
    const selectedKeys = useMemo<number[]>(() => (selectType === SelectType.COMPONENT ? [componentKey] : []), [
        componentKey,
        selectType,
    ]);

    return (
        <DirectoryTree
            className="components-tree"
            defaultExpandAll
            // draggable // TODO
            treeData={treeData}
            selectedKeys={selectedKeys}
            onRightClick={onRightClick}
            onSelect={onSelect}
            onDragStart={onDragStart}
            onDrop={onDrop}
        />
    );
}

export const ComponentsTree = observer(IComponentsTree);

function onSelect(...params: Parameters<MustBe<ComponentProps<typeof DirectoryTree>['onSelect']>>) {
    const [, { node }] = params;
    selectStore.selectComponent(node.key as number);
}

function onRightClick({ node, event }: FirstParameter<MustBe<ComponentProps<typeof DirectoryTree>['onRightClick']>>) {
    const key = parseInt(node.key.toString().split('-')[1], 10);
    showComponentContextMenu(event, key);
}

function onDragStart({ node: { key } }: FirstParameter<MustBe<ComponentProps<typeof DirectoryTree>['onDragStart']>>) {
    if (key === 'components') {
        return;
    }
    selectStore.selectComponent(key as number);
}

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

function getTreeData(componentInstances: ComponentInstance[]): TreeData {
    return [
        {
            title: '已添加的组件',
            key: 'components',
            isLeaf: false,
            icon: <FiFolder />,
            selectable: false,
            className: 'tree-root-node',
            children: generateTreeData(componentInstances),
        },
    ];
}

function generateTreeData(componentInstances: ComponentInstance[], isChildren = false): TreeData {
    return componentInstances.map(({ key, children, component }) => {
        const {
            info: { name },
        } = materialsStore.getComponentMeta(component);
        const isContainer = !!children;

        return {
            key,
            title: `${name} (key=${key})`,
            isLeaf: !isContainer,
            icon: isContainer ? <FiLayers /> : <FiLayers />,
            children: isContainer ? generateTreeData(children!, true) : undefined,
            className: isChildren ? 'child-component-tree-node' : undefined,
        };
    });
}
