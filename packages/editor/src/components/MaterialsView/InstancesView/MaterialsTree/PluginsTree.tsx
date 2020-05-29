import * as React from 'react';
import { Tree } from 'antd';
import { observer } from 'mobx-react';

const { DirectoryTree } = Tree;

const componentsData = [
    {
        title: '插件',
        key: 'plugins',
        children: [
            { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
            { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
        ],
    },
];

function IPluginsTree() {
    return (
        <DirectoryTree
            className="components-tree"
            multiple
            defaultExpandAll
            // onSelect={onSelect}
            // onExpand={onExpand}
            treeData={componentsData}
        />
    );
}

export const PluginsTree = observer(IPluginsTree);
