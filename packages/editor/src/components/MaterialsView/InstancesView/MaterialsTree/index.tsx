import * as React from "react";
import { Tree } from "antd";
import "./index.scss";

const { DirectoryTree } = Tree;

const componentsData = [
  {
    title: "组件",
    key: "components",
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true }
    ]
  }
];

const pluginsData = [
  {
    title: "插件",
    key: "plugins",
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true }
    ]
  }
];

export class MaterialsTree extends React.Component {
  public renderComponentsTree = () => {
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
  };

  public renderPluginsTree = () => {
    return (
      <DirectoryTree
        className="plugins-tree"
        multiple
        defaultExpandAll
        // onSelect={onSelect}
        // onExpand={onExpand}
        treeData={pluginsData}
      />
    );
  };

  public render() {
    return (
      <div className="vize-materials-tree">
        {this.renderComponentsTree()}
        {this.renderPluginsTree()}
      </div>
    );
  }
}
