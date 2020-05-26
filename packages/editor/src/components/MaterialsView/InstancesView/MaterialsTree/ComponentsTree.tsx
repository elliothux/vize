import * as React from "react";
import * as R from "ramda";
import { Tree } from "antd";
import { FiLayers, FiFolder, FiArchive } from "react-icons/fi";
import { observer } from "mobx-react";
import { EventDataNode } from "rc-tree/es/interface";
import { componentsStore, materialsStore } from "../../../../states";
import { ComponentInstance } from "../../../../types";
import {
  ComponentContextMenu,
  showComponentContextMenu
} from "../../../ContextMenu/ComponentMenu";

const { DirectoryTree, TreeNode } = Tree;

@observer
export class ComponentsTree extends React.Component {
  renderTreeNode = (instance: ComponentInstance, index: number) => {
    const { key } = instance;
    const { info } = materialsStore.getComponentMeta(instance.component);

    const title = `${info.name} (key=${key})`;
    const nodeKey = `component-${key}`;

    return (
      <TreeNode
        key={nodeKey}
        title={title}
        isLeaf={true}
        icon={
          <>
            <FiLayers />
            <ComponentContextMenu instance={instance} />
          </>
        }
      />
    );
  };

  onRightClick = (info: { event: React.MouseEvent; node: EventDataNode }) => {
    const { event, node } = info;
    const key = parseInt(node.key.toString().split("-")[1], 10);
    showComponentContextMenu(event, key);
  };

  render() {
    const { componentInstances } = componentsStore;

    return (
      <DirectoryTree
        className="components-tree"
        multiple
        defaultExpandAll
        onRightClick={this.onRightClick}
        // onSelect={onSelect}
        // onExpand={onExpand}
      >
        <TreeNode
          title="已添加的组件"
          key="components"
          isLeaf={false}
          icon={<FiFolder />}
          selectable={false}
        >
          {componentInstances.map(this.renderTreeNode)}
        </TreeNode>
      </DirectoryTree>
    );
  }
}
