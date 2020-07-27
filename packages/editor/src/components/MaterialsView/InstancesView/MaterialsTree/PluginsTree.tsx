import * as React from 'react';
import { Tree } from 'antd';
import { observer } from 'mobx-react';
import { ComponentProps, useMemo } from 'react';
import { materialsStore, pluginsStore, selectStore, SelectType } from 'states';
import { FirstParameter, MustBe, PluginInstance } from 'types';
import { FiFolder, FiLayers } from 'react-icons/fi';
import { PluginContextMenu, showPluginContextMenu } from 'components/ContextMenu';

const { DirectoryTree } = Tree;

type TreeData = ComponentProps<typeof DirectoryTree>['treeData'];

interface PluginContextMenusProps {
    pluginInstances: PluginInstance[];
}

function PluginContextMenus({ pluginInstances }: PluginContextMenusProps) {
    return (
        <>
            {pluginInstances.map(i => (
                <PluginContextMenu key={i.key} instance={i} />
            ))}
        </>
    );
}

function IPluginsTree() {
    const { pluginsInstances } = pluginsStore;
    const { selectType, pluginKey } = selectStore;

    const treeData = getTreeData(pluginsInstances);
    const selectedKeys = useMemo<number[]>(() => (selectType === SelectType.PLUGIN ? [pluginKey] : []), [
        pluginKey,
        selectType,
    ]);

    return (
        <>
            <DirectoryTree
                className="plugins-tree"
                defaultExpandAll
                // onSelect={onSelect}
                // onExpand={onExpand}
                treeData={treeData}
                selectedKeys={selectedKeys}
                onRightClick={onRightClick}
                onSelect={onSelect}
            />
            <PluginContextMenus pluginInstances={pluginsInstances} />
        </>
    );
}

export const PluginsTree = observer(IPluginsTree);

function onSelect(...params: Parameters<MustBe<ComponentProps<typeof DirectoryTree>['onSelect']>>) {
    const [, { node }] = params;
    selectStore.selectPlugin(node.key as number);
}

function onRightClick({ node, event }: FirstParameter<MustBe<ComponentProps<typeof DirectoryTree>['onRightClick']>>) {
    const key = parseInt(node.key.toString(), 10);
    showPluginContextMenu(event, key);
}

function getTreeData(pluginInstances: PluginInstance[]): TreeData {
    return [
        {
            title: '已添加的插件',
            key: 'plugins',
            isLeaf: false,
            icon: <FiFolder />,
            selectable: false,
            className: 'tree-root-node',
            children: generateTreeData(pluginInstances),
        },
    ];
}

function generateTreeData(pluginInstances: PluginInstance[]): TreeData {
    return pluginInstances.map(({ key, plugin }) => {
        const {
            info: { name },
        } = materialsStore.getPluginMeta(plugin);

        return {
            key,
            title: `${name} (key=${key})`,
            isLeaf: true,
            icon: <FiLayers />,
        };
    });
}
