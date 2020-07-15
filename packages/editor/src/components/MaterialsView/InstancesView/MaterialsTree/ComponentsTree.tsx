import * as React from 'react';
import { Tree } from 'antd';
import { FiLayers, FiFolder } from 'react-icons/fi';
import { observer } from 'mobx-react';
import { EventDataNode } from 'rc-tree/es/interface';
import { componentsStore, materialsStore } from 'states';
import { ComponentInstance } from 'types';
import { showComponentContextMenu } from 'components/ContextMenu';
import { ComponentProps } from 'react';
import { getMaterialsComponent } from '../../../../utils';
import { is } from 'ramda';

const { DirectoryTree, TreeNode } = Tree;

@observer
export class ComponentsTree extends React.Component {
    onRightClick = (info: { event: React.MouseEvent; node: EventDataNode }) => {
        const { event, node } = info;
        const key = parseInt(node.key.toString().split('-')[1], 10);
        showComponentContextMenu(event, key);
    };

    render() {
        return (
            <DirectoryTree
                className="components-tree"
                defaultExpandAll
                onRightClick={this.onRightClick}
                selectedKeys={[]}
                // onSelect={onSelect}
                // onExpand={onExpand}
                treeData={[
                    {
                        title: '已添加的组件',
                        key: 'components',
                        isLeaf: false,
                        icon: <FiFolder />,
                        selectable: false,
                        children: ComponentsTree.generateTreeData(componentsStore.componentInstances),
                    },
                ]}
            />
        );
    }

    static generateTreeData = (
        componentInstances: ComponentInstance[],
        isChildren = false,
    ): ComponentProps<typeof DirectoryTree>['treeData'] => {
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
                children: isContainer ? ComponentsTree.generateTreeData(children!, true) : undefined,
                className: isChildren ? 'child-component-tree-node' : undefined,
            };
        });
    };
}
